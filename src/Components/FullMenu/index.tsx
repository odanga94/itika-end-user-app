import React, {useState} from 'react';
import {View, Text, FlatList, TouchableWithoutFeedback} from 'react-native';
import {find, findIndex} from 'lodash';
import {StackNavigationProp} from '@react-navigation/stack';

import {foodItems} from '../../Data/data';
import {RootStackParamList} from '../../Screens/AppNavigator';
import AddFood from '../AddFood';
import styles from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const FullMenu: React.FC<Props> = (props) => {
  const [addFood, setAddFood] = useState<any>([]);
  const isVisible = (obj: any) => {
    if (addFood.length > 0) {
      if (!find(addFood, {id: obj.id})) {
        obj.count = 1;
        const checkArr = [...addFood, obj];
        setAddFood(checkArr);
      }
    } else {
      obj.count = 1;
      const arr = [...addFood, obj];
      setAddFood(arr);
    }
  };
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
  const {navigation} = props;
  return (
    <View style={styles.firstView}>
      <View style={styles.secondView}>
        <Text style={styles.firstText}>Full menu</Text>
      </View>
      <View style={styles.thirdView}>
        <FlatList
          data={foodItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.fourthView}>
              <View style={styles.fifthView} key={item.id}>
                <Text style={styles.secondText}>{item.name}</Text>
                {find(addFood, {id: item.id}) ? (
                  <AddFood
                    food={item}
                    increaseCount={(val: any, itemNum: number) =>
                      incCount(val, itemNum)
                    }
                    decreaseCount={(val: any, itemNum: number) =>
                      decCount(val, itemNum)
                    }
                  />
                ) : (
                  <TouchableWithoutFeedback onPress={() => isVisible(item)}>
                    <View style={styles.sixthView}>
                      <Text style={styles.thirdText}>+</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </View>
              <Text style={styles.fourthText}>{item.price}</Text>
            </View>
          )}
        />
      </View>
      {addFood.length > 0 && (
        <View style={styles.seventhView}>
          <View style={styles.eightView}>
            <View style={styles.ninthView}>
              <Text style={styles.fifthText}>
                {addFood.length} Items | $76.00
              </Text>
              <Text style={styles.sixthText}>Extra charges may apply</Text>
            </View>
            <View style={styles.tenthView}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('Cart', {
                    addedFood: addFood,
                  })
                }>
                <View style={styles.eleventhView}>
                  <Text style={styles.seventhText}>View Cart</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default FullMenu;
