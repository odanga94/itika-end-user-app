import * as React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Button from '../../Components/Button';
import styles from './styles';
import {RootStackParamList} from '../AppNavigator';
import constant from '../../utils/constant';
import { isError } from 'lodash';
const image = require('../../../assets/background.png');
const icon = require('../../../assets/icon-fd.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Splash: React.FC<Props> = (props) => {
  const {navigation} = props;
  const isReduxWorking = useSelector(state => state.isReduxWorking);

  console.log('redux is working?', isReduxWorking);

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={constant.blackColor}
      />
      <View style={styles.firstView}>
          <View style={styles.secondView}>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.firstText}>
              Your Delivery Partner.
            </Text>
          </View>
          <View style={styles.thirdView}>
            <Button
              style={styles.fourthView}
              onPress={() => navigation.navigate('Verify')}>
              <Text style={styles.sixthText}>Get Started</Text>
            </Button>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Verify')}>
              <View style={styles.fifthView}>
                <Text style={styles.fourthText}>Have an account? </Text>
                <Text style={styles.fifthText}>Login </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
      </View>
    </View>
  );
};
export default Splash;
