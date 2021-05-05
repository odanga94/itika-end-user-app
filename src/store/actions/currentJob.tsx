import {firebaseAppDatabase} from '../../../App';

export const SET_CURRENT_JOB = 'SET_CURRENT_JOB';
export const DELETE_CURRENT_JOB = 'DELETE_CURRENT_JOB';

export const addCurrentJob = (orderId: string) => {
  return async (dispatch: any, getState: any) => {
    const {userId} = getState().auth;
    try {
      await firebaseAppDatabase
        .ref(`pending_jobs/${userId}`)
        .set({currentJobOrderId: orderId});
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
