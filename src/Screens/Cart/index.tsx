/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {findIndex} from 'lodash';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import AddFood from '../../Components/AddFood';
import BillDetails from '../../Components/BillDetails';

import styles from './styles';
import constant from '../../utils/constant';

interface Props {
  addedFood: any;
  route: any;
  navigation: StackNavigationProp<RootStackParamList>;
}
const backIcon = require('../../../assets/back.png');
const emptyCart = require('../../../assets/empty-cart.png');

const Cart: React.FC<Props> = (props) => {
  const {route, navigation} = props;
  const [addFood, setAddFood] = useState<any>([]);
  useEffect(() => {
    if (route.params !== undefined) {
      const {addedFood} = route.params;
      setAddFood(addedFood);
    }
  }, []);
  const incCount = (val: any, itemNum: number) => {
    const newList = addFood.map((item: any) => {
      if (item.id === val.id) {
        return {...item, count: itemNum + 1};
      }
      return {...item};
    });
    setAddFood(newList);
  };
  const decCount = (val: any, itemNum: number) => {
    const newList = addFood.map((item: any) => {
      if (item.id === val.id) {
        return {...item, count: itemNum - 1};
      }
      return {...item};
    });
    const getIndex = findIndex(newList, {
      id: val.id,
    });
    if (newList[getIndex].count === 0) {
      newList.splice(getIndex, 1);
      setAddFood(newList);
    } else {
      setAddFood(newList);
    }
  };
  return (
    <SafeAreaView style={styles.commonView}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      {route.params !== undefined || addFood.length !== 0 ? (
        <View style={styles.commonView}>
          <View style={styles.headerView}>
            <View style={styles.secondView}>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View style={styles.backView}>
                  <Image
                    source={backIcon}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.thirdView}>
                <Text style={styles.firstText}>Cart</Text>
              </View>
            </View>
          </View>
          <View style={styles.commonView}>
            <FlatList
              data={addFood}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              ListFooterComponent={<BillDetails navigation={navigation} />}
              renderItem={({item}) => (
                <View style={styles.fourthView}>
                  <View style={styles.fifthView}>
                    <Text style={styles.secondText}>{item.name}</Text>
                    <AddFood
                      food={item}
                      increaseCount={(val: any, itemNum: number) =>
                        incCount(val, itemNum)
                      }
                      decreaseCount={(val: any, itemNum: number) =>
                        decCount(val, itemNum)
                      }
                    />
                  </View>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
              )}
            />
          </View>
        </View>
      ) : (
        <View style={styles.emptyView}>
          <Image
            source={emptyCart}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyTextFirst}>Your Cart is empty.</Text>
          <Text style={styles.emptyTextSecond}>
            Send a package or request an errand from the home screen.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
