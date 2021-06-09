import database from '@react-native-firebase/database';

import Order from '../../models/order';
import {uploadImage} from '../../utils';
import * as currentJobActions from './currentJob';
//import config from '../../../config';

export const ADD_ORDER = 'ADD_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
export const SORT_ORDERS = 'SORT_ORDERS';
export const REMOVE_ORDER = 'REMOVE_ORDER';
export const RESET_ORDERS = 'RESET_ORDERS';
export const SET_ORDER_ID_BEING_PROCESSED = 'SET_ORDER_ID_BEING_PROCESSED';
export const RESET_ORDER_ID_BEING_PROCESSED = 'RESET_ORDER_ID_BEING_PROCESSED';
export const SHOULD_NAVIGATE_TO_CHAT = 'SHOULD_NAVIGATE_TO_CHAT';
export const RESET_SHOULD_NAVIGATE_TO_CHAT = 'RESET_SHOULD_NAVIGATE_TO_CHAT';
export const SHOULD_NAVIGATE_TO_TRACK_ORDER = 'SHOULD_NAVIGATE_TO_TRACK_ORDER';
export const RESET_SHOULD_NAVIGATE_TO_TRACK_ORDER =
  'RESET_SHOULD_NAVIGATE_TO_TRACK_ORDER';

const getRiderDetails = async (riderId: string) => {
  const dataSnapshot = await database().ref(`riders/${riderId}`).once('value');
  const resData = dataSnapshot.val();
  //console.log(resData);
  return resData;
};

export const fetchOrders = (userId: string) => {
  return async (dispatch: any) => {
    //const fetchedOrders = [];
    try {
      const dataSnapshot = await database()
        .ref(`orders/${userId}`)
        .once('value');
      const resData = dataSnapshot.val();
      if (!resData) {
        /* dispatch({
          type: SET_ORDERS,
          orders: [],
        }); */
        return;
      }

      const fetchedOrders = Object.keys(resData).map((orderId) => {
        return new Order(orderId, {...resData[orderId]});
      });

      for (let i = fetchedOrders.length - 1; i >= 0; i--) {
        if (fetchedOrders[i].orderDetails.riderId) {
          let riderDetails: any;
          try {
            riderDetails = await getRiderDetails(
              fetchedOrders[i].orderDetails.riderId,
            );
            //console.log('rider', riderDetails)
          } catch (err) {
            console.log(err);
          }
          dispatch(
            dispatchNewOrder(fetchedOrders[i].id, {
              ...fetchedOrders[i].orderDetails,
              riderName: riderDetails
                ? `${riderDetails.firstName} ${riderDetails.lastName}`
                : '',
              riderPhone: riderDetails ? riderDetails.phone : '',
              riderImage: riderDetails.passportPhotoUrl
                ? riderDetails.passportPhotoUrl
                : '',
              riderRating: riderDetails.averageRating
                ? riderDetails.averageRating
                : null,
            }),
          );
        } else {
          dispatch(
            dispatchNewOrder(fetchedOrders[i].id, {
              ...fetchedOrders[i].orderDetails,
            }),
          );
        }
      }
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong 😞');
    }
  };
};

export const dispatchNewOrder = (orderId: string, orderDetails: any) => {
  return {
    type: ADD_ORDER,
    orderDetails,
    orderId,
  };
};

export const addOrder = (userId: string, orderDetails: any) => {
  return async (dispatch: any) => {
    let orderId;
    try {
      const details = {
        ...orderDetails,
        packagePhotoUri: null,
      };
      const orderRef = await database().ref(`orders/${userId}`).push(details);
      const orderRefArray = orderRef.toString().split('/');
      orderId = orderRefArray[orderRefArray.length - 1];
      //console.log('[ORDER_ID]', orderId);
      /* if (paymentType === "mpesa") {
                await billClient(userId, orderId, clientPhone);
            } */
      dispatch(dispatchNewOrder(orderId, details));
      await dispatch(currentJobActions.addCurrentJob(orderId));
    } catch (err) {
      console.log(err);
      /* if (err.message = "mpesaConfigError") {
                await firebase.database().ref(`orders/${userId}/${orderId}`).remove();
                dispatch({
                    type: REMOVE_ORDER,
                    orderId
                });
            } */
      throw new Error('Something went wrong 😞.  Please try again later.');
    }
    if (orderDetails.packagePhotoUri) {
      try {
        const firebaseImageUri = await uploadImage(
          orderDetails.packagePhotoUri,
          `users/${userId}/orders/${orderId}/packageImage.jpg`,
        );
        database()
          .ref(`orders/${userId}/${orderId}`)
          .update({packageImage: firebaseImageUri});
        dispatch({
          type: UPDATE_ORDER,
          valueToUpdate: 'packageImage',
          value: firebaseImageUri,
          orderId,
        });
      } catch (err) {
        throw new Error('Error uploading image but your order was successful.');
      }
    }
  };
};

export const cancelOrder = (orderId: string, clientId: string) => {
  return async (dispatch: any) => {
    try {
      await database().ref(`pending_orders/${clientId}/${orderId}`).remove();
      await database()
        .ref(`user_profiles/${clientId}/processing_orders/${orderId}`)
        .remove();
      await database()
        .ref(`orders/${clientId}/${orderId}`)
        .update({status: 'cancelled'});
      dispatch({
        type: UPDATE_ORDER,
        valueToUpdate: 'status',
        value: 'cancelled',
        orderId,
      });
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong 😞.  Please try again later.');
    }
  };
};

/* export const fetchProDetails = (problemType, proId, orderId) => {
  return async (dispatch) => {
    //console.log('fromFetchPro', problemType, proId, orderId);
    let proDetails = '';
    try {
      proDetails = await getProDetails(problemType, proId);
      //console.log('from fetchPro', proDetails)
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: UPDATE_ORDER,
      orderId,
      valueToUpdate: 'proName',
      value: proDetails ? `${proDetails.firstName} ${proDetails.lastName}` : '',
    });
    dispatch({
      type: UPDATE_ORDER,
      orderId,
      valueToUpdate: 'proPhone',
      value: proDetails ? `${proDetails.phone}` : '',
    });
    let imageDownloadUrl;
    try {
      imageDownloadUrl = await getProImageUrl(problemType, proId);
      //console.log('from fetchPro', proImageUrl)
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: UPDATE_ORDER,
      orderId,
      valueToUpdate: 'proImage',
      value: imageDownloadUrl,
    });
  };
}; */
