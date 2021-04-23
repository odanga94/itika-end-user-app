import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import styles from './styles';

const profileIcon = require('../../../assets/profile.png');
const icon = require('../../../assets/left-arrow1.png');
const camIcon = require('../../../assets/camera.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Account: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.commonView}>
      <View style={styles.secondView}>
        <View style={styles.thirdView}>
          <View style={styles.imgView}>
            <Image
              source={profileIcon}
              style={styles.img}
              resizeMode="contain"
            />
            <View style={styles.camView}>
              <Image
                source={camIcon}
                style={styles.camIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <View style={styles.commonView}>
          <Text style={styles.firstText}>Jon Doe</Text>
          <Text style={styles.secondText}>jondoe@emailid.com</Text>
        </View>
      </View>
      <View style={styles.fourthView}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Orders')}>
          <View style={styles.fifthView}>
            <Text style={styles.commonText}>Your Orders</Text>
            <Image source={icon} style={styles.icons} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('PaymentOptions')}>
          <View style={styles.fifthView}>
            <Text style={styles.commonText}>Payment Options</Text>
            <Image source={icon} style={styles.icons} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ManageAddress')}>
          <View style={styles.fifthView}>
            <Text style={styles.commonText}>Manage Address</Text>
            <Image source={icon} style={styles.icons} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('LogOut')}>
          <View style={styles.sixthView}>
            <Text style={styles.thirdText}>Logout</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default Account;
