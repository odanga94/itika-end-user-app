import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const Payments: React.FC = () => {
  return (
    <View style={styles.firstView}>
      <View style={styles.secondView}>
        <Text style={styles.firstText}>Venmo</Text>
        <Text style={styles.secondText}>
          Get 50% off on orders above Rs 350
        </Text>
        <Text style={styles.thirdText}>and 20% above Rs 250</Text>
      </View>
      <View style={styles.thirdView}>
        <Text style={styles.firstText}>Square Cash</Text>
        <Text style={styles.secondText}>
          Get 50% off on orders above Rs 350
        </Text>
        <Text style={styles.thirdText}>and 20% above Rs 250</Text>
      </View>
      <View style={styles.fourthView}>
        <Text style={styles.fourthText}>Saved Card</Text>
      </View>
    </View>
  );
};

export default Payments;
