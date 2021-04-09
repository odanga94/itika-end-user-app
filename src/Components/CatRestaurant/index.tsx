import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../../Screens/AppNavigator';
import styles from './styles';

const backIcon = require('../../../assets/back-white.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const CatRestaurant: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.firstView}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Tabs')}>
        <View style={styles.secondView}>
          <Image source={backIcon} style={styles.icon} resizeMode="contain" />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.thirdView}>
        <Text style={styles.firstText}>Turkish</Text>
        <Text style={styles.secondText}>Restaurants</Text>
      </View>
    </View>
  );
};

export default CatRestaurant;
