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

  //console.log('currOrd', currentOrder);

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
            <Text style={styles.fifthText} adjustsFontSizeToFit>
              {currentOrder.orderDetails.status === 'pending'
                ? 'Finding Rider'
                : currentOrder.orderDetails.status === 'pick_up'
                ? 'Rider on the Way'
                : currentOrder.orderDetails.status === 'drop_off'
                ? 'Rider on the way to recipient'
                : currentOrder.orderDetails.status === 'arrived_recipient'
                ? 'Rider has arrived at destination'
                : currentOrder.orderDetails.status === 'delivered'
                ? 'Package has been delivered'
                : ''}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CurrentOrder;
