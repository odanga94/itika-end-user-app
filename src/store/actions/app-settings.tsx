import {firebaseAppDatabase} from '../../../App';

export const SET_APP_SETTINGS = 'SET_APP_SETTINGS';

export const fetchAppSettings = () => {
  return async (dispatch: any) => {
    try {
      const dataSnapShot = await firebaseAppDatabase
        .ref('app_settings')
        .once('value');
      const {baseFee, pricePerKm} = dataSnapShot.val();
      dispatch({
        type: SET_APP_SETTINGS,
        baseFee,
        pricePerKm,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};
