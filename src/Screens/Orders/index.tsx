/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback, Fragment} from 'react';
import {View, SafeAreaView, StatusBar, Text, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import Header from '../../Components/Header';
import {OrdersStackParamList} from '../TabNavigation';
import styles from './styles';
import Button from '../../Components/Button';
import PastOrder from '../../Components/PastOrder';
import CurrentOrder from '../../Components/CurrentOrder';
import Spinner from '../../Components/UI/Spinner';
import ErrorMessage from '../../Components/ErrorMessage';
import constant from '../../utils/constant';
import * as orderActions from '../../store/actions/orders';

interface Props {
  navigation: StackNavigationProp<OrdersStackParamList>;
  route: any;
}

const Orders: React.FC<Props> = (props) => {
  const {navigation, route} = props;
  const dispatch = useDispatch();

  const currentJobsOrderIds = useSelector(
    (state: any) => state.currentJob.currentJobs,
  );
  //console.log(currentJobOrderId);
  const userId = useSelector((state: any) => state.auth.userId);
  const orders = useSelector((state: any) => state.orders.orders);
  //console.log(orders);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentOrders, setCurrentOrders] = useState<any>([]);
  const [completeOrder, setCompleteOrder] = useState(false);
  const [justDeleted, setJustDeleted] = useState(false);

  const loadOrders = useCallback(async () => {
    setError('');
    //console.log(orders.length)
    if (orders.length === 0) {
      setIsLoading(true);
    }
    try {
      await dispatch(orderActions.fetchOrders(userId));
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
    setIsLoading(false);
  }, [dispatch, orders, userId]);

  //console.log('ld', isLoading);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    if (orders.length > 0) {
      setIsLoading(false);
    }
  }, [orders]);

  useEffect(() => {
    if (
      orders.length > 0 &&
      currentJobsOrderIds.length > 0 &&
      !isLoading &&
      currentOrders.length === 0
    ) {
      const currOrdersArr = [];
      for (let i = 0; i < currentJobsOrderIds.length; i++) {
        const order = orders.find(
          (ord: any) => ord.id === currentJobsOrderIds[i].id,
        );
        if (order) {
          currOrdersArr.push(order);
        }
      }
      console.log('loop running');
      setCurrentOrders(currOrdersArr);
    }
  }, [currentOrders, orders, currentJobsOrderIds, isLoading]);

  useEffect(() => {
    const WillFocusSub = navigation.addListener('focus', () => {
      if (orders.length > 0 && currentJobsOrderIds.length > 0 && !isLoading) {
        const currOrdersArr = [];
        for (let i = 0; i < currentJobsOrderIds.length; i++) {
          const order = orders.find(
            (ord: any) => ord.id === currentJobsOrderIds[i].id,
          );
          if (order) {
            currOrdersArr.push(order);
          }
        }
        console.log('focus loop running');
        setCurrentOrders(currOrdersArr);
      }
    });

    return WillFocusSub;
  }, [navigation, currentJobsOrderIds, orders, isLoading]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Spinner size={undefined} style={undefined} />
      </View>
    );
  }

  if (error) {
    return <ErrorMessage retry={loadOrders} error={error} />;
  }

  if (orders.length === 0 && !currentOrders) {
    return (
      <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
        <Text style={styles.firstText}>
          You haven't placed any orders yet. Get 25% discount on your first
          order today.
        </Text>
        <Button
          style={styles.buttonYellow}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Tabs'}],
            });
          }}>
          <Text style={styles.buttonText}>Send Package</Text>
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.commonView}>
        {/* <View style={styles.ninthView}> */}
        {currentOrders.length > 0 ? (
          <View style={{flex: 1}}>
            <FlatList
              //onRefresh={loadOrders}
              refreshing={isLoading}
              data={currentOrders}
              scrollEnabled={true}
              ListHeaderComponent={
                <View
                  style={{
                    ...styles.pastView,
                    backgroundColor: constant.primaryTextColor,
                  }}>
                  <Text
                    style={{
                      ...styles.firstText,
                      textAlign: 'center',
                      color: '#fff',
                    }}>
                    Processing Orders
                  </Text>
                </View>
              }
              showsVerticalScrollIndicator={true}
              keyExtractor={(item) => item.id}
              /* onEndReached={(info: {distanceFromEnd: number}) =>
              console.log(info, 'check end ')
            } */
              renderItem={({item}) => {
                //console.log('it', item);
                return (
                  <Fragment key={item.id}>
                    <CurrentOrder
                      currentOrder={item}
                      userId={userId}
                      route={route}
                      navigation={navigation}
                      completeOrder={completeOrder}
                      setCompleteOrder={setCompleteOrder}
                      justDeleted={justDeleted}
                      setJustDeleted={setJustDeleted}
                    />
                    <Button
                      style={styles.button}
                      onPress={() => {
                        navigation.navigate('TrackOrder', {orderId: item.id});
                      }}>
                      <Text style={styles.buttonText}>Track Package</Text>
                    </Button>
                    <View style={styles.orderContainer} />
                  </Fragment>
                );
              }}
            />
          </View>
        ) : null}
        <View style={{flex: 1.5}}>
          <FlatList
            onRefresh={loadOrders}
            refreshing={isLoading}
            data={orders
              .filter(
                (order: any) =>
                  order.orderDetails.status === 'delivered' ||
                  order.orderDetails.status === 'cancelled',
              )
              .sort((a: any, b: any) =>
                new Date(a.orderDetails.dateRequested).getTime() >
                new Date(b.orderDetails.dateRequested).getTime()
                  ? -1
                  : 1,
              )}
            scrollEnabled={true}
            ListHeaderComponent={
              <View style={{marginTop: 5}}>
                <View style={styles.pastView}>
                  <Text style={{...styles.firstText, textAlign: 'center'}}>
                    Past Orders
                  </Text>
                </View>
              </View>
            }
            showsVerticalScrollIndicator={true}
            keyExtractor={(item) => item.id}
            /* onEndReached={(info: {distanceFromEnd: number}) =>
              console.log(info, 'check end ')
            } */
            renderItem={({item}) => {
              //console.log('it', item);
              return (
                <Fragment key={item.id}>
                  <View style={styles.commonView}>
                    <PastOrder order={item} navigation={navigation} />
                  </View>
                </Fragment>
              );
            }}
          />
        </View>
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};
export default Orders;
