import React from 'react';
import {View, Text, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import constants from '../../utils/constant';

import styles from './styles';
const mapPoint = require('../../../assets/placeholder.png');

interface Props {
  currentOrder: any;
}

const CurrentOrder: React.FC<Props> = (props) => {
  const {currentOrder} = props;

  return (
    <View style={styles.firstView}>
      <View style={styles.secondView}>
        {currentOrder.orderDetails.packageImage ? (
          <Image
            source={{uri: currentOrder.orderDetails.packageImage}}
            style={styles.img}
            resizeMode="contain"
          />
        ) : (
          <MaterialIcons size={100} color="grey" name="image" />
        )}
      </View>
      <View style={styles.thirdView}>
        <Text style={styles.firstText}>
          {currentOrder.orderDetails.packageType} Package
        </Text>
        <Text style={styles.sixthText}>({currentOrder.readableDate})</Text>
        <View style={styles.fourthView}>
          <Text style={styles.thirdText}>
            Pick Up:{' '}
            <Text style={{color: constants.primaryColor}}>
              {currentOrder.orderDetails.pickUpLocationAddress}
            </Text>
          </Text>
          <Text style={styles.thirdText}>
            Drop Off:{' '}
            <Text style={{color: constants.primaryTextColor}}>
              {currentOrder.orderDetails.dropOffLocationAddress}
            </Text>
          </Text>
        </View>
        <View style={styles.fifthView}>
          <Text style={styles.thirdText}>
            Status:{' '}
            <Text style={styles.fifthText}>
              {currentOrder.orderDetails.status === 'pending'
                ? 'Finding Rider.'
                : 'Rider is on the Way.'}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CurrentOrder;
