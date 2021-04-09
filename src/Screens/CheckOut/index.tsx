import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './styles';
import Button from '../../Components/Button';
import {RootStackParamList} from '../AppNavigator';

const backIcon = require('../../../assets/back.png');
const tickIcon = require('../../../assets/checked.png');
const visaIcon = require('../../../assets/visa.png');
const masIcon = require('../../../assets/mastercard.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const CheckOut: React.FC<Props> = (props) => {
  const [cards] = useState<any>([
    {
      id: '1',
      name: 'Visa',
      cardNo: '**** **** **** 1000',
    },
    {
      id: '2',
      name: 'Master',
      cardNo: '**** **** **** 3456',
    },
  ]);
  const [selectCardId, setSelectCardId] = useState<string>();
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.firstView}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={styles.secondView}>
              <Image
                source={backIcon}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.thirdView}>
            <Text style={styles.firstText}>Checkout</Text>
          </View>
        </View>
        <View style={styles.fourthView}>
          <Text style={styles.secondText}>DELIVERY ADDRESS</Text>
          <View style={styles.fifthView}>
            <View style={styles.sixthView}>
              <Text style={styles.thirdText}>HOME ADDRESS</Text>
              <View>
                <Text style={styles.fourthText}>
                  GeekyAnts Software Pvt ltd...
                </Text>
              </View>
            </View>
            <View style={styles.seventhView}>
              <View style={styles.eighthView}>
                <Image
                  source={tickIcon}
                  style={styles.tickIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.tenthView}>
            <Text style={styles.fifthText}>PAYMENT METHOD</Text>
            <FlatList
              data={cards}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <TouchableWithoutFeedback
                  onPress={() => setSelectCardId(item.id)}>
                  <View
                    style={
                      selectCardId === item.id
                        ? styles.ninthView
                        : styles.activeNinthView
                    }>
                    <View style={styles.eleventhView}>
                      {item.name === 'Visa' ? (
                        <Image
                          source={visaIcon}
                          style={styles.cardIcon}
                          resizeMode="contain"
                        />
                      ) : (
                        <Image
                          source={masIcon}
                          style={styles.cardIcon}
                          resizeMode="contain"
                        />
                      )}
                      <Text style={styles.sixthText}>{item.cardNo}</Text>
                    </View>
                    {selectCardId === item.id && (
                      <View style={styles.twelvethView}>
                        <View style={styles.seventhView}>
                          <View style={styles.eighthView}>
                            <Image
                              source={tickIcon}
                              style={styles.tickIcon}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </View>
        <View style={styles.thirthteenthView}>
          <View style={styles.buttonView}>
            <Button
              style={styles.button}
              onPress={() => navigation.navigate('DoneOrder')}>
              <Text style={styles.buttonText}>Pay</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckOut;
