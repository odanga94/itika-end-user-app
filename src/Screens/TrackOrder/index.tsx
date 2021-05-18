/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {firebaseAppDatabase} from '../../../App';
import {HomeStackParamList} from '../TabNavigation';
import constant from '../../utils/constant';
import mapStyle from '../../utils/customMap';
import {getEstimatedDistanceAndTime} from '../../utils/index';
import ENV from '../../../config';
import styles from './styles';
import {UPDATE_ORDER, cancelOrder} from '../../store/actions/orders';
import Button from '../../Components/Button';
import Spinner from '../../Components/UI/Spinner';

const homeIcon = require('../../../assets/home-white.png');
const locIcon = require('../../../assets/mapPointer-white.png');

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
}

const region = {
  latitude: -1.2611551,
  longitude: 36.799789,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const destLoc = {
  latitude: -1.2657317,
  longitude: 36.7365257,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const {heightRatio} = constant.styleGuide;

const TrackOrder: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const currentJobOrderId = useSelector(
    (state: any) => state.currentJob.currentJobOrderId,
  );
  //console.log(currentJobOrderId);
  const currentOrder = useSelector((state: any) =>
    state.orders.orders.find((order: any) => order.id === currentJobOrderId),
  );
  //console.log('currOrder', currentOrder);
  /* const location = useSelector((state: any) => state.location);
  console.log(location); */
  const userId = useSelector((state: any) => state.auth.userId);

  const [markers, setMarkers] = useState([
    {
      titl: 'src',
      descrip: currentOrder.orderDetails.pickUpLocationAddress,
      coordinate: {
        latitude: currentOrder
          ? currentOrder.orderDetails.pickUpLocation.latitude
          : region.latitude,
        longitude: currentOrder
          ? currentOrder.orderDetails.pickUpLocation.longitude
          : region.longitude,
      },
    },
    {
      titl: 'dest',
      descrip: currentOrder.orderDetails.dropOffLocationAddress,
      coordinate: {
        latitude: currentOrder
          ? currentOrder.orderDetails.dropOffLocation.latitude
          : destLoc.latitude,
        longitude: currentOrder
          ? currentOrder.orderDetails.dropOffLocation.longitude
          : destLoc.longitude,
      },
    },
  ]);
  const [initRiderLocationPickUp, setInitRiderLocationPickUp] = useState<any>();
  const [initRiderLocationDropOff, setInitRiderLocationDropOff] = useState<
    any
  >();
  //console.log('initRegion', initRiderLocationPickUp);
  //console.log('markers', markers);
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [estimeatedTime, setEstimatedTime] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);

  const mapRef = useRef(null);

  const markersLength = markers.length;

  const cancelOrderHandler = () => {
    Alert.alert(
      'Are you sure?',
      `Are you really sure you want to cancel this order?`,
      [
        {
          text: 'No',
          onPress: () => {
            return;
          },
          style: 'default',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setCancelLoading(true);
            await dispatch(cancelOrder(currentJobOrderId, userId));
            setCancelLoading(false);
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            });
          },
          style: 'destructive',
        },
      ],
    );
  };

  useEffect(() => {
    const currentJobRef = firebaseAppDatabase.ref(
      `orders/${userId}/${currentJobOrderId}`,
    );
    const onChildChanged = async (dataSnapShot: any) => {
      //console.log('key', dataSnapShot.key);
      if (dataSnapShot.key === 'status') {
        //console.log(dataSnapShot.val());
        dispatch({
          type: UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'status',
          value: dataSnapShot.val(),
        });
        if (dataSnapShot.val() === 'pick_up') {
          setInitRiderLocationPickUp(currentOrder.orderDetails.riderLocation);
          setInitRiderLocationDropOff(undefined);
        }
        if (dataSnapShot.val() === 'drop_off') {
          setInitRiderLocationDropOff(currentOrder.orderDetails.riderLocation);
          setInitRiderLocationPickUp(undefined);
        }
        if (dataSnapShot.val() === 'delivered') {
          navigation.navigate('OrderComplete', {});
        }
      } else if (dataSnapShot.key === 'riderLocation') {
        dispatch({
          type: UPDATE_ORDER,
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
          type: UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'riderId',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'riderLocation') {
        if (currentOrder.orderDetails.status === 'pick_up') {
          setInitRiderLocationPickUp(dataSnapShot.val());
          setInitRiderLocationDropOff(undefined);
        } else if (currentOrder.orderDetails.status === 'drop_off') {
          setInitRiderLocationDropOff(dataSnapShot.val());
          setInitRiderLocationPickUp(undefined);
        }
        dispatch({
          type: UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'riderLocation',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'pickUpDate') {
        dispatch({
          type: UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'pickUpDate',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'deliveredDate') {
        dispatch({
          type: UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'deliveredDate',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'amountPaid') {
        dispatch({
          type: UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'amountPaid',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'chat') {
        dispatch({
          type: UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'chat',
          value: dataSnapShot.val(),
        });
      }
    };

    if (currentJobOrderId) {
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
        type: UPDATE_ORDER,
        orderId: currentJobOrderId,
        valueToUpdate: 'riderName',
        value: fullName,
      });
      dispatch({
        type: UPDATE_ORDER,
        orderId: currentJobOrderId,
        valueToUpdate: 'riderPhone',
        value: riderDetails.phone,
      });
      dispatch({
        type: UPDATE_ORDER,
        orderId: currentJobOrderId,
        valueToUpdate: 'riderImage',
        value: riderDetails.passportPhotoUrl,
      });
    };
    if (
      currentOrder.orderDetails.riderId &&
      !currentOrder.orderDetails.riderName
    ) {
      fetchRiderDetails();
    }
  }, [currentOrder, currentJobOrderId, dispatch]);

  useEffect(() => {
    const getDistTime = async () => {
      let distTime: any;
      if (currentOrder.orderDetails.status === 'pick_up') {
        distTime = await getEstimatedDistanceAndTime(
          currentOrder.orderDetails.riderLocation,
          currentOrder.orderDetails.pickUpLocation,
        );
      } else if (currentOrder.orderDetails.status === 'drop_off') {
        distTime = await getEstimatedDistanceAndTime(
          currentOrder.orderDetails.riderLocation,
          currentOrder.orderDetails.dropOffLocation,
        );
      }
      setEstimatedDistance(distTime.estimatedDistance.text);
      setEstimatedTime(distTime.estimatedTime.text);
    };

    if (currentOrder.orderDetails.riderLocation) {
      getDistTime();
    }
  }, [currentOrder.orderDetails.riderLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          loadingEnabled
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={region}
          style={styles.container}
          onMapReady={() =>
            mapRef.current.fitToCoordinates(
              [markers[0].coordinate, markers[1].coordinate],
              {
                edgePadding: styles.mapEdge,
                animated: true,
              },
            )
          }>
          {markers.map((marker, index) =>
            markersLength - 1 === index ? (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                description={marker.descrip}
                title={marker.titl}>
                <View
                  style={{
                    ...styles.secondView,
                    backgroundColor: constant.primaryTextColor,
                  }}>
                  <Image
                    style={styles.icon}
                    source={locIcon}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            ) : (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                description={marker.descrip}
                title={marker.titl}>
                <View style={styles.secondView}>
                  <Image
                    style={styles.icon}
                    source={homeIcon}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            ),
          )}
          {currentOrder.orderDetails.riderLocation ? (
            <Marker
              coordinate={currentOrder.orderDetails.riderLocation}
              description="Rider Location"
              title="Rider">
              <View style={styles.markerView}>
                <FontAwesome
                  size={30}
                  name="motorcycle"
                  color={constant.primaryColor}
                />
              </View>
            </Marker>
          ) : null}
          {currentOrder.orderDetails.status === 'pick_up' &&
          initRiderLocationPickUp ? (
            <MapViewDirections
              origin={currentOrder ? initRiderLocationPickUp : region}
              destination={
                currentOrder
                  ? currentOrder.orderDetails.pickUpLocation
                  : destLoc
              }
              strokeWidth={3}
              optimizeWaypoints={true}
              strokeColor={constant.primaryColor}
              apikey={ENV.googleApiKey}
            />
          ) : currentOrder.orderDetails.status === 'drop_off' &&
            initRiderLocationDropOff ? (
            <MapViewDirections
              origin={currentOrder ? initRiderLocationDropOff : region}
              destination={
                currentOrder
                  ? currentOrder.orderDetails.dropOffLocation
                  : destLoc
              }
              strokeWidth={3}
              optimizeWaypoints={true}
              strokeColor={constant.primaryColor}
              apikey={ENV.googleApiKey}
            />
          ) : (
            <MapViewDirections
              origin={
                currentOrder ? currentOrder.orderDetails.pickUpLocation : region
              }
              destination={
                currentOrder
                  ? currentOrder.orderDetails.dropOffLocation
                  : destLoc
              }
              strokeWidth={3}
              optimizeWaypoints={true}
              strokeColor={constant.primaryColor}
              apikey={ENV.googleApiKey}
            />
          )}
        </MapView>
      </View>
      <View style={styles.thirdView}>
        <View style={styles.fourthView}>
          <Text style={styles.firstText}>Order Received |</Text>
          <Text style={{color: '#505050', marginLeft: 5, paddingTop: 5}}>
            status:{' '}
            <Text style={styles.secondText} adjustsFontSizeToFit>
              {currentOrder.orderDetails.status === 'pending'
                ? 'Finding Rider'
                : currentOrder.orderDetails.status === 'pick_up'
                ? 'Rider on the Way'
                : currentOrder.orderDetails.status === 'drop_off'
                ? 'Rider on the way to recipient'
                : currentOrder.orderDetails.status === 'arrived_recipient'
                ? 'Rider has arrived at destination'
                : currentOrder.orderDetails.status === 'delivered'
                ? 'Package has been delivered'
                : ''}
            </Text>
          </Text>
        </View>
        <View style={styles.fifthView}>
          <View style={styles.imgView}>
            {currentOrder.orderDetails.packageImage ? (
              <Image
                source={{uri: currentOrder.orderDetails.packageImage}}
                style={styles.img}
                resizeMode="cover"
              />
            ) : (
              <MaterialIcons
                size={50 * heightRatio}
                color="grey"
                name="image"
              />
            )}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.secondText}>
              {currentOrder.orderDetails.packageType} | KES.
              {currentOrder.orderDetails.estimatedPrice}
            </Text>
            <Text style={styles.thirdText}>{currentOrder.readableDate}</Text>
          </View>
        </View>
        {currentOrder.orderDetails.status === 'pending' ? (
          <View style={styles.buttonView}>
            {cancelLoading ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Spinner style={undefined} size={undefined} />
              </View>
            ) : (
              <Button
                style={styles.button}
                onPress={() => cancelOrderHandler()}>
                <Text style={styles.buttonText}>Cancel Order</Text>
              </Button>
            )}
          </View>
        ) : null}

        <View style={styles.fifthView}>
          {estimatedDistance ? (
            <Text style={styles.secondText}>
              {estimatedDistance} away | {estimeatedTime}
            </Text>
          ) : null}
        </View>
        {currentOrder.orderDetails.riderName ? (
          <View
            style={{
              ...styles.fifthView,
              borderBottomWidth: 0,
              justifyContent: 'space-between',
            }}>
            <View style={styles.imgView}>
              {currentOrder.orderDetails.riderImage ? (
                <Image
                  source={{uri: currentOrder.orderDetails.riderImage}}
                  style={styles.img}
                  resizeMode="cover"
                />
              ) : (
                <MaterialIcons
                  size={50 * heightRatio}
                  color="grey"
                  name="image"
                />
              )}
            </View>
            <View style={styles.eighthView}>
              <Text style={{...styles.fourthText, marginLeft: -10}}>
                {currentOrder.orderDetails.riderName}
              </Text>
            </View>
            {/* <View> */}
            <TouchableOpacity
              style={styles.callContainer}
              onPress={() =>
                Linking.openURL(`tel:${currentOrder.orderDetails.riderPhone}`)
              }>
              <MaterialIcons
                name="call"
                size={20 * heightRatio}
                color="white"
              />
              <Text
                style={{...styles.titleText, color: 'white', marginLeft: 4}}>
                RIDER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.callContainer}
              onPress={() =>
                navigation.navigate('AddChatRoom', {
                  orderId: currentOrder.id,
                })
              }>
              <FontAwesome
                name="comments"
                size={20 * heightRatio}
                color="white"
              />
              <Text
                style={{...styles.titleText, color: 'white', marginLeft: 4}}>
                RIDER
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default TrackOrder;
