/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {HomeStackParamList} from '../TabNavigation';
import Button from '../../Components/Button';
import ImagePicker from '../../Components/ImagePicker';
import Spinner from '../../Components/UI/Spinner';
import ListButton from '../../Components/UI/ListButton';

import {getEstimatedDistanceAndTime} from '../../utils';

import * as profileActions from '../../store/actions/user/profile';
import constants from '../../utils/constant';
import styles from './styles';

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
  route: any;
}

const OrderDetails: React.FC<Props> = (props) => {
  const {navigation, route} = props;

  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.auth.userId);
  const phoneNumber = useSelector((state: any) => state.profile.phone);

  const pickedLocationAddress = route.params.pickedLocationAddress;
  const pickedLocation = route.params.pickedLocation;
  const pickedDropOffAddress = route.params.pickedDropOffAddress;
  const pickedDropOffLocation = route.params.pickedDropOffLocation;
  const selectedPackageType = route.params.selectedItems;

  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  const [estimatedPrice, setEstimatedPrice] = useState(0);
  //const [isEdible, setIsEdible] = useState(false);
  const [packageType, setPackageType] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [packagePhotoUri, setPackagePhotoUri] = useState('');

  const [clientPhone, setClientPhone] = useState(phoneNumber);

  const [addOrderLoading, setAddOrderLoading] = useState<boolean>(false);
  const [addOrderError, setAddOrderError] = useState<boolean>(false);

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
    if (selectedPackageType && Object.keys(selectedPackageType).length > 0) {
      Object.keys(selectedPackageType).forEach((key) => {
        setPackageType(selectedPackageType[key].name);
      });
    }
  }, [selectedPackageType]);

  useEffect(() => {
    const roundUp = (num: number, precision: number) => {
      return Math.ceil(num / precision) * precision;
    };

    const calculatePriceEstimate = async () => {
      const baseFare = 50;
      const rateperKm = 25;
      const distandTime = await getEstimatedDistanceAndTime(
        pickedLocation,
        pickedDropOffLocation,
      );
      //console.log(distandTime?.estimatedDistance.value);
      const fare =
        baseFare + (rateperKm * distandTime?.estimatedDistance.value) / 1000;
      setEstimatedPrice(roundUp(fare, 50));
      //return roundUp(fare, 50);
    };

    if (pickedLocation && pickedDropOffLocation) {
      calculatePriceEstimate();
    }
  }, [pickedLocation, pickedDropOffLocation]);

  /* useEffect(() => {
    const getAddress = async () => {
      try {
        const formattedAddress = await fetchAddress(
          clientLocation.lat,
          clientLocation.lng,
        );
        setClientAddress(formattedAddress);
      } catch (err) {
        console.log(err);
      }
    };
    if (clientLocation) {
      getAddress();
    }
  }, []);
 */
  const goToLocation = (config: string) => {
    navigation.navigate('PickLocation', {
      userAddress:
        config === 'drop-off' && pickedDropOffAddress
          ? pickedDropOffAddress
          : pickedLocationAddress,
      initialLocation:
        config === 'drop-off' && pickedDropOffLocation
          ? pickedDropOffLocation
          : pickedLocation,
      isDropOff: config === 'pick-up' ? false : true,
    });
  };

  const goToCheckOut = async () => {
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
    if (!pickedLocation || !pickedLocationAddress) {
      Alert.alert('Wrong Input!', 'Please enter a Pick up Location.', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (!pickedDropOffAddress || !pickedDropOffLocation) {
      Alert.alert('Wrong Input!', 'Please enter a Drop off Location.', [
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

    let pickUpLocation: any;
    if (pickedLocation.resp) {
      pickUpLocation = {
        latitude: pickedLocation.latitude,
        longitude: pickedLocation.longitude,
      };
    } else {
      pickUpLocation = pickedLocation;
    }

    const orderDetails = {
      recipientName: recipientName,
      recipientPhone: recipientPhone,
      pickUpLocation,
      pickUpLocationAddress: pickedLocationAddress,
      dropOffLocation: pickedDropOffLocation,
      dropOffLocationAddress: pickedDropOffAddress,
      packageType: packageType,
      packageDescription: packageDescription,
      packagePhotoUri: packagePhotoUri,
      clientPhone: clientPhone,
      estimatedPrice: estimatedPrice,
      dateRequested: new Date().toString(),
      status: 'pending',
    };

    //console.log(orderDetails);
    //Alert.alert('Submit Form');

    navigation.navigate('CheckOut', {
      orderDetails,
      initiallyHadPhoneNo: phoneNumber ? true : false,
    });
  };

  /*   const renderField = (fieldName: string, stateName: any) => {
    Object.keys(stateName).forEach((key) => {
      fieldName = fieldName + stateName[key].name + ',' + '  ';
    });
    fieldName = fieldName.slice(fieldName).slice(0, fieldName.length - 3);
    return fieldName;
  };
 */
  if (addOrderLoading) {
    return (
      <View style={styles.container}>
        <Spinner size={undefined} style={undefined} />
      </View>
    );
  }

  if (addOrderError) {
    return (
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.errorText}>
          {addOrderError}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        padding: 10,
        paddingTop: 0,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <KeyboardAvoidingView
        /* behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={50}
        style={{flex: 1}}> */
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={constants.styleGuide.height / 4.5}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.screen}>
          <Fragment>
            <Fragment>
              <Text style={styles.secondText}>Recipient Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setRecipientName}
                value={recipientName}
              />
            </Fragment>
            <Fragment>
              <Text style={styles.secondText}>Recipient Phone:</Text>
              <TextInput
                style={{...styles.input, color: constants.primaryTextColor}}
                placeholder=""
                onChangeText={(text) => {
                  setRecipientPhone(text);
                }}
                value={recipientPhone}
                keyboardType="number-pad"
              />
            </Fragment>
            <Fragment>
              <Text style={styles.secondText}>Select Pick Up Location:</Text>
              <ListButton
                info={pickedLocationAddress}
                pressedHandler={() => {
                  goToLocation('pick-up');
                }}
              />
            </Fragment>
            <Fragment>
              <Text style={styles.secondText}>Select Drop Off Location:</Text>
              <ListButton
                info={pickedDropOffAddress}
                pressedHandler={() => {
                  goToLocation('drop-off');
                }}
              />
            </Fragment>
            <Fragment>
              <Text style={styles.secondText}>Select Package Type:</Text>
              <ListButton
                info={packageType}
                pressedHandler={() => {
                  navigation.navigate('ListItems', {
                    items: [
                      'Clothes',
                      'Pet Goods',
                      'Food',
                      'Documents',
                      'Others',
                    ],
                    alreadySelected: selectedPackageType,
                    manySelectable: false,
                    title: 'Select Package Type',
                  });
                }}
              />
              {/*               <View style={styles.radioView}>
                <ListItem>
                  <Left>
                    <Text style={{...styles.secondText, fontWeight: 'normal'}}>
                      Non-Edible
                    </Text>
                  </Left>
                  <Right>
                    <Radio
                      selectedColor={constants.primaryTextColor}
                      selected={!isEdible}
                      onPress={() => setIsEdible(false)}
                      color="#505050"
                    />
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text style={{...styles.secondText, fontWeight: 'normal'}}>
                      Edible
                    </Text>
                  </Left>
                  <Right>
                    <Radio
                      selectedColor={constants.primaryTextColor}
                      selected={isEdible}
                      onPress={() => setIsEdible(true)}
                      color="#505050"
                    />
                  </Right>
                </ListItem>
              </View> */}
            </Fragment>
            <Fragment>
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
            </Fragment>

            <Fragment>
              <Text style={styles.secondText}>
                Would you like to add a photo of the package (optional) ?
              </Text>
              <ImagePicker
                setImage={setPackagePhotoUri}
                imageUri={packagePhotoUri}
              />
            </Fragment>

            <Fragment>
              <Text style={styles.secondText}>
                Phone number to contact you on :
              </Text>
              <TextInput
                style={{...styles.input, color: constants.primaryTextColor}}
                placeholder=""
                onChangeText={(text) => {
                  setClientPhone(text);
                }}
                value={clientPhone}
                keyboardType="number-pad"
              />
            </Fragment>
            <Fragment>
              <Text style={styles.secondText}>Price Estimate:</Text>
              <Text
                style={{...styles.input, color: constants.primaryTextColor}}>
                KES. {estimatedPrice}
              </Text>
            </Fragment>
          </Fragment>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            });
          }}>
          <Text style={styles.thirdText}>Cancel</Text>
        </Button>
        <Button
          style={{
            ...styles.button,
            backgroundColor: constants.primaryTextColor,
          }}
          onPress={() => {
            goToCheckOut();
          }}>
          <Text style={styles.thirdText}>Check Out</Text>
        </Button>
      </View>
    </View>
  );
};

export const orderDetailsScreenOptions = (navigationData: any) => {
  return {
    title: 'Enter Package Details',
  };
};

export default OrderDetails;
