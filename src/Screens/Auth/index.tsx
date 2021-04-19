/* eslint-disable react-native/no-inline-styles */
import React, {useState, Fragment} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Alert,
  Linking,
} from 'react-native';
//import * as facebook from 'expo-facebook';
//import * as firebase from 'firebase';
//import * as Google from 'expo-google-app-auth';
//import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import Button from '../../Components/Button';
import Spinner from '../../Components/UI/Spinner';
//import Colors from '../constants/colors';
//import DefaultStyles from '../constants/default-styles';
import * as authActions from '../../store/actions/user/auth';
import SignInWithEmailForm from '../../Components/SignInWithEmail';
import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import constant from '../../utils/constant';

const {height} = Dimensions.get('window');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Auth: React.FC<Props> = (props) => {
  const [isEmailAuth, setIsEmailAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [credentials, setCredentials] = useState();
  const dispatch = useDispatch();

  const authHandler = async () => {
    if (!formIsValid) {
      Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    console.log(credentials);
    setIsLoading(true);
    try {
      await dispatch(
        authActions.logIn(credentials.email, credentials.password),
      );
    } catch (err) {
      console.log(err);
      Alert.alert('Something went wrong', err.message, [{text: 'Okay'}]);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  /* const facebookAuthHandler = async () => {
    setIsLoading(true);
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        //console.log(token, 'expires', expires);
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // const responseBody = await response.json();
        // console.log(responseBody);
        //Alert.alert('Logged in!', `Hi ${responseBody.name}!`);
        const userCredential = await firebase
          .auth()
          .signInWithCredential(
            firebase.auth.FacebookAuthProvider.credential(token),
          );
        //console.log(userCredential);
        const userId = userCredential.user.uid;
        if (userCredential.additionalUserInfo.isNewUser) {
          const userName = userCredential.user.displayName;
          const profilePicUrl = userCredential.user.photoURL;
          const date = new Date().toString();
          await firebase.database().ref(`user_profiles/${userId}`).set({
            name: userName,
            phone: '',
            created_At: date,
            profilePic: profilePicUrl,
          });
          /*.then((res) => {
                        //console.log(res);
                        dispatch(authenticate(response.user.uid));
                    }).catch(err => {
                        throw new Error(err);
                    })
        }
        dispatch(authActions.authenticate(userId, true));
      } else {
        //type === 'cancel'
        setIsLoading(false);
      }
    } catch ({message}) {
      setIsLoading(false);
      Alert.alert('Error occurred', `Facebook Login Error: ${message}`);
    }
  };

  const googleAuthHandler = async () => {
    setIsLoading(true);
    try {
      const {type, idToken, accessToken, user} = await Google.logInAsync({
        iosClientId:
          '606625555327-ia9u5s5plimsg7360pjp5mcu6kc9dp8m.apps.googleusercontent.com',
        androidClientId:
          '606625555327-904ok6kequmidff43huhnssoqkf8d16q.apps.googleusercontent.com',
        androidStandaloneAppClientId:
          '606625555327-k3fbrf7vf08gp2oe820c9hq69eihfddo.apps.googleusercontent.com',
      });

      if (type === 'success') {
        //console.log('user', user);
        const userCredential = await firebase
          .auth()
          .signInWithCredential(
            firebase.auth.GoogleAuthProvider.credential(idToken, accessToken),
          );
        //console.log(userCredential);
        const userId = userCredential.user.uid;
        if (userCredential.additionalUserInfo.isNewUser) {
          const userName = userCredential.user.displayName;
          const profilePicUrl = userCredential.user.photoURL;
          const date = new Date().toString();
          await firebase.database().ref(`user_profiles/${userId}`).set({
            name: userName,
            phone: '',
            created_At: date,
            profilePic: profilePicUrl,
          });
        }
        dispatch(authActions.authenticate(userId, false, true));
      } else {
        // type === 'cancel'
        setIsLoading(false);
      }
    } catch ({message}) {
      setIsLoading(false);
      Alert.alert('Error occurred', `Google Login Error: ${message}`);
    }
  }; */

  /* const TouchableCmp =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback; */

  return (
    <View style={{flex: 1, padding: 20, justifyContent: 'space-between'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={height / 4.5}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.screen}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../assets/icon-fd.png')}
              resizeMode="contain"
            />
          </View>
          {/* <View style={styles.labelsContainer}>
            <TouchableCmp
              style={{flex: 1, height: 30}}
              onPress={() => {
                setIsSignUp(false);
              }}>
              <View
                style={{
                  ...styles.button,
                  borderBottomColor: !isSignUp ? Colors.secondary : '#ccc',
                }}>
                <Text
                  style={{
                    ...DefaultStyles.titleText,
                    color: !isSignUp ? Colors.secondary : '#aaa',
                  }}>
                  LOG IN
                </Text>
              </View>
            </TouchableCmp> */}
          {/* <TouchableCmp
              style={{flex: 1, height: 30}}
              onPress={() => {
                setIsSignUp(true);
              }}>
              <View
                style={{
                  ...styles.button,
                  borderBottomColor: isSignUp ? Colors.secondary : '#ccc',
                }}>
                <Text
                  style={{
                    ...DefaultStyles.titleText,
                    color: isSignUp ? Colors.secondary : '#ccc',
                  }}>
                  SIGN UP
                </Text>
              </View>
            </TouchableCmp> */}
          {/* </View> */}
          {/*          {!isEmailAuth ? (
            isLoading ? (
              <Spinner />
            ) : (
              <Fragment>
                <TouchableOpacity
                  style={{
                    ...styles.authButton,
                    backgroundColor: Colors.primary,
                  }}
                  onPress={() => {
                    setIsEmailAuth(true);
                  }}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={25}
                    color="white"
                  />
                  <Text style={{...styles.buttonText, marginLeft: 10}}>
                    {isSignUp ? 'Sign Up with Email' : 'Log In with Email'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.authButton,
                    backgroundColor: 'rgb(231, 59, 46)',
                  }}
                  onPress={() => {
                    googleAuthHandler();
                  }}>
                  <MaterialCommunityIcons
                    name="google-plus"
                    size={30}
                    color="white"
                  />
                  <Text style={{...styles.buttonText, marginLeft: 10}}>
                    {isSignUp ? 'Sign Up with Google' : 'Log In with Google'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.authButton}
                  onPress={() => {
                    facebookAuthHandler();
                  }}>
                  <FontAwesome name="facebook" size={30} color="white" />
                  <Text style={{...styles.buttonText, marginLeft: 10}}>
                    {isSignUp
                      ? 'Sign Up with Facebook'
                      : 'Log In with Facebook'}
                  </Text>
                </TouchableOpacity>
              </Fragment>
            )
          ) : (
            <SignInWithEmailForm
              setFormIsValid={setFormIsValid}
              setCredentials={setCredentials}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      {!isEmailAuth ? null : !isLoading ? (
        <MainButton
          style={{marginTop: 10}}
          onPress={() => {
            authHandler(credentials);
          }}>
          {isSignUp ? 'Sign Up' : 'Log In'}
        </MainButton>
      ) : (
        <Spinner />
      )} */}
          <SignInWithEmailForm
            setFormIsValid={setFormIsValid}
            setCredentials={setCredentials}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoading ? (
        <Spinner />
      ) : (
        <Button
          style={styles.fourthView}
          onPress={() => {
            authHandler();
          }}>
          <Text style={styles.sixthText}>Login</Text>
        </Button>
      )}
    </View>
  );
};

/* Auth.navigationOptions = {
  headerTitle: 'Sign In',
}; */

export default Auth;
