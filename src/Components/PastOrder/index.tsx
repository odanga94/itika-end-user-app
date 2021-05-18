/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, SafeAreaView, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {OrdersStackParamList} from '../../Screens/TabNavigation';

import Button from '../Button';
import Order from '../../models/order';
import constants from '../../utils/constant';

import styles from './styles';

interface Props {
  order: Order;
  navigation: StackNavigationProp<OrdersStackParamList>;
}

const PastOrder: React.FC<Props> = (props) => {
  const {order, navigation} = props;

  return (
    <SafeAreaView style={styles.firstView}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.secondView}>
          {order.orderDetails.packageImage ? (
            <Image
              source={{uri: order.orderDetails.packageImage}}
              style={styles.img}
              resizeMode="contain"
            />
          ) : (
            <MaterialIcons size={100} color="grey" name="image" />
          )}
        </View>
        <View style={styles.thirdView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 8,
            }}>
            <Text style={styles.firstText}>
              {order.orderDetails.packageType}
            </Text>
            <Text
              style={{
                ...styles.firstText,
                fontWeight: 'bold',
                color: constants.primaryTextColor,
              }}>
              KES. {order.orderDetails.estimatedPrice}
            </Text>
          </View>

          <Text style={styles.sixthText}>({order.readableDate})</Text>
          <View style={styles.fourthView}>
            <Text style={styles.thirdText}>
              Pick Up:{' '}
              <Text style={{color: constants.primaryColor}}>
                {order.orderDetails.pickUpLocationAddress}
              </Text>
            </Text>
            <Text style={styles.thirdText}>
              Drop Off:{' '}
              <Text style={{color: constants.primaryTextColor}}>
                {order.orderDetails.dropOffLocationAddress}
              </Text>
            </Text>
          </View>
          <View style={styles.fifthView}>
            <Text style={styles.thirdText}>
              Status:{' '}
              <Text style={styles.fifthText} adjustsFontSizeToFit>
                {order.orderDetails.status === 'pending'
                  ? 'Finding Rider'
                  : order.orderDetails.status === 'pick_up'
                  ? 'Rider on the Way'
                  : order.orderDetails.status === 'drop_off'
                  ? 'Rider on the way to recipient'
                  : order.orderDetails.status === 'arrived_recipient'
                  ? 'Rider has arrived at destination'
                  : order.orderDetails.status === 'delivered'
                  ? 'Package has been delivered'
                  : order.orderDetails.status === 'cancelled'
                  ? 'Cancelled'
                  : ''}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <Button
        onPress={() =>
          navigation.navigate('PastOrderDetails', {
            title: `Order ${order.id}`,
            orderId: order.id,
          })
        }
        style={styles.button}>
        <Text style={styles.buttonText}>View Details</Text>
      </Button>
    </SafeAreaView>
  );
};

export default PastOrder;
