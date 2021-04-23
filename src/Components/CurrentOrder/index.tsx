import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
const foodPic1 = require('../../../assets/food-pic-small.png');
const mapPoint = require('../../../assets/placeholder.png');

const CurrentOrder: React.FC = () => {
  return (
    <View style={styles.firstView}>
      <View style={styles.secondView}>
        <Image source={foodPic1} style={styles.img} resizeMode="contain" />
      </View>
      <View style={styles.thirdView}>
        <Text style={styles.firstText}>Food Package</Text>
        <Text style={styles.secondText}>Java House</Text>
        <View style={styles.fourthView}>
          <Image source={mapPoint} style={styles.mapPin} resizeMode="contain" />
          <Text style={styles.thirdText}>Java House, Mbagathi Way</Text>
        </View>
        <View style={styles.fifthView}>
          <Text style={styles.fifthText}>KES. 1000</Text>
          <Text style={styles.sixthText}>(16 May 2021 11:54PM)</Text>
        </View>
      </View>
    </View>
  );
};

export default CurrentOrder;
