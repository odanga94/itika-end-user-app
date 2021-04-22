import {firebaseAppDatabase, firebaseAppAuth} from '../../../../App';

//import {uploadImage} from '../../../shared/functions';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const HAS_ORDERS = 'HAS_ORDERS';
export const RESET_PROFILE = 'RESET_PROFILE';

/* export const fetchProfile = (uid) => {
  return async (dispatch) => {
    try {
      const dataSnapshot = await firebase
        .database()
        .ref(`user_profiles/${uid}`)
        .once('value');
      const profileData = dataSnapshot.val();
      dispatch({
        type: FETCH_PROFILE,
        profileData,
      });
      return profileData;
    } catch (err) {
      throw new Error(err);
    }
  };
}; */

export const editProfile = (
  uid: string,
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  },
) => {
  return async (dispatch: any) => {
    try {
      const userProfileRef = firebaseAppDatabase.ref(`user_profiles/${uid}`);
      await userProfileRef.update({
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      await firebaseAppAuth.currentUser?.updateEmail(userData.email);
      await firebaseAppAuth.currentUser?.updatePassword(userData.password);
      dispatch({
        type: EDIT_PROFILE,
        userData,
      });
      /* if (userData.imageUri) {
        const firebaseImageUri = await uploadImage(
          userData.imageUri,
          `images/${uid}/profilePic.jpg`,
        );
        await userProfileRef.update({profilePic: firebaseImageUri});
        dispatch({
          type: UPDATE_IMAGE,
          imageUri: firebaseImageUri,
        });
      } */
    } catch (err) {
      throw new Error(err);
    }
  };
};

/* export const deleteProfilePic = (uid) => {
  return async (dispatch) => {
    try {
      const imageRef = firebase.storage().ref(`images/${uid}/profilePic.jpg`);
      const userProfileRef = firebase.database().ref(`user_profiles/${uid}`);
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
}; */
