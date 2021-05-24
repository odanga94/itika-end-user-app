import database from '@react-native-firebase/database';

export const SET_APP_SETTINGS = 'SET_APP_SETTINGS';
export const SET_APP_VERSION_CODE = 'SET_APP_VERSION_CODE';

export const fetchAppSettings = () => {
  return async (dispatch: any) => {
    try {
      const dataSnapShot = await database().ref('app_settings').once('value');
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
