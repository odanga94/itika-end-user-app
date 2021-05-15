/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {getGpsLoc} from '../../utils';
import FlowCard from '../../Components/FlowCard';
import CurrentOrder from '../../Components/CurrentOrder';
import Button from '../../Components/Button';
import {HomeStackParamList} from '../TabNavigation';
import constant from '../../utils/constant';
//import CategoriesCard from '../../Components/CategoriesCard';
import SearchLocation from '../../Components/SearchLocation';
import styles from './styles';
import Spinner from '../../Components/UI/Spinner';
import {firebaseAppDatabase} from '../../../App';
import * as currentJobActions from '../../store/actions/currentJob';
import * as orderActions from '../../store/actions/orders';
import * as locationActions from '../../store/actions/location';

/* const searchIcon = require('../../../assets/search.png');
const filterIcon = require('../../../assets/filter.png'); */

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
}

const Home: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  /* const userProfile = useSelector((state: any) => state.profile);
  console.log(userProfile); */

  const userId = useSelector((state: any) => state.auth.userId);
  const currentJobOrderId = useSelector(
    (state: any) => state.currentJob.currentJobOrderId,
  );
  //console.log(currentJobOrderId);
  const currentOrder = useSelector((state: any) =>
    state.orders.orders.find((order: any) => order.id === currentJobOrderId),
  );
  const location = useSelector((state: any) => state.location);

  const [visible, setVisible] = useState<boolean>(false);
  const [fetchLocationLoading, setFetchLocationLoading] = useState<boolean>(
    false,
  );
  const [
    isFetchingCurrentJobDetails,
    setIsFetchingCurrentJobDetails,
  ] = useState<boolean>(true);

  useEffect(() => {
    const getLocation = async () => {
      setFetchLocationLoading(true);
      try {
        const response: any = await getGpsLoc();
        //console.log('locRes', response);
        if (response) {
          dispatch(
            locationActions.setCurrentLocation(
              response,
              response.resp.formatted_address,
            ),
          );
        } else {
          dispatch(locationActions.setCurrentLocation(null, 'Select Address'));
        }
      } catch (err) {
        console.log(err);
        if (err.message === 'Error: Insufficient Permissions!') {
          Alert.alert(
            'Insufficient Permissions!',
            'You need to grant locaton permissions to continue',
            [{text: 'Okay'}],
          );
        }
        dispatch(locationActions.setCurrentLocation(null, 'Select Address'));
      }
      setFetchLocationLoading(false);
    };
    getLocation();
  }, [dispatch]);

  const checkIfCurrentJob = useCallback(async () => {
    if (userId) {
      const dataSnapshot = await firebaseAppDatabase
        .ref(`user_profiles/${userId}/currentJobOrderId`)
        .once('value');
      const resData = dataSnapshot.val();
      //console.log('orderId', resData);
      if (resData) {
        dispatch({
          type: currentJobActions.SET_CURRENT_JOB,
          currentJobOrderId: resData,
        });
        return;
      } else {
        dispatch({
          type: currentJobActions.DELETE_CURRENT_JOB,
        });
      }
      setIsFetchingCurrentJobDetails(false);
    }
  }, [userId, dispatch]);

  const fetchCurrentJobDetails = useCallback(async () => {
    try {
      const dataSnapshot = await firebaseAppDatabase
        .ref(`orders/${userId}/${currentJobOrderId}`)
        .once('value');
      const resData = dataSnapshot.val();
      dispatch(orderActions.dispatchNewOrder(currentJobOrderId, resData));
      setIsFetchingCurrentJobDetails(false);
    } catch (err) {
      console.log(err);
      setIsFetchingCurrentJobDetails(false);
    }
  }, [currentJobOrderId, dispatch, userId]);

  useEffect(() => {
    checkIfCurrentJob();
  }, [checkIfCurrentJob]);

  useEffect(() => {
    if (currentJobOrderId && !currentOrder /*&& !fromCheckout*/) {
      fetchCurrentJobDetails();
    } else if (currentJobOrderId && currentOrder) {
      //from chec
      setIsFetchingCurrentJobDetails(false);
    }
  }, [
    /*fromCheckout,*/ currentJobOrderId,
    currentOrder,
    fetchCurrentJobDetails,
  ]);
  //console.log(currentOrder);
  useEffect(() => {
    const currentJobRef = firebaseAppDatabase.ref(
      `orders/${userId}/${currentJobOrderId}`,
    );
    const onChildChanged = async (dataSnapShot: any) => {
      //console.log('key', dataSnapShot.key);
      if (dataSnapShot.key === 'status') {
        //console.log(dataSnapShot.val());
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'status',
          value: dataSnapShot.val(),
        });
        if (dataSnapShot.val() === 'delivered') {
          navigation.navigate('OrderComplete', {});
        }
      } else if (dataSnapShot.key === 'riderLocation') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'riderLocation',
          value: dataSnapShot.val(),
        });
      }
    };
    const handleChildAdded = async (dataSnapShot: any) => {
      //console.log('key', dataSnapShot.key);
      if (dataSnapShot.key === 'riderId') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'riderId',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'riderLocation') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'riderLocation',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'pickUpDate') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'pickUpDate',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'deliveredDate') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'deliveredDate',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'amountPaid') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'amountPaid',
          value: dataSnapShot.val(),
        });
      }
    };

    if (currentJobOrderId && currentOrder) {
      currentJobRef.on('child_changed', onChildChanged);
      currentJobRef.on('child_added', handleChildAdded);
    }

    return () => {
      currentJobRef.off('child_changed', onChildChanged);
      currentJobRef.off('child_added', handleChildAdded);
    };
  }, [currentJobOrderId, dispatch, userId, navigation]);

  useEffect(() => {
    const fetchRiderDetails = async () => {
      const dataSnapshot = await firebaseAppDatabase
        .ref(`riders/${currentOrder.orderDetails.riderId}`)
        .once('value');
      const riderDetails = dataSnapshot.val();
      const fullName = `${riderDetails.firstName} ${riderDetails.lastName}`;
      dispatch({
        type: orderActions.UPDATE_ORDER,
        orderId: currentJobOrderId,
        valueToUpdate: 'riderName',
        value: fullName,
      });
      dispatch({
        type: orderActions.UPDATE_ORDER,
        orderId: currentJobOrderId,
        valueToUpdate: 'riderPhone',
        value: riderDetails.phone,
      });
      dispatch({
        type: orderActions.UPDATE_ORDER,
        orderId: currentJobOrderId,
        valueToUpdate: 'riderImage',
        value: riderDetails.passportPhotoUrl,
      });
    };
    if (currentOrder) {
      if (
        currentOrder.orderDetails.riderId &&
        !currentOrder.orderDetails.riderName
      ) {
        fetchRiderDetails();
      }
    }
  }, [currentOrder, currentJobOrderId, dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <ScrollView contentContainerStyle={styles.safeArea}>
        <View style={styles.firstView}>
          <View style={styles.secondView}>
            {fetchLocationLoading ? (
              <Spinner
                style={{justifyContent: 'flex-start', marginTop: -2}}
                size={undefined}
              />
            ) : (
              <TouchableOpacity onPress={() => setVisible(true)}>
                <View style={styles.eightView}>
                  <MaterialIcons
                    name="place"
                    size={25}
                    color={constant.primaryTextColor}
                  />

                  <Text numberOfLines={1} style={styles.firstText}>
                    {
                      /* {address && address.length > 28
                    ? `${address.substring(0, 28 - 3)}...`
                    : address} */ location.currentAddress
                    }
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {visible && (
            <Modal
              isVisible={visible}
              backdropOpacity={0.5}
              onBackdropPress={() => setVisible(false)}>
              <SearchLocation
                latLong={location.currentGpsLoc}
                handlePress={() => setVisible(false)}
                navigation={navigation}
              />
            </Modal>
          )}
        </View>
        <View style={styles.fifthView}>
          {isFetchingCurrentJobDetails ? (
            <Spinner size="large" style="undefined" />
          ) : currentOrder ? (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.orderText}>
                Your Package is being Processed!
              </Text>
              <CurrentOrder currentOrder={currentOrder} />
              <Button
                style={styles.button}
                onPress={() => {
                  navigation.navigate('TrackOrder', {});
                }}>
                <Text style={styles.buttonText}>Track Package</Text>
              </Button>
            </View>
          ) : (
            <FlowCard
              navigation={navigation}
              pickedLocationAddress={location.currentAddress}
              pickedLocation={location.currentGpsLoc}
            />
          )}
        </View>
        {/* <View style={styles.sixthView}>
          <View style={styles.seventhView}>
            <Text style={styles.secondText}>Top categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CategoriesCard navigation={navigation} />
          </ScrollView>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
