import React, {useEffect} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {HomeStackParamList} from '../TabNavigation';
import styles from './styles';
import constant from '../../utils/constant';

const orderIcon = require('../../../assets/orderplaced.png');

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
}

const DoneOrder: React.FC<Props> = (props) => {
  const {navigation} = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.firstView}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.secondView}>
        <Image source={orderIcon} style={styles.imgIcon} resizeMode="contain" />
      </View>
      <Text style={styles.firstText}>Your Order was placed successfully!</Text>
    </View>
  );
};

export default DoneOrder;
