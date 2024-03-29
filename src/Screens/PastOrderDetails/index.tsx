import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {OrdersStackParamList} from '../TabNavigation';
import OrderSummary from '../../Components/OrderSummary';

import Order from '../../models/order';
import styles from './styles';

interface Props {
  navigation: StackNavigationProp<OrdersStackParamList>;
  route: any;
}

const OrderDetailScreen: React.FC<Props> = (props) => {
  const {route} = props;

  const orderId = route.params.orderId;
  const selectedOrder = useSelector((state: any) =>
    state.orders.orders.find((order: Order) => order.id === orderId),
  );

  return (
    <SafeAreaView style={styles.container}>
      <OrderSummary orderDetails={selectedOrder.orderDetails} />
    </SafeAreaView>
  );
};

export const pastOrderDetailsScreenOptions = (navData: any) => {
  const headerTitle = navData.route.params.title;

  return {
    headerTitle: headerTitle,
    hedaderTitleAlign: 'center',
  };
};

export default OrderDetailScreen;
