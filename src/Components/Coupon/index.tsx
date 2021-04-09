import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './styles';
import {RootStackParamList} from '../../Screens/AppNavigator';

const discountIcon = require('../../../assets/discount.png');
const forwardIcon = require('../../../assets/left-arrow.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Coupon: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <TouchableWithoutFeedback
      style={styles.firstView}
      onPress={() => navigation.navigate('ApplyCoupon')}>
      <View style={styles.firstView}>
        <View style={styles.secondView}>
          <Image
            source={discountIcon}
            style={styles.discountIcon}
            resizeMode="contain"
          />
          <Text style={styles.firstText}>Apply Coupon</Text>
        </View>
        <View style={styles.thirdView}>
          <Image
            source={forwardIcon}
            style={styles.forIcon}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Coupon;
