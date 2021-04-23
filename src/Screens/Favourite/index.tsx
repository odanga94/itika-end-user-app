/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';
import {View, Text, SafeAreaView, StatusBar, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
//import CatRestaurantCard from '../../Components/CatRestaurantCard';
import Button from '../../Components/Button';
import styles from './styles';
import constant from '../../utils/constant';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Favourite: React.FC<Props> = (props) => {
  //const {navigation} = props;

  const handlePressed = () => {
    Alert.alert('Pressed', 'Work in progress!', [{text: 'Okay'}]);
  };

  return (
    <SafeAreaView style={styles.firstView}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.firstView}>
        <Text style={styles.firstText}>Your Support Tickets</Text>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={{...styles.firstText, left: undefined}}>
            You haven't raised any issues yet.
          </Text>
          <Button
            style={styles.button}
            onPress={() => {
              handlePressed();
            }}>
            <Text style={styles.thirdText}>Chat with Support</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Favourite;
