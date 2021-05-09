export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';

export const setCurrentLocation = (gpsLoc: any, address: string) => {
  return {
    type: SET_CURRENT_LOCATION,
    gpsLoc: gpsLoc,
    address: address,
  };
};
