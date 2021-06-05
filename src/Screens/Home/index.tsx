/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback, Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';

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
import * as currentJobActions from '../../store/actions/currentJob';
import * as orderActions from '../../store/actions/orders';
import * as locationActions from '../../store/actions/location';
import Order from '../../models/order';

const pkgImage = require('../../../assets/package-yellow.png');
const errandImage = require('../../../assets/errand.png');

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
  route: any;
}

const Home: React.FC<Props> = (props) => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  /* const userProfile = useSelector((state: any) => state.profile);
  console.log(userProfile); */

  const userId = useSelector((state: any) => state.auth.userId);
  const currentJobsOrderIds = useSelector(
    (state: any) => state.currentJob.currentJobs,
  );
  //console.log(currentJobOrderId);
  const orders = useSelector((state: any) => state.orders.orders);

  const location = useSelector((state: any) => state.location);

  const [visible, setVisible] = useState<boolean>(false);
  const [fetchLocationLoading, setFetchLocationLoading] = useState<boolean>(
    false,
  );
  const [
    isFetchingCurrentJobDetails,
    setIsFetchingCurrentJobDetails,
  ] = useState<boolean>(true);
  const [isCheckingCurrentJobs, setIsCheckingCurrentJobs] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [currentOrders, setCurrentOrders] = useState<any>([]);
  const [completeOrder, setCompleteOrder] = useState(false);
  const [justDeleted, setJustDeleted] = useState(false);

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

  const checkIfCurrentJobs = useCallback(async () => {
    if (userId) {
      //console.log('checking...');
      const dataSnapshot = await database()
        .ref(`user_profiles/${userId}/processing_orders`)
        .once('value');
      const resData = dataSnapshot.val();
      //console.log('res', resData);
      // if package is delivered go to Order Complete
      if (resData) {
        for (let orderId in resData) {
          //console.log(orderId)
          dispatch({
            type: currentJobActions.SET_CURRENT_JOB,
            currentJobOrderId: orderId,
          });
        }
        setIsCheckingCurrentJobs(false);
        return;
      } /* else {
        dispatch({
          type: currentJobActions.DELETE_CURRENT_JOB,
        });
      } */
      setIsCheckingCurrentJobs(false);
      setIsFetchingCurrentJobDetails(false);
    }
  }, [userId, dispatch]);

  const fetchCurrentJobsDetails = useCallback(async () => {
    //console.log('fetching curr Jobs');
    try {
      for (let i = 0; i < currentJobsOrderIds.length; i++) {
        const dataSnapshot = await database()
          .ref(`orders/${userId}/${currentJobsOrderIds[i].id}`)
          .once('value');
        const resData = dataSnapshot.val();
        dispatch(
          orderActions.dispatchNewOrder(currentJobsOrderIds[i].id, resData),
        );
      }
      setIsFetchingCurrentJobDetails(false);
    } catch (err) {
      console.log(err);
      setIsFetchingCurrentJobDetails(false);
    }
  }, [dispatch, currentJobsOrderIds, userId]);

  useEffect(() => {
    if (route.params && route.params.cancelJob) {
      return;
    }
    checkIfCurrentJobs();
  }, [route, checkIfCurrentJobs]);

  //console.log(route);
  //console.log('cl', cancelLoading);

  //console.log(currentJobsOrderIds);
  useEffect(() => {
    if (currentJobsOrderIds.length > 0 && !isCheckingCurrentJobs) {
      //console.log('infinite loop 2?');
      fetchCurrentJobsDetails();
    } /* else if (currentJobsOrderIds.length > 0 && currentOrders.length > 0) {
      setIsFetchingCurrentJobDetails(false);
      if (currentOrders[0].orderDetails.status === 'delivered') {
        if (route.params && route.params.fromComplete) {
          return;
        }
        navigation.navigate('OrderComplete', {});
      }
      if (route.params && route.params.cancelJob) {
        cancelJobHandler();
      }
    } */
  }, [currentJobsOrderIds, fetchCurrentJobsDetails, isCheckingCurrentJobs]);

  useEffect(() => {
    const cancelJobHandler = async () => {
      setCancelLoading(true);
      try {
        await dispatch(
          orderActions.cancelOrder(route.params.orderIdToCancel, userId),
        );
        dispatch({
          type: currentJobActions.DELETE_CURRENT_JOB,
          currentJobOrderId: route.params.orderIdToCancel,
        });
      } catch (err) {
        Alert.alert(
          'Something went wrong 😞',
          'We were unable to cancel your order at this time. Please try again later.',
          [{text: 'Okay'}],
        );
      }
      setCancelLoading(false);
      navigation.setParams({cancelJob: false, orderIdToCancel: null});
    };

    if (
      route.params &&
      route.params.cancelJob &&
      route.params.orderIdToCancel
    ) {
      cancelJobHandler();
    }
  }, [route, dispatch, navigation, userId]);

  useEffect(() => {
    if (
      (orders.length > 0 &&
        currentJobsOrderIds.length > 0 &&
        !isFetchingCurrentJobDetails &&
        currentOrders.length === 0) ||
      justDeleted
    ) {
      const currOrdersArr = [];
      for (let i = 0; i < currentJobsOrderIds.length; i++) {
        const order = orders.find(
          (ord: any) => ord.id === currentJobsOrderIds[i].id,
        );
        if (order) {
          currOrdersArr.push(order);
        }
      }
      //console.log('loop running');
      setCurrentOrders(currOrdersArr);
      setJustDeleted(false);
    }
  }, [
    justDeleted,
    currentOrders,
    orders,
    currentJobsOrderIds,
    isFetchingCurrentJobDetails,
  ]);
  //console.log('currOrds', currentOrders);
  //console.log(route);

  useEffect(() => {
    if (route.params && route.params.fromComplete) {
      setCompleteOrder(true);
      return;
    }
  }, [route]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
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
        {isFetchingCurrentJobDetails || cancelLoading ? (
          <Spinner size="large" style="undefined" />
        ) : currentOrders.length > 0 ? (
          <View style={{flex: 1}}>
            <View style={{flex: 5}}>
              <FlatList
                //onRefresh={loadOrders}
                refreshing={isFetchingCurrentJobDetails}
                data={currentOrders}
                scrollEnabled={true}
                ListHeaderComponent={
                  <View style={styles.pastView}>
                    <Text
                      style={{
                        ...styles.firstText,
                        textAlign: 'center',
                        color: '#505050',
                      }}>
                      Processing Orders
                    </Text>
                  </View>
                }
                showsVerticalScrollIndicator={true}
                keyExtractor={(item) => item.id}
                /* onEndReached={(info: {distanceFromEnd: number}) =>
              console.log(info, 'check end ')
            } */
                renderItem={({item}) => {
                  //console.log('it', item);
                  return (
                    <Fragment key={item.id}>
                      <CurrentOrder
                        currentOrder={item}
                        userId={userId}
                        route={route}
                        navigation={navigation}
                        completeOrder={completeOrder}
                        setCompleteOrder={setCompleteOrder}
                        justDeleted={justDeleted}
                        setJustDeleted={setJustDeleted}
                      />
                      <Button
                        style={styles.button}
                        onPress={() => {
                          navigation.navigate('TrackOrder', {orderId: item.id});
                        }}>
                        <Text style={styles.buttonText}>Track Package</Text>
                      </Button>
                      <View style={styles.orderContainer} />
                    </Fragment>
                  );
                }}
              />
            </View>

            <View style={styles.touchableContainer}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  navigation.navigate('OrderDetails', {
                    pickedLocationAddress: location.currentAddress,
                    pickedLocation: location.currentGpsLoc,
                  });
                }}>
                <Image
                  source={pkgImage}
                  style={styles.image}
                  resizeMode="contain"
                />

                <Text style={styles.touchableText}>Send Package</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => Alert.alert('Work in Progress!')}>
                <Image
                  source={errandImage}
                  style={styles.image}
                  resizeMode="contain"
                />

                <Text style={styles.touchableText}>Request Errand</Text>
              </TouchableOpacity>
            </View>
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
    </SafeAreaView>
  );
};

export default Home;
