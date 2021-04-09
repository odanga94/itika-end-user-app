import * as React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Swiper from 'react-native-swiper';

import {RootStackParamList} from '../AppNavigator';
import PhoneInput from '../../Components/PhoneInput';
import constant from '../../utils/constant';
import styles from './styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const image = require('../../../assets/background-login.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Verify: React.FC<Props> = (props) => {
  return (
    <View style={styles.safeArea}>
      <View style={styles.secondView}>
        <Swiper
          dotColor={constant.commonColor}
          activeDotColor={constant.primaryColor}
          dotStyle={styles.dot}
          activeDotStyle={styles.dot}>
          <ImageBackground
            source={image}
            style={styles.secondView}
            resizeMode="cover"
          />
          <ImageBackground
            source={image}
            style={styles.secondView}
            resizeMode="cover"
          />
          <ImageBackground
            source={image}
            style={styles.secondView}
            resizeMode="cover"
          />
        </Swiper>
      </View>
      <View style={styles.thirdView}>
        <View style={styles.fourthView}>
          <Text style={styles.firstText}>Right this way</Text>
          <Text style={styles.secondText}>
            Enter your mobile number to get started
          </Text>
        </View>
        <View style={styles.fifthView}>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate('Login')}>
            <PhoneInput enableEvent="none" focus={false} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};
export default Verify;
