import {SET_APP_SETTINGS} from '../actions/app-settings';

const initialState = {
  baseFee: 50,
  pricePerKm: 23,
};

const appSettingsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_APP_SETTINGS:
      return {
        baseFee: action.baseFee,
        pricePerKm: action.pricePerKm,
      };
    default:
      return state;
  }
};

export default appSettingsReducer;
