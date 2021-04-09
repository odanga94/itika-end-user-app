import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import config from '../../config';

export const fetchAddressFromCoordinatesAsync = async (region: any) => {
  try {
    const loc = await fetch(
      `https:/maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${config.googleApiKey}`,
      {
        method: 'GET',
      },
    );
    const resp = await loc.json();
    return resp.results[0];
  } catch (e) {
    throw e;
  }
};

export const fetchPrediction = async (queryString: string, region: any) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${config.googleApiKey}&input=${queryString}&location=${region.latLong.latitude},${region.latLong.longitude}&radius=50000`;
    const callUrl = await fetch(url);
    const resp = await callUrl.json();
    return resp;
  } catch (e) {
    throw e;
  }
};

export const fetchCoordinatesFromAddress = async (address: string) => {
  const fetchCoords = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.googleApiKey}`,
    {
      method: 'GET',
    },
  );
  const resp = await fetchCoords.json();
  return resp.results[0];
};

const getGpsLoc = () => {
  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(async (info: any) => {
      const {coords} = info;
      const resp = await fetchAddressFromCoordinatesAsync(coords);
      const response = {
        resp,
        coords,
      };
      resolve(response);
    });
  });
};

export const checkPermission = async () => {
  if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
    if (result === 'granted') {
      const resp = await getGpsLoc();
      return resp;
    }
  } else {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result === 'granted') {
      const resp = await getGpsLoc();
      return resp;
    }
  }
};
