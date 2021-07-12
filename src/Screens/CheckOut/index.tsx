/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import Button from '../../Components/Button';
import ListButton from '../../Components/UI/ListButton';
import Spinner from '../../Components/UI/Spinner';
import ImagePicker from '../../Components/ImagePicker';
import constant from '../../utils/constant';
import {HomeStackParamList} from '../TabNavigation';
import * as orderActions from '../../store/actions/orders';
import * as appSettingsActions from '../../store/actions/app-settings';
import * as profileActions from '../../store/actions/user/profile';
import {getEstimatedDistanceAndTime} from '../../utils';

const tickIcon = require('../../../assets/checked.png');

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
  route: any;
}

const CheckOut: React.FC<Props> = (props) => {
  const {navigation, route} = props;
  const dispatch = useDispatch();

  const orderDetails = route.params.orderDetails;
  const selectedPackageType = route.params.selectedItems;

  const userId = useSelector((state: any) => state.auth.userId);
  const baseFee = useSelector((state: any) => state.appSettings.baseFee);
  const pricePerKm = useSelector((state: any) => state.appSettings.pricePerKm);
  const phoneNumber = useSelector((state: any) => state.profile.phone);

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
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [priceLoading, setPriceLoading] = useState(false);
  const [fetchAppSettings, setFetchAppSettings] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [packageType, setPackageType] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [packagePhotoUri, setPackagePhotoUri] = useState('');
  const [clientPhone, setClientPhone] = useState(phoneNumber);

  useEffect(() => {
    const fetchSettings = async () => {
      setFetchAppSettings(true);
      try {
        await dispatch(appSettingsActions.fetchAppSettings());
      } catch (err) {
        Alert.alert('Something went wrong.', err.message, [{text: 'Okay'}]);
      }
      setFetchAppSettings(false);
    };

    fetchSettings();
  }, [dispatch]);

  useEffect(() => {
    const getReadableDate = () => {
      return moment(orderDetails.dateRequested).format('MMMM Do YYYY, h:mm a');
    };

    setFormattedDate(getReadableDate);
  }, [orderDetails]);

  useEffect(() => {
    if (!phoneNumber && userId) {
      dispatch(profileActions.fetchProfile(userId));
    }
  }, [phoneNumber, userId, dispatch]);

  useEffect(() => {
    if (phoneNumber) {
      setClientPhone(phoneNumber);
    }
  }, [phoneNumber]);

  useEffect(() => {
    const roundUp = (num: number, precision: number) => {
      return Math.ceil(num / precision) * precision;
    };

    const calculatePriceEstimate = async () => {
      setPriceLoading(true);
      const distandTime = await getEstimatedDistanceAndTime(
        orderDetails.pickUpLocation,
        orderDetails.dropOffLocation,
      );
      //console.log(distandTime?.estimatedDistance.value);
      let fare =
        baseFee + (pricePerKm * distandTime?.estimatedDistance.value) / 1000;
      if (orderDetails.isReturnTrip) {
        fare = fare * 2;
      }
      setEstimatedPrice(roundUp(fare, 50));
      setPriceLoading(false);
      //return roundUp(fare, 50);
    };

    if (orderDetails && baseFee && pricePerKm) {
      //console.log('loc', pickedLocation, pickedDropOffLocation)
      calculatePriceEstimate();
    }
  }, [orderDetails, baseFee, pricePerKm]);

  useEffect(() => {
    if (selectedPackageType && Object.keys(selectedPackageType).length > 0) {
      Object.keys(selectedPackageType).forEach((key) => {
        setPackageType(selectedPackageType[key].name);
      });
    }
  }, [selectedPackageType]);

  const submitOrder = async () => {
    if (!recipientName.trim()) {
      Alert.alert('Wrong Input!', 'Please enter a valid Recipient Name.', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (!recipientPhone.trim()) {
      Alert.alert('Wrong Input!', 'Please enter a valid Recipient Phone.', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (!packageType) {
      Alert.alert('Wrong Input!', 'Please enter the package type.', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (!clientPhone.trim()) {
      Alert.alert(
        'Wrong Input!',
        'Please enter a valid phone number to contact you on.',
        [{text: 'Okay'}],
      );
      return;
    }
    if (!estimatedPrice) {
      Alert.alert(
        'Price not calculated!',
        'Please wait for the price estimate to be calculated.',
        [{text: 'Okay'}],
      );
      return;
    }

    setSubmitOrderLoading(true);
    const finalOrderDetails = {
      ...orderDetails,
      recipientName: recipientName,
      recipientPhone: recipientPhone,
      packageType: packageType,
      packageDescription: packageDescription,
      packagePhotoUri: packagePhotoUri,
      clientPhone: clientPhone,
      estimatedPrice: estimatedPrice,
    };
    try {
      await dispatch(orderActions.addOrder(userId, finalOrderDetails));
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
      <KeyboardAvoidingView
        /* behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={50}
        style={{flex: 1}}> */
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={constant.styleGuide.height / 4.5}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.screen}>
          <View style={{...styles.infoContainer, marginTop: 10}}>
            <View style={styles.datePriceContainer}>
              <Text style={styles.datePrice}>
                requested on, {formattedDate}
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: 20, marginTop: 7.5, marginBottom: 5}}>
            <Text style={styles.secondText}>Price Estimate:</Text>
            {priceLoading ? (
              <Spinner size={undefined} style={undefined} />
            ) : (
              <Text
                style={{
                  ...styles.input,
                  fontSize: 18,
                  color: constant.primaryTextColor,
                }}>
                KES. {estimatedPrice}
              </Text>
            )}
          </View>
          <View style={styles.fourthView}>
            <View style={styles.fifthView}>
              <View style={styles.sixthView}>
                <Text style={styles.thirdText}>PICK UP ADDRESS:</Text>
                <View>
                  <Text style={styles.fourthText}>
                    {orderDetails.pickUpLocationAddress}
                  </Text>
                </View>
              </View>
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
          </View>
          <View style={styles.fourthView}>
            <View
              style={{...styles.fifthView, borderColor: constant.primaryColor}}>
              <View style={styles.sixthView}>
                <Text
                  style={{...styles.thirdText, color: constant.primaryColor}}>
                  DROP OFF ADDRESS
                </Text>
                <View>
                  <Text style={styles.fourthText}>
                    {orderDetails.dropOffLocationAddress}
                  </Text>
                </View>
              </View>
              <View style={styles.seventhView}>
                <View
                  style={{
                    ...styles.eighthView,
                    backgroundColor: constant.primaryColor,
                  }}>
                  <Image
                    source={tickIcon}
                    style={{...styles.tickIcon}}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={styles.secondText}>Recipient Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setRecipientName}
              value={recipientName}
            />
          </View>
          <View style={{marginHorizontal: 20, marginTop: 5}}>
            <Text style={styles.secondText}>Recipient Phone:</Text>
            <TextInput
              style={{...styles.input, color: constant.primaryTextColor}}
              placeholder=""
              onChangeText={(text) => {
                setRecipientPhone(text);
              }}
              value={recipientPhone}
              keyboardType="number-pad"
            />
          </View>
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={styles.secondText}>Select Package Type:</Text>
            <ListButton
              info={packageType}
              pressedHandler={() => {
                navigation.navigate('ListItems', {
                  items: [
                    'Clothes',
                    'Pet Food and Accessories',
                    'Food',
                    'Documents',
                    'Beauty Products',
                    'Household Goods',
                    'Pastries',
                    'Others',
                  ],
                  alreadySelected: selectedPackageType,
                  manySelectable: false,
                  title: 'Select Package Type',
                });
              }}
            />
          </View>
          <View style={{marginHorizontal: 20, marginTop: 5}}>
            <Text style={styles.secondText}>
              Kindly describe the package (optional):
            </Text>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              onChangeText={setPackageDescription}
              value={packageDescription}
            />
          </View>
          <View style={{marginHorizontal: 20, marginTop: 5}}>
            <Text style={styles.secondText}>
              Would you like to add a photo of the package (optional) ?
            </Text>
            <ImagePicker
              setImage={setPackagePhotoUri}
              imageUri={packagePhotoUri}
            />
          </View>
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={styles.secondText}>
              Phone number to contact you on :
            </Text>
            <TextInput
              style={{...styles.input, color: constant.primaryTextColor}}
              placeholder=""
              onChangeText={(text) => {
                setClientPhone(text);
              }}
              value={clientPhone}
              keyboardType="number-pad"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* <OrderSummary
        orderDetails={{...orderDetails, dateRequested: formattedDate}}
      /> */}
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
