import {SET_APP_SETTINGS, SET_APP_VERSION_CODE} from '../actions/app-settings';

const initialState = {
  baseFee: 50,
  pricePerKm: 23,
  versionCode: 5,
};

const appSettingsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_APP_SETTINGS:
      return {
        ...state,
        baseFee: action.baseFee,
        pricePerKm: action.pricePerKm,
      };
    case SET_APP_VERSION_CODE:
      return {
        ...state,
        versionCode: action.versionCode,
      };
    default:
      return state;
  }
};

export default appSettingsReducer;
