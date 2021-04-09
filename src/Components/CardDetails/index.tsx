import * as React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../../Screens/AppNavigator';
import styles from './styles';
interface Props {
  details: details;
  navigation: StackNavigationProp<RootStackParamList>;
}

interface details {
  img: any;
  name: string;
  address: string;
  rating: number;
  ratingNo: string;
}
const starIcon = require('../../../assets/start.png');

const CardDetails: React.FC<Props> = (props) => {
  const {details, navigation} = props;
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuList')}>
      <View style={styles.firstView}>
        <Image source={details.img} style={styles.image} />
        <Text style={styles.firstText}>{details.name}</Text>
        <Text style={styles.secondText}>{details.address}</Text>
        <View style={styles.secondView}>
          <Image
            source={starIcon}
            style={styles.starIcon}
            resizeMode="contain"
          />
          <Text style={styles.thirdText}>{details.rating}</Text>
          <Text style={styles.fourthText}>{details.ratingNo}</Text>
          <View style={styles.thirdView}>
            <Text style={styles.fifthText}>Free delivery</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CardDetails;
