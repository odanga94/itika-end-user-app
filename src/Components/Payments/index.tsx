import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const Payments: React.FC = () => {
  return (
    <View style={styles.firstView}>
      <View style={styles.secondView}>
        <Text style={styles.firstText}>M-Pesa</Text>
        <Text style={styles.secondText}>
          Get 33% off on orders above KES. 5000
        </Text>
        <Text style={styles.thirdText}>and 20% above kes. 3000</Text>
      </View>
      <View style={styles.thirdView}>
        <Text style={styles.firstText}>Cash</Text>
      </View>
      <View style={styles.fourthView}>
        <Text style={styles.fourthText}>Saved Cards</Text>
      </View>
    </View>
  );
};

export default Payments;
