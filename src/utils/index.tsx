import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import * as Location from 'expo-location';

import config from '../../config';

export const checkValidity = (
  value: any,
  rules: any,
  id: string,
  passwordValue: string,
) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.min != null && +value < rules.min) {
    isValid = false;
  }
  if (rules.max != null && +value > rules.max) {
    isValid = false;
  }

  if (id === 'confirmPassword' && value !== passwordValue) {
    isValid = false;
  }

  return isValid;
};

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
    Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.High,
      //timeInterval: 10000
    })
      .then(async (info: any) => {
        const {coords} = info;
        const resp = await fetchAddressFromCoordinatesAsync(coords);
        const response = {
          resp,
          coords,
        };
        //console.log('locRes', response);
        resolve(response);
      })
      .catch((err) => console.log(err));
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
