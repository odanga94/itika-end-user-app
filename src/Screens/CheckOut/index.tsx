import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, StatusBar, Alert, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import Button from '../../Components/Button';
import Spinner from '../../Components/UI/Spinner';
import constant from '../../utils/constant';
import {HomeStackParamList} from '../TabNavigation';
import OrderSummary from '../../Components/OrderSummary';
import * as orderActions from '../../store/actions/orders';

const backIcon = require('../../../assets/back.png');
const tickIcon = require('../../../assets/checked.png');
const visaIcon = require('../../../assets/visa.png');
const masIcon = require('../../../assets/mastercard.png');

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
  route: any;
}

const CheckOut: React.FC<Props> = (props) => {
  const {navigation, route} = props;
  const dispatch = useDispatch();

  const orderDetails = route.params.orderDetails;

  const userId = useSelector((state: any) => state.auth.userId);

  /* const [cards] = useState<any>([
    {
      id: '1',
      name: 'Visa',
      cardNo: '**** **** **** 1000',
    },
    {
      id: '2',
      name: 'Master',
      cardNo: '**** **** **** 3456',
    },
  ]); */

  const [selectCardId, setSelectCardId] = useState<string>();
  const [formattedDate, setFormattedDate] = useState<string>();
  const [submitOrderLoading, setSubmitOrderLoading] = useState(false);

  useEffect(() => {
    const getReadableDate = () => {
      return moment(orderDetails.dateRequested).format('MMMM Do YYYY, h:mm a');
    };

    setFormattedDate(getReadableDate);
  }, [orderDetails]);

  const submitOrder = async () => {
    setSubmitOrderLoading(true);
    try {
      await dispatch(orderActions.addOrder(userId, orderDetails));
      /*    dispatch({
        type: orderActions.SORT_ORDERS,
      }); */
      navigation.navigate('DoneOrder', {});
    } catch (err) {
      //console.log(err);
      Alert.alert('Something went wrong 😞', err.message, [{text: 'Okay'}]);
    }
    setSubmitOrderLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Fragment> */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <OrderSummary
        orderDetails={{...orderDetails, dateRequested: formattedDate}}
      />
      {/* <View style={styles.container}> */}
      {/*           <View style={styles.container}>
            <View style={styles.tenthView}>
              <Text style={styles.fifthText}>PAYMENT METHOD</Text>
              <FlatList
                data={cards}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => setSelectCardId(item.id)}>
                    <View
                      style={
                        selectCardId === item.id
                          ? styles.ninthView
                          : styles.activeNinthView
                      }>
                      <View style={styles.eleventhView}>
                        {item.name === 'Visa' ? (
                          <Image
                            source={visaIcon}
                            style={styles.cardIcon}
                            resizeMode="contain"
                          />
                        ) : (
                          <Image
                            source={masIcon}
                            style={styles.cardIcon}
                            resizeMode="contain"
                          />
                        )}
                        <Text style={styles.sixthText}>{item.cardNo}</Text>
                      </View>
                      {selectCardId === item.id && (
                        <View style={styles.twelvethView}>
                          <View style={styles.seventhView}>
                            <View style={styles.eighthView}>
                              <Image
                                source={tickIcon}
                                style={styles.tickIcon}
                                resizeMode="contain"
                              />
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            </View>
          </View> */}
      <View style={styles.thirthteenthView}>
        <View style={styles.buttonView}>
          {submitOrderLoading ? (
            <Spinner size="large" style={undefined} />
          ) : (
            <Button style={styles.button} onPress={() => submitOrder()}>
              <Text style={styles.buttonText}>Check Out</Text>
            </Button>
          )}
        </View>
      </View>
      {/* </View> */}
      {/* </Fragment> */}
    </SafeAreaView>
  );
};

export default CheckOut;
