import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

import styles from './styles';

interface Props {
  food: any;
  increaseCount: (food: any, itemNumber: number) => void;
  decreaseCount: (food: any, itemNumber: number) => void;
}

const AddFood: React.FC<Props> = (props) => {
  const [itemNumber, setItemNumber] = useState<number>(1);
  const {increaseCount, food, decreaseCount} = props;
  return (
    <View style={styles.firstView}>
      <TouchableWithoutFeedback
        onPress={() => {
          setItemNumber((prev: number) => prev - 1);
          decreaseCount(food, itemNumber);
        }}>
        <Text style={styles.thirdText}>-</Text>
      </TouchableWithoutFeedback>
      <Text style={styles.secondText}>{itemNumber}</Text>
      <TouchableWithoutFeedback
        onPress={() => {
          setItemNumber((prev: number) => prev + 1);
          increaseCount(food, itemNumber);
        }}>
        <Text style={styles.firstText}>+</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default AddFood;
