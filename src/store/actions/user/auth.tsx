import auth from '@react-native-firebase/auth';

/* import { RESET_ORDERS } from '../orders';*/
import {RESET_PROFILE} from './profile';
import {RESET_ORDERS} from '../orders';
import {DELETE_CURRENT_JOB} from '../currentJob';
import {RESET_CHATS, RESET_CHAT_ID_BEING_PROCESSED} from '../support';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_OUT = 'LOG_OUT';

export const authenticate = (
  userId: string,
  isFacebookUser: boolean,
  isGoogleUser: boolean,
) => {
  return (dispatch: any) => {
    dispatch({
      type: AUTHENTICATE,
      userId,
      isFacebookUser: isFacebookUser,
      isGoogleUser: isGoogleUser,
    });
  };
};

/* export const signUp = (email, password, name, phone) => {
    return async dispatch => {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const date = new Date().toString()
            await firebase.database().ref(`user_profiles/${response.user.uid}`)
                .set({
                    name: name,
                    phone: phone,
                    created_At: date
                }).then((res) => {
                    //console.log(res);
                    dispatch(authenticate(response.user.uid));
                }).catch(err => {
                    throw new Error(err);
                })        
        } catch (error){
            throw new Error(error);
        }
    }
} */

export const logIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      //console.log('res', response);
      if (response.user) {
        dispatch(authenticate(response.user.uid, false, false));
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const logOut = () => {
  return async (dispatch: any) => {
    try {
      await auth().signOut();
      dispatch({
        type: LOG_OUT,
      });
    } catch (err) {
      throw new Error(err);
    }
    dispatch({
      type: RESET_PROFILE,
    });
    dispatch({
      type: RESET_ORDERS,
    });
    dispatch({
      type: DELETE_CURRENT_JOB,
    });
    dispatch({
      type: RESET_CHATS,
    });
    dispatch({
      type: RESET_CHAT_ID_BEING_PROCESSED,
    });
  };
};
