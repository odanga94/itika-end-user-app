import React, {useEffect, useState} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';

import constants from '../../utils/constant';
import * as orderActions from '../../store/actions/orders';
import * as currentJobActions from '../../store/actions/currentJob';
import Spinner from '../../Components/UI/Spinner';

import styles from './styles';
const mapPoint = require('../../../assets/placeholder.png');

interface Props {
  currentOrder: any;
  userId: string;
  route: any;
  navigation: any;
  completeOrder: boolean;
  setCompleteOrder: (val: boolean) => void;
  justDeleted: boolean | undefined;
  setJustDeleted: (val: boolean) => void;
}

const CurrentOrder: React.FC<Props> = (props) => {
  const {
    currentOrder,
    userId,
    route,
    navigation,
    completeOrder,
    setCompleteOrder,
    justDeleted,
    setJustDeleted,
  } = props;
  const dispatch = useDispatch();
  //console.log('curr', currentOrder);

  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    if (completeOrder) {
      if (currentOrder && currentOrder.orderDetails.status === 'delivered') {
        dispatch({
          type: currentJobActions.DELETE_CURRENT_JOB,
          currentJobOrderId: currentOrder.id,
        });
        setCompleteOrder(false);
        setJustDeleted(true);
        return;
      }
    } else if (
      !completeOrder &&
      currentOrder &&
      currentOrder.orderDetails.status === 'delivered' &&
      !justDeleted
    ) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'OrderComplete',
            params: {
              orderId: currentOrder.id,
            },
          },
        ],
      });
    }
  }, [
    currentOrder,
    completeOrder,
    setCompleteOrder,
    route,
    navigation,
    dispatch,
    justDeleted,
    setJustDeleted,
  ]);

  useEffect(() => {
    const cancelJobHandler = async () => {
      setCancelLoading(true);
      try {
        await dispatch(orderActions.cancelOrder(currentOrder.id, userId));
        dispatch({
          type: currentJobActions.DELETE_CURRENT_JOB,
          currentJobOrderId: currentOrder.id,
        });
      } catch (err) {
        Alert.alert(
          'Something went wrong 😞',
          'We were unable to cancel your order at this time. Please try again later.',
          [{text: 'Okay'}],
        );
      }
      setCancelLoading(false);
    };

    const currentJobRef = database().ref(`orders/${userId}/${currentOrder.id}`);

    const onChildChanged = async (dataSnapShot: any) => {
      console.log('key', dataSnapShot.key);
      if (dataSnapShot.key === 'status') {
        //console.log(dataSnapShot.val());
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentOrder.id,
          valueToUpdate: 'status',
          value: dataSnapShot.val(),
        });
        if (dataSnapShot.val() === 'cancelled') {
          //job cancelled while in home
          if (
            route.params &&
            route.params.cancelJob &&
            route.params.orderIdToCancel
          ) {
            return;
          }
          cancelJobHandler();
        }
      } else if (dataSnapShot.key === 'riderLocation') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentOrder.id,
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
          orderId: currentOrder.id,
          valueToUpdate: 'riderId',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'riderLocation') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentOrder.id,
          valueToUpdate: 'riderLocation',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'pickUpDate') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentOrder.id,
          valueToUpdate: 'pickUpDate',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'arrivedAtRecipientDate') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentOrder.id,
          valueToUpdate: 'arrivedAtRecipientDate',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'deliveredDate') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentOrder.id,
          valueToUpdate: 'deliveredDate',
          value: dataSnapShot.val(),
        });
      } else if (dataSnapShot.key === 'amountPaid') {
        dispatch({
          type: orderActions.UPDATE_ORDER,
          orderId: currentOrder.id,
          valueToUpdate: 'amountPaid',
          value: dataSnapShot.val(),
        });
      }
    };

    if (currentOrder) {
      currentJobRef.on('child_changed', onChildChanged);
      currentJobRef.on('child_added', handleChildAdded);
    }

    return () => {
      currentJobRef.off('child_changed', onChildChanged);
      currentJobRef.off('child_added', handleChildAdded);
    };
  }, [currentOrder, dispatch, userId, route]);

  useEffect(() => {
    const fetchRiderDetails = async () => {
      const dataSnapshot = await database()
        .ref(`riders/${currentOrder.orderDetails.riderId}`)
        .once('value');
      const riderDetails = dataSnapshot.val();
      const fullName = `${riderDetails.firstName} ${riderDetails.lastName}`;
      dispatch({
        type: orderActions.UPDATE_ORDER,
        orderId: currentOrder.id,
        valueToUpdate: 'riderName',
        value: fullName,
      });
      dispatch({
        type: orderActions.UPDATE_ORDER,
        orderId: currentOrder.id,
        valueToUpdate: 'riderPhone',
        value: riderDetails.phone,
      });
      dispatch({
        type: orderActions.UPDATE_ORDER,
        orderId: currentOrder.id,
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
  }, [currentOrder, dispatch]);

  if (cancelLoading) {
    return (
      <View>
        <Spinner size="large" style="undefined" />
      </View>
    );
  }

  return (
    <View style={styles.firstView}>
      <View style={styles.secondView}>
        {currentOrder.orderDetails.packageImage ? (
          <Image
            source={{uri: currentOrder.orderDetails.packageImage}}
            style={styles.img}
            resizeMode="contain"
          />
        ) : (
          <MaterialIcons size={100} color="grey" name="image" />
        )}
      </View>
      <View style={styles.thirdView}>
        <Text style={styles.firstText}>
          {currentOrder.orderDetails.packageType} Package
        </Text>
        <Text style={styles.sixthText}>({currentOrder.readableDate})</Text>
        <View style={styles.fourthView}>
          <Text style={styles.thirdText}>
            Pick Up:{' '}
            <Text style={{color: constants.primaryColor}}>
              {currentOrder.orderDetails.pickUpLocationAddress}
            </Text>
          </Text>
          <Text style={styles.thirdText}>
            Drop Off:{' '}
            <Text style={{color: constants.primaryTextColor}}>
              {currentOrder.orderDetails.dropOffLocationAddress}
            </Text>
          </Text>
        </View>
        {/* <View style={styles.fifthView}>
          <Text style={styles.thirdText}>
            Status:{' '}
            <Text style={styles.fifthText} adjustsFontSizeToFit>
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
        </View> */}
      </View>
    </View>
  );
};

export default CurrentOrder;
