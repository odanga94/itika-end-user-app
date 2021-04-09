import * as React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../../Screens/AppNavigator';
import styles from './styles';

const piz = require('../../../assets/pizza.png');
const burger = require('../../../assets/hamburger.png');
const steak = require('../../../assets/meat.png');
const pasta = require('../../../assets/spaguetti.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const CategoriesCard: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.firstView}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuList')}>
        <View style={styles.commonView}>
          <View style={styles.secondView}>
            <Image source={piz} style={styles.image} resizeMode="contain" />
          </View>
          <Text style={styles.text}>Pizza</Text>
          <Text style={styles.firstText}>2350 places</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuList')}>
        <View style={styles.commonView}>
          <View style={styles.thirdView}>
            <Image source={burger} style={styles.image} resizeMode="contain" />
          </View>
          <Text style={styles.text}>Burger</Text>
          <Text style={styles.firstText}>350 places</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuList')}>
        <View style={styles.commonView}>
          <View style={styles.fourthView}>
            <Image source={steak} style={styles.image} resizeMode="contain" />
          </View>
          <Text style={styles.text}>Steak</Text>
          <Text style={styles.firstText}>834 places</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuList')}>
        <View style={styles.commonView}>
          <View style={styles.fifthView}>
            <Image source={pasta} style={styles.image} resizeMode="contain" />
          </View>
          <Text style={styles.text}>Pasta</Text>
          <Text style={styles.firstText}>150 places</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CategoriesCard;
