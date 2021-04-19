/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
  Linking,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import Button from '../../Components/Button';
import styles from './styles';
import {RootStackParamList} from '../AppNavigator';
import constant from '../../utils/constant';
import {isError} from 'lodash';
const image = require('../../../assets/background.png');
const icon = require('../../../assets/icon-fd.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Splash: React.FC<Props> = (props) => {
  const {navigation} = props;
  /*   const isReduxWorking = useSelector(state => state.isReduxWorking);

  console.log('redux is working?', isReduxWorking); */

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={constant.blackColor}
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
            By signing up, you agree to our Terms and Conditions and
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
