import {SET_CURRENT_LOCATION} from '../actions/location';

const initialState = {
  currentGpsLoc: null,
  currentAddress: '',
};

const locationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_LOCATION:
      return {
        currentGpsLoc: action.gpsLoc,
        currentAddress: action.address,
      };
    default:
      return state;
  }
};

export default locationReducer;
