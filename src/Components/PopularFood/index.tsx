import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {find, findIndex} from 'lodash';

import styles from './styles';
import AddFood from '../AddFood';
import {popularFood} from '../../Data/data';

const PopularFood: React.FC = () => {
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
  return (
    <View style={styles.firtView}>
      <FlatList
        data={popularFood}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <View style={styles.secondView}>
            <Image source={item.img} style={styles.img} resizeMode="contain" />
            <Text style={styles.firstText}>{item.name}</Text>
            <View style={styles.thirdView}>
              <Text style={styles.secondText}>{item.price}</Text>
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
                  <View style={styles.fourthView}>
                    <Text style={styles.thirdText}>ADD</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PopularFood;
