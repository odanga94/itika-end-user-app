import {firebaseAppDatabase} from '../../../App';

import Order from '../../models/order';
import {uploadImage} from '../../utils';
import * as currentJobActions from './currentJob';

export const ADD_ORDER = 'ADD_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
export const SORT_ORDERS = 'SORT_ORDERS';
export const REMOVE_ORDER = 'REMOVE_ORDER';
export const RESET_ORDERS = 'RESET_ORDERS';
export const SET_ORDER_ID_BEING_PROCESSED = 'SET_ORDER_ID_BEING_PROCESSED';
export const RESET_ORDER_ID_BEING_PROCESSED = 'RESET_ORDER_ID_BEING_PROCESSED';

const getRiderDetails = async (riderId: string) => {
  const dataSnapshot = await firebaseAppDatabase
    .ref(`riders/${riderId}`)
    .once('value');
  const resData = dataSnapshot.val();
  //console.log(resData);
  return resData;
};


/* export const fetchOrders = (userId) => {
  return async (dispatch, getState) => {
    //const fetchedOrders = [];
    try {
      const dataSnapshot = await firebase
        .database()
        .ref(`orders/${userId}`)
        .once('value');
      const resData = dataSnapshot.val();
      if (!resData) {
        dispatch({
          type: SET_ORDERS,
          orders: [],
        });
        return;
      }

      const fetchedOrders = Object.keys(resData).map((orderId) => {
        return new Order(orderId, {...resData[orderId]});
      });

      for (let i = fetchedOrders.length - 1; i >= 0; i--) {
        if (fetchedOrders[i].orderDetails.assignedProId) {
          let proDetails = '';
          let proImageUrl = '';
          try {
            proDetails = await getProDetails(
              fetchedOrders[i].orderDetails.problemType,
              fetchedOrders[i].orderDetails.assignedProId,
            );
            //console.log(proDetails)
          } catch (err) {
            console.log(err);
          }
          try {
            proImageUrl = await getProImageUrl(
              fetchedOrders[i].orderDetails.problemType,
              fetchedOrders[i].orderDetails.assignedProId,
            );
            //console.log(proImageUrl)
          } catch (err) {
            console.log(err);
          }
          dispatch(
            dispatchNewOrder(
              fetchedOrders[i].id,
              {
                ...fetchedOrders[i].orderDetails,
                proName: proDetails
                  ? `${proDetails.firstName} ${proDetails.lastName}`
                  : '',
                proPhone: proDetails ? proDetails.phone : '',
                proImage: proImageUrl ? proImageUrl : '',
              },
              'fetch orders',
            ),
          );
        } else {
          dispatch(
            dispatchNewOrder(
              fetchedOrders[i].id,
              {
                ...fetchedOrders[i].orderDetails,
              },
              'fetch orders',
            ),
          );
        }
      }
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong 😞');
    }
  };
}; */

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
      const orderRef = await firebaseAppDatabase
        .ref(`orders/${userId}`)
        .push(details);
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
          `users/${userId}/orders/${orderId}/problemImage.jpg`,
        );
        firebaseAppDatabase
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
