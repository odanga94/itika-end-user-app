import * as Location from 'expo-location';
import * as ImgPicker from 'expo-image-picker';
import {Alert} from 'react-native';

import config from '../../config';
import {firebaseAppStorage} from '../../App';

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

export const getGpsLoc = async () => {
  try {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.High,
      //timeInterval: 10000
    });
    const resp = await fetchAddressFromCoordinatesAsync(location.coords);
    return {
      ...location.coords,
      resp,
    };
  } catch (err) {
    //console.log(err);
    throw new Error(err);
  }
};

const verifyPermissions = async () => {
  const result = await Location.requestForegroundPermissionsAsync();
  //console.log('permRes', result);
  if (result.status !== 'granted') {
    throw new Error('Insufficient Permissions!');
  }
  return true;
};

export const uploadImage = async (
  imageUri: string,
  firebaseLocation: string,
) => {
  try {
    //console.log(imageUri);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageRef = firebaseAppStorage.ref(firebaseLocation);
    await imageRef.put(blob);
    const downloadUrl = await imageRef.getDownloadURL();
    return downloadUrl;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getImageExtension = (uri: string) => {
  let extension = '';
  if (uri.slice(-4) === '.jpg' || uri.slice(-4) === '.png') {
    extension = uri.slice(-4);
  } else {
    extension = uri.slice(-5);
  }
  return extension;
};

export const verifyCameraPermissions = async () => {
  const cameraResult = await ImgPicker.requestCameraPermissionsAsync();
  const mediaLibResult = await ImgPicker.requestMediaLibraryPermissionsAsync();

  if (
    cameraResult.status !== 'granted' ||
    mediaLibResult.status !== 'granted'
  ) {
    Alert.alert(
      'Insufficient Permissions!',
      'You need to grant camera permissions to take a picture',
      [{text: 'Okay'}],
    );
    return false;
  }
  return true;
};
