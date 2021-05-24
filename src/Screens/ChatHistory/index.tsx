/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
//import {ListItem} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import Spinner from '../../Components/UI/Spinner';
import Button from '../../Components/Button';
import ErrorMessage from '../../Components/ErrorMessage';
import * as orderActions from '../../store/actions/orders';
import Order from '../../models/order';
import styles from './styles';
import constant from '../../utils/constant';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const ChatHistory: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const orders = useSelector((state: any) => state.orders.orders);
  const userId = useSelector((state: any) => state.auth.userId);

  const [chats, setChats] = useState<any>([]);
  const [fetchOrdersLoading, setFetchOrdersLoading] = useState(false);
  const [fetchChatsLoading, setFetchChatsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadOrders = useCallback(async () => {
    setError('');
    //console.log(orders.length)
    //if (chats.length === 0) {
    setFetchChatsLoading(true);
    setFetchOrdersLoading(true);
    //}
    try {
      await dispatch(orderActions.fetchOrders(userId));
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
    setFetchOrdersLoading(false);
  }, [dispatch, userId]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  //console.log(orders)

  useEffect(() => {
    if (orders.length > 0 && !fetchOrdersLoading) {
      const loadedChats: any = [];
      orders.forEach((order: Order) => {
        if (order.orderDetails.chat) {
          const chatDetails = {
            ...order.orderDetails.chat,
            id: order.id,
            riderId: order.orderDetails.riderId,
            riderImage: order.orderDetails.riderImage,
            riderName: order.orderDetails.riderName,
          };
          loadedChats.push(chatDetails);
        }
      });
      setChats(loadedChats);
    }
    setFetchChatsLoading(false);
  }, [orders, fetchOrdersLoading]);

  if (fetchChatsLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Spinner size={undefined} style={undefined} />
      </View>
    );
  }

  if (error) {
    return <ErrorMessage retry={loadOrders} error={error} />;
  }
  //console.log(fetchChatsLoading);

  if (chats.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
        <Text style={{...styles.firstText, textAlign: 'center'}}>
          You don't have any chats with riders yet.
        </Text>
        <Button
          style={styles.buttonYellow}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Tabs'}],
            });
          }}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </Button>
      </View>
    );
  }
  //console.log(chats);

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
            refreshing={fetchChatsLoading}
            data={chats}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item: any) => item.id}
            /* onEndReached={(info: {distanceFromEnd: number}) =>
          console.log(info, 'check end ')
        } */
            renderItem={({item}) => {
              //console.log('it', item);
              const timeStampArr = Object.keys(item);
              //console.log(timeStampArr);
              const chatTimeStamp = timeStampArr[timeStampArr.length - 5];
              //console.log('ts', chatTimeStamp);

              const chatDetails = item[chatTimeStamp];
              //console.log(chatDetails);
              return (
                <View style={{backgroundColor: '#f5f5f5'}}>
                  <TouchableOpacity
                    style={styles.chatContainer}
                    onPress={() =>
                      navigation.navigate('AddChatRoom', {
                        orderId: item.id,
                      })
                    }>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.firstText}>{item.riderName} </Text>
                      <Text>
                        {new Date(chatDetails.createdAt).toDateString()}{' '}
                        {new Date(chatDetails.createdAt).toLocaleTimeString(
                          'en-US',
                        )}
                      </Text>
                    </View>
                    <Text style={{...styles.firstText, fontWeight: 'normal'}}>
                      {chatDetails.text ? chatDetails.text : 'Photo'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatHistory;
