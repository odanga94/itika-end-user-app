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
        <Text style={styles.firstText}>Kricket Brixton</Text>
        <Text style={styles.secondText}>Berkarar Mall</Text>
        <View style={styles.fourthView}>
          <Image source={mapPoint} style={styles.mapPin} resizeMode="contain" />
          <Text style={styles.thirdText}>299 Levent\Besiktas</Text>
        </View>
        <View style={styles.fifthView}>
          <Text style={styles.fifthText}>$224</Text>
          <Text style={styles.sixthText}>(16 Oct 2019 11:54PM)</Text>
        </View>
      </View>
    </View>
  );
};

export default CurrentOrder;
