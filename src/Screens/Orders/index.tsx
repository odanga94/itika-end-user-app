/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback, Fragment} from 'react';
import {View, SafeAreaView, StatusBar, Text, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import Header from '../../Components/Header';
import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import Button from '../../Components/Button';
import PastOrder from '../../Components/PastOrder';
import CurrentOrder from '../../Components/CurrentOrder';
import Spinner from '../../Components/UI/Spinner';
import ErrorMessage from '../../Components/ErrorMessage';
import constant from '../../utils/constant';
import * as orderActions from '../../store/actions/orders';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Orders: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const currentJobOrderId = useSelector(
    (state: any) => state.currentJob.currentJobOrderId,
  );
  //console.log(currentJobOrderId);
  const currentOrder = useSelector((state: any) =>
    state.orders.orders.find((order: any) => order.id === currentJobOrderId),
  );
  const userId = useSelector((state: any) => state.auth.userId);
  const orders = useSelector((state: any) => state.orders.orders);
  //console.log(orders);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [foodItems] = useState<any>([
    {
      id: '66',
      name: 'Chicken Lollipop',
      itemNo: 2,
      price: 'KES. 200',
    },
    {
      id: '77',
      name: 'Chicken Kebab',
      itemNo: 1,
      price: 'KES. 300',
    },
  ]);

  const foodLength = foodItems.length;

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

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    if (orders.length > 0) {
      setIsLoading(false);
    }
  }, [orders]);

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

  if (orders.length === 0 && !currentOrder) {
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
        <View style={styles.ninthView}>
          <FlatList
            onRefresh={loadOrders}
            refreshing={isLoading}
            data={orders.filter(
              (order: any) => order.orderDetails.status === 'delivered',
            )}
            scrollEnabled={true}
            ListHeaderComponent={
              <View style={{marginTop: 10}}>
                {currentOrder ? (
                  <Fragment>
                    <CurrentOrder currentOrder={currentOrder} />
                    <View style={styles.commonView}>
                      <Button
                        style={styles.button}
                        onPress={() => navigation.navigate('TrackOrder')}>
                        <Text style={styles.buttonText}>Track Package</Text>
                      </Button>
                    </View>
                  </Fragment>
                ) : null}
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
      </View>
    </SafeAreaView>
  );
};
export default Orders;
