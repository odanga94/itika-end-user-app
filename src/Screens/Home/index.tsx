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

/* const searchIcon = require('../../../assets/search.png');
const filterIcon = require('../../../assets/filter.png'); */

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
}

const Home: React.FC<Props> = (props) => {
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

  const {navigation} = props;
  const dispatch = useDispatch();

  const [address, setAddress] = useState<string>('');
  const [gpsLoc, setGpsLoc] = useState<any>(null);
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
          setGpsLoc(response);
          setAddress(response.resp.formatted_address);
        } else {
          setAddress('Select Address');
        }
      } catch (err) {
        //console.log(err);
        if (err.message === 'Error: Insufficient Permissions!') {
          Alert.alert(
            'Insufficient Permissions!',
            'You need to grant locaton permissions to continue',
            [{text: 'Okay'}],
          );
        }
        setAddress('Select Address');
      }
      setFetchLocationLoading(false);
    };
    getLocation();
  }, []);

  const checkIfCurrentJob = useCallback(async () => {
    if (userId) {
      const dataSnapshot = await firebaseAppDatabase
        .ref(`pending_jobs/${userId}/`)
        .once('value');
      const resData = dataSnapshot.val();
      if (resData) {
        dispatch({
          type: currentJobActions.SET_CURRENT_JOB,
          currentJobOrderId: resData.currentJobOrderId,
        });
        return;
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
    }
  }, [
    /*fromCheckout,*/ currentJobOrderId,
    currentOrder,
    fetchCurrentJobDetails,
  ]);
  console.log(currentOrder);

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
                  <MaterialIcons name="place" size={25} color="#505050" />

                  <Text numberOfLines={1} style={styles.firstText}>
                    {
                      /* {address && address.length > 28
                    ? `${address.substring(0, 28 - 3)}...`
                    : address} */ address
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
                latLong={gpsLoc}
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
                  /*navigation.navigate('TrackOrder')*/
                }}>
                <Text style={styles.buttonText}>Track Package</Text>
              </Button>
            </View>
          ) : (
            <FlowCard
              navigation={navigation}
              pickedLocationAddress={address}
              pickedLocation={gpsLoc}
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
