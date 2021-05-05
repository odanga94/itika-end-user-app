import React, {useState} from 'react';
import {View, SafeAreaView, StatusBar, Text, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Header from '../../Components/Header';
import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import Button from '../../Components/Button';
import PastOrder from '../../Components/PastOrder';
import CurrentOrder from '../../Components/CurrentOrder';
import constant from '../../utils/constant';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Orders: React.FC<Props> = (props) => {
  const {navigation} = props;
  const [foodItems] = useState<any>([
    {
      id: '66',
      name: 'Chicken Lollipop',
      itemNo: 2,
      price: 'KES. 200',
    },
    {
      id: '77',
      name: 'Chicken Kebab',
      itemNo: 1,
      price: 'KES. 300',
    },
  ]);

  const foodLength = foodItems.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.commonView}>
        <View style={styles.secondView}>
          <Header navigation={navigation} title="Your Orders" />
        </View>
        <View style={styles.ninthView}>
          <FlatList
            data={foodItems}
            scrollEnabled={true}
            ListHeaderComponent={<CurrentOrder />}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View style={styles.commonView}>
                <Button
                  style={styles.button}
                  onPress={() => navigation.navigate('TrackOrder')}>
                  <Text style={styles.buttonText}>Track Package</Text>
                </Button>
                <View style={styles.commonView}>
                  <PastOrder />
                </View>
              </View>
            }
            keyExtractor={(item) => item.id}
            /* onEndReached={(info: {distanceFromEnd: number}) =>
              console.log(info, 'check end ')
            } */
            renderItem={({item, index}) => (
              <View
                style={
                  foodLength - 1 === index
                    ? styles.nonActiveView
                    : styles.eighthView
                }>
                <Text
                  style={
                    styles.seventhText
                  }>{`${item.name} x ${item.itemNo}`}</Text>
                <Text style={styles.eightText}>{item.price}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Orders;
