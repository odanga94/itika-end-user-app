import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {filter} from 'lodash';

import {RootStackParamList} from '../AppNavigator';
import Header from '../../Components/Header';
import Payments from '../../Components/Payments';
import Button from '../../Components/Button';
import styles from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const PaymentOptions: React.FC<Props> = (props) => {
  const [payment, setPayment] = useState([
    {
      id: '1',
      cardNo: '4343 xxxx xxxx 4343',
    },
    {
      id: '2',
      cardNo: '5353 xxxx xxxx 5353',
    },
  ]);
  const {navigation} = props;
  const deleteCard = (indx: number) => {
    const newArr = filter(payment, (obj, index) => {
      return index !== indx;
    });
    setPayment(newArr);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstView}>
        <Header navigation={navigation} title="Payment" />
      </View>
      <View style={styles.commonView}>
        <FlatList
          data={payment}
          extraData={payment}
          ListHeaderComponent={<Payments />}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <View style={styles.secondView}>
              <Text style={styles.firstText}>{item.cardNo}</Text>
              <TouchableWithoutFeedback onPress={() => deleteCard(index)}>
                <View style={styles.thirdView}>
                  <Text style={styles.secondText}>Delete</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        />
        <View style={styles.fourthView}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('AddCard')}>
            <Text style={styles.thirdText}>Add New Card</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentOptions;
