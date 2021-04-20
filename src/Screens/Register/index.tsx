import React, {useReducer, useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import {Toast} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';

import PhoneInput from '../../Components/PhoneInput';
import constant from '../../utils/constant';
import Button from '../../Components/Button';
import styles from './styles';
import {RootStackParamList} from '../AppNavigator';
import {checkValidity} from '../../utils/';
import {firebaseConfig} from '../../../App';

const backIcon = require('../../../assets/back.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Login: React.FC<Props> = (props) => {
  const {navigation} = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    touched: false,
  });

  const recaptchaVerifier = useRef(null);

  const [verificationId, setVerificationId] = useState('');
  const [verficationCode, setVerificationCode] = useState();
  const [countryCode, setCountryCode] = useState('+254');
  // const [formattedPhone, setFormattedPhone] = useState('');

  const textChangedHandler = (text: string) => {
    let isValid = checkValidity(
      text,
      {required: true, minLength: 9, maxLength: 10},
      'phone',
      '',
    );
    dispatch({type: INPUT_CHANGE, value: text, isValid});
  };

  /* const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  }; */

  const verifyPhoneHandler = async () => {
    if (!inputState.isValid) {
      Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    let formattedPhone = '';
    if (inputState.value.split('')[0] !== '0') {
      formattedPhone = countryCode + inputState.value;
    } else {
      formattedPhone = countryCode + inputState.value.slice(1);
    }
    //console.log(formattedPhone);
    try {
      const phoneProvider = new firebase.default.auth.PhoneAuthProvider();
      const id = await phoneProvider.verifyPhoneNumber(
        formattedPhone,
        recaptchaVerifier.current,
      );
      setVerificationId(id);
      Toast.show({
        text: 'Verification code has been sent to your phone.',
        buttonText: 'Okay',
        duration: 5000,
        textStyle: {color: constant.primaryTextColor},
        buttonStyle: {backgroundColor: constant.primaryColor},
        buttonTextStyle: {color: '#fff'},
        onClose: () => {
          navigation.navigate('OtpVerify', {
            verificationId: id,
            phoneNumber: formattedPhone,
          });
        },
      });
    } catch (err) {
      Toast.show({
        text: err.message,
        buttonText: 'Okay',
        duration: 5000,
        textStyle: {color: constant.primaryTextColor},
        buttonStyle: {backgroundColor: constant.primaryColor},
        buttonTextStyle: {color: '#fff'},
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.firstView}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={constant.commonColor}
        />
        <View style={styles.secondView}>
          <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
            <View style={styles.thirdView}>
              <Image
                source={backIcon}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.fifthView}>
          <View style={styles.sixthView}>
            <Text style={styles.firstText}>Right this way</Text>
            <Text style={styles.secondText}>
              Enter your mobile number to get started
            </Text>
          </View>
          <View style={styles.seventhView}>
            <PhoneInput
              enableEvent="auto"
              focus={true}
              setNumber={textChangedHandler}
              number={inputState.value}
              setCountryCode={setCountryCode}
            />
            {!inputState.isValid && inputState.touched && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  Please enter a valid phone number.
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.eightView}>
          <View style={styles.ninthView}>
            <Button
              onPress={() => verifyPhoneHandler()}
              style={styles.fourthView}>
              <Text style={styles.thirdText}>Send SMS</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Login;
