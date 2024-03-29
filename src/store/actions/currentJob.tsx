import database from '@react-native-firebase/database';

export const SET_CURRENT_JOB = 'SET_CURRENT_JOB';
export const DELETE_CURRENT_JOB = 'DELETE_CURRENT_JOB';

export const addCurrentJob = (orderId: string) => {
  return async (dispatch: any, getState: any) => {
    const {userId} = getState().auth;
    try {
      await database()
        .ref(`pending_orders/${userId}`)
        .update({[orderId]: orderId});
      await database()
        .ref(`user_profiles/${userId}/processing_orders`)
        .update({[orderId]: orderId});
      dispatch({
        type: SET_CURRENT_JOB,
        currentJobOrderId: orderId,
      });
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong 😞');
    }
  };
};
