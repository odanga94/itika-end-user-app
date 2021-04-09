import React from 'react';
import {View, StatusBar, ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper';
import {StackNavigationProp} from '@react-navigation/stack';

import constant from '../../utils/constant';
import CatRestaurant from '../../Components/CatRestaurant';
import CatRestaurantCard from '../../Components/CatRestaurantCard';
import {RootStackParamList} from '../AppNavigator';

import styles from './styles';

const resType = require('../../../assets/background-login.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const RestaurantList: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.firstView}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={constant.blackColor}
      />
      <View style={styles.secondView}>
        <View style={styles.firstView}>
          <Swiper
            dotColor={constant.commonColor}
            activeDotColor={constant.primaryColor}>
            <ImageBackground
              source={resType}
              style={styles.image}
              resizeMode="cover">
              <CatRestaurant navigation={navigation} />
            </ImageBackground>
            <ImageBackground
              source={resType}
              style={styles.image}
              resizeMode="cover">
              <CatRestaurant navigation={navigation} />
            </ImageBackground>
            <ImageBackground
              source={resType}
              style={styles.image}
              resizeMode="cover">
              <CatRestaurant navigation={navigation} />
            </ImageBackground>
          </Swiper>
        </View>
      </View>
      <View style={styles.thirdView}>
        <CatRestaurantCard navigation={navigation} />
      </View>
    </View>
  );
};

export default RestaurantList;
