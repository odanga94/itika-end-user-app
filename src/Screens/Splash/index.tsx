/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
  Linking,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import * as authActions from '../../store/actions/user/auth';
import Button from '../../Components/Button';
import styles from './styles';
import {RootStackParamList} from '../AppNavigator';
import constant from '../../utils/constant';
import {firebaseAppAuth} from '../../../App';

const splash = require('../../../assets/launch_screen.png');
const icon = require('../../../assets/icon-fd.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Splash: React.FC<Props> = (props) => {
  const {navigation} = props;
  /*   const isReduxWorking = useSelector(state => state.isReduxWorking);

  console.log('redux is working?', isReduxWorking); */
  const dispatch = useDispatch();

  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await firebaseAppAuth.onAuthStateChanged((user) => {
          if (user) {
            //console.log(user, 'Auth state is preserved in firebase');
            dispatch(authActions.authenticate(user.uid, false, false));
            navigation.reset({
              index: 0,
              routes: [{name: 'Tabs'}],
            });
          } else {
            setIsLoggedInLoading(false);
          }
        });
      } catch (err) {
        console.log('err', err.message);
        setIsLoggedInLoading(false);
        Alert.alert('Something went Wrong.', err.message, [{text: 'Okay'}]);
      }
    };
    checkAuthStatus();
  }, [dispatch, navigation]);

  if (isLoggedInLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image source={splash} style={styles.image} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={constant.primaryTextColor} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.firstView}>
        <View style={styles.secondView}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.firstText}>Your Delivery Partner.</Text>
        </View>
        <View style={styles.thirdView}>
          <Button
            style={styles.fourthView}
            onPress={() => navigation.navigate('Verify')}>
            <Text style={styles.sixthText}>Get Started</Text>
          </Button>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Auth')}>
            <View style={styles.fifthView}>
              <Text style={styles.fourthText}>Have an account? </Text>
              <Text style={styles.fifthText}>Login </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{paddingHorizontal: 30, bottom: 10}}>
          <Text style={styles.terms}>
            By signing up, you agree to our{' '}
            <Text
              style={{color: constant.primaryTextColor}}
              onPress={() =>
                Linking.openURL(
                  'https://drive.google.com/file/d/1MCoxOZ3xXNNf1ILcORWAqozYwVKStifK/view?usp=sharing',
                )
              }>
              Terms and Conditions
            </Text>{' '}
            and
            <Text> </Text>
            <Text
              style={{color: constant.primaryTextColor}}
              onPress={() =>
                Linking.openURL(
                  'https://drive.google.com/file/d/1FuSf8AS7qgniDApdRSzuehHoyO5v6rRM/view?usp=sharing',
                )
              }>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Splash;
