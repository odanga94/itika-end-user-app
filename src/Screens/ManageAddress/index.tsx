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
import constant from '../../utils/constant';

const homeIcon = require('../../../assets/home.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const ManageAddress: React.FC<Props> = (props) => {
  const {navigation} = props;
  const [saveAddress, updateSaveAddress] = useState([
    {
      id: '1',
      address: 'TRV Office Plaza, Muthithi Road, Nairobi.',
    },
    {
      id: '2',
      address: 'T-Mall, Langata Road, TMALL.',
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
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
