import React from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import CatRestaurantCard from '../../Components/CatRestaurantCard';
import styles from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Favourite: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.firstView}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.firstView}>
        <Text style={styles.firstText}>Your Favourite</Text>
        <View style={styles.secondView}>
          <CatRestaurantCard navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Favourite;
