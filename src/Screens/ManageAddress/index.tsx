import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {filter} from 'lodash';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import styles from './styles';

const homeIcon = require('../../../assets/home.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const ManageAddress: React.FC<Props> = (props) => {
  const {navigation} = props;
  const [saveAddress, updateSaveAddress] = useState([
    {
      id: '1',
      address:
        'GeekyAnts Software, Bannerghatta Main Road, Btm Layout, 2nd Stage, 2nd Main Road, No 18, First Floor, Benguluru, Karnataka 560076 .',
    },
    {
      id: '2',
      address:
        'GeekyAnts Software, Bannerghatta Main Road, Btm Layout, 2nd Stage, 2nd Main Road, No 18, First Floor, Benguluru, Karnataka 560076 .',
    },
  ]);
  const deleteAddress = (ind: number) => {
    const arr = filter(saveAddress, (obj, index) => {
      return index !== ind;
    });
    updateSaveAddress(arr);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.firstView}>
        <Header navigation={navigation} title="Manage Address" />
      </View>
      <View style={styles.secondView}>
        <View style={styles.thirdView}>
          <Image source={homeIcon} style={styles.img} resizeMode="contain" />
        </View>
        <Text style={styles.firstText}>Saved Address</Text>
      </View>
      <View style={styles.fourthView}>
        <FlatList
          data={saveAddress}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <View style={styles.ninthView}>
              <Text numberOfLines={3} style={styles.secondText}>
                {item.address}
              </Text>
              <View style={styles.fifthView}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('ManageAddressEdit')}>
                  <View style={styles.sixthView}>
                    <Text style={styles.thirdText}>Change</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => deleteAddress(index)}>
                  <View style={styles.seventhView}>
                    <Text style={styles.fourthText}>Delete</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        />
        <View style={styles.eightView}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('ManageAddressEdit')}>
            <Text style={styles.fifthText}>Add New Address</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageAddress;
