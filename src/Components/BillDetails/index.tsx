import React from 'react';
import {View, Text, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../../Screens/AppNavigator';
import Coupon from '../Coupon';
import Button from '../Button';
import styles from './styles';

const homeIcon = require('../../../assets/home1.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const BillDetails: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.commonView}>
      <View style={styles.secondView}>
        <Coupon navigation={navigation} />
      </View>
      <View style={styles.thirdView}>
        <View style={styles.fourthView}>
          <Text style={styles.firstText}>Bill Details</Text>
        </View>
        <View style={styles.fifthView}>
          <View style={styles.sixthView}>
            <Text style={styles.commonText}>Item total :</Text>
            <Text style={styles.commonText}>$250</Text>
          </View>
          <View style={styles.seventhView}>
            <Text style={styles.commonText}>Restaurant charges:</Text>
            <Text style={styles.secondText}>$12</Text>
          </View>
          <View style={styles.eighthView}>
            <Text style={styles.commonText}>Delivery charges:</Text>
            <Text style={styles.thirdText}>Free</Text>
          </View>
          <View style={styles.ninthView}>
            <Text style={styles.fourthText}>Total Pay</Text>
            <Text style={styles.fifthText}>$267</Text>
          </View>
        </View>
      </View>
      <View style={styles.tenthView}>
        <View style={styles.eleventhView}>
          <View style={styles.twelvethView}>
            <View style={styles.thirthteenView}>
              <Image
                source={homeIcon}
                style={styles.homeIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.sixthText}>Delivery Address</Text>
          </View>
          <View style={styles.fourthteenView}>
            <View style={styles.fifthteenView}>
              <Text style={styles.seventhText}>Change</Text>
            </View>
          </View>
        </View>
        <View style={styles.sixteenthView}>
          <View style={styles.seventeenView}>
            <Text style={styles.eightText}>
              Geekyants Software, Bannerghatta Main Road,
            </Text>
            <Text style={styles.eightText}>
              BTM Layout,2nd Stage, 2nd Main Road No 18, First Floor,
            </Text>
            <Text style={styles.eightText}>Benguluru, karnataka 560076</Text>
          </View>
          <View style={styles.buttonView}>
            <Button onPress={() => {}} style={styles.button}>
              <Text style={styles.buttonText}>Make Payment</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
export default BillDetails;
