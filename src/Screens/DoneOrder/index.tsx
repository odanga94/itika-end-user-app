import React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import styles from './styles';

const orderIcon = require('../../../assets/oderplaced.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const DoneOrder: React.FC<Props> = (props) => {
  const {navigation} = props;
  setTimeout(() => {
    navigation.navigate('Tabs');
  }, 2000);
  return (
    <View style={styles.firstView}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.secondView}>
        <Image source={orderIcon} style={styles.imgIcon} resizeMode="contain" />
      </View>
      <Text style={styles.firstText}>Your order is placed successfully.</Text>
    </View>
  );
};

export default DoneOrder;
