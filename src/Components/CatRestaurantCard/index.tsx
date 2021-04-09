import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../../Screens/AppNavigator';
import {catResDetails} from '../../Data/data';

import styles from './styles';

const mapPoint = require('../../../assets/placeholder.png');
const starIcon = require('../../../assets/start.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const CatRestaurantCard: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.firstView}>
      <FlatList
        data={catResDetails}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('MenuList')}>
            <View style={styles.secondView}>
              <View style={styles.thirdView}>
                <Image
                  source={item.img}
                  style={styles.img}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.fourthView}>
                <Text style={styles.firstText}>{item.name}</Text>
                <Text style={styles.firstText}>{item.name1}</Text>
                <View style={styles.fifthView}>
                  <Image
                    source={mapPoint}
                    style={styles.mapPin}
                    resizeMode="contain"
                  />
                  <Text style={styles.secondText}>{item.address}</Text>
                </View>
                <View style={styles.sixthView}>
                  <Image
                    source={starIcon}
                    style={styles.starIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.thirdText}>{item.rating}</Text>
                  <Text style={styles.fourthText}>{item.ratingNo}</Text>
                  <View style={styles.seventhView}>
                    <Text style={styles.fifthText}>Free delivery</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

export default CatRestaurantCard;
