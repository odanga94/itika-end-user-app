import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import {uploadImage, getImageExtension} from '../../../utils';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const HAS_ORDERS = 'HAS_ORDERS';
export const RESET_PROFILE = 'RESET_PROFILE';

export const fetchProfile = (uid: string) => {
  return async (dispatch: any) => {
    try {
      const dataSnapshot = await database()
        .ref(`user_profiles/${uid}`)
        .once('value');
      const profileData = dataSnapshot.val();
      if (profileData) {
        const userEmail = auth().currentUser?.email;
        const userPhone = auth().currentUser?.phoneNumber;
        profileData.email = userEmail;
        profileData.phone = userPhone;
        dispatch({
          type: FETCH_PROFILE,
          profileData,
        });
      }
      return profileData;
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const createProfile = (
  uid: string,
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: any;
  },
) => {
  return async (dispatch: any) => {
    try {
      const date = new Date().toString();
      const userProfileRef = database().ref(`user_profiles/${uid}`);
      await userProfileRef.update({
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdAt: date,
      });
      await auth().currentUser?.updateEmail(userData.email);
      await auth().currentUser?.updatePassword(userData.password);
      dispatch({
        type: CREATE_PROFILE,
        userData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const editProfile = (
  uid: string,
  userData: {
    firstName: string;
    lastName: string;
    /* email: string;
    password: string;
    phone: string;*/
    imageUri: string | undefined;
  },
) => {
  return async (dispatch: any) => {
    try {
      const userProfileRef = database().ref(`user_profiles/${uid}`);
      await userProfileRef.update({
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      dispatch({
        type: EDIT_PROFILE,
        userData,
      });
      if (userData.imageUri) {
        const imgExt = getImageExtension(userData.imageUri);
        const firebaseImageUri = await uploadImage(
          userData.imageUri,
          `users/${uid}/images/profilePic${imgExt}`,
        );
        await userProfileRef.update({profilePic: firebaseImageUri});
        dispatch({
          type: UPDATE_IMAGE,
          imageUri: firebaseImageUri,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };
};

const getFirebaseImageExtension = (uri: string) => {
  let extension = '';
  if (uri.slice(-57, -53) === '.jpg' || uri.slice(-57, -53) === '.png') {
    extension = uri.slice(-57, -53);
  } else {
    extension = uri.slice(-58, -53);
  }
  return extension;
};

export const deleteProfilePic = (uid: string, imageUri: string) => {
  return async (dispatch: any) => {
    try {
      const imgExt = getFirebaseImageExtension(imageUri);
      const imageRef = storage().ref(`users/${uid}/images/profilePic${imgExt}`);
      const userProfileRef = database().ref(`user_profiles/${uid}`);
      await imageRef.delete();
      await userProfileRef.update({profilePic: ''});
      dispatch({
        type: DELETE_IMAGE,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};
