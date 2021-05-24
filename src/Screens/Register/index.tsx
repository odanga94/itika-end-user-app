import React, {useReducer, useState} from 'react';
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
import auth from '@react-native-firebase/auth';

import PhoneInput from '../../Components/PhoneInput';
import constant from '../../utils/constant';
import Button from '../../Components/Button';
import styles from './styles';
import {RootStackParamList} from '../AppNavigator';
import {checkValidity} from '../../utils/';
import Spinner from '../../Components/UI/Spinner';

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

  //const recaptchaVerifier = useRef(null);

  //const [verificationId, setVerificationId] = useState('');
  const [countryCode, setCountryCode] = useState('+254');
  // const [formattedPhone, setFormattedPhone] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    let formattedPhone = '';
    if (inputState.value.split('')[0] !== '0') {
      formattedPhone = countryCode + inputState.value;
    } else {
      formattedPhone = countryCode + inputState.value.slice(1);
    }
    //console.log(formattedPhone);
    //try {
    /* const phoneProvider = new firebase.default.auth.PhoneAuthProvider();
      const id = await phoneProvider.verifyPhoneNumber(
        formattedPhone,
        recaptchaVerifier.current,
      );
      setVerificationId(id); */
    auth()
      .verifyPhoneNumber(formattedPhone)
      .on(
        'state_changed',
        (phoneAuthSnapshot) => {
          // How you handle these state events is entirely up to your ui flow and whether
          // you need to support both ios and android. In short: not all of them need to
          // be handled - it's entirely up to you, your ui and supported platforms.

          // E.g you could handle android specific events only here, and let the rest fall back
          // to the optionalErrorCb or optionalCompleteCb functions
          switch (phoneAuthSnapshot.state) {
            // ------------------------
            //  IOS AND ANDROID EVENTS
            // ------------------------
            case auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log('code sent');
              // on ios this is the final phone auth state event you'd receive
              // so you'd then ask for user input of the code and build a credential from it
              // as demonstrated in the `signInWithPhoneNumber` example above
              break;
            case auth.PhoneAuthState.ERROR: // or 'error'
              console.log('verification error');
              console.log(phoneAuthSnapshot.error);
              setLoading(false);
              Toast.show({
                text: phoneAuthSnapshot.error
                  ? phoneAuthSnapshot.error?.message
                  : 'Something went wrong 😞',
                buttonText: 'Okay',
                duration: 5000,
                textStyle: {color: constant.primaryTextColor},
                buttonStyle: {backgroundColor: constant.primaryColor},
                buttonTextStyle: {color: '#fff'},
              });
              break;

            // ---------------------
            // ANDROID ONLY EVENTS
            // ---------------------
            case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
              console.log('auto verify on android timed out');
              Toast.show({
                text: 'Verification code has been sent to your phone.',
                buttonText: 'Okay',
                duration: 3000,
                textStyle: {color: constant.primaryTextColor},
                buttonStyle: {backgroundColor: constant.primaryColor},
                buttonTextStyle: {color: '#fff'},
                onClose: () => {
                  navigation.navigate('OtpVerify', {
                    verificationId: phoneAuthSnapshot.verificationId,
                    phoneNumber: formattedPhone,
                  });
                },
              });

              setLoading(false);

              // proceed with your manual code input flow, same as you would do in
              // CODE_SENT if you were on IOS
              break;
            case auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
              // auto verified means the code has also been automatically confirmed as correct/received
              // phoneAuthSnapshot.code will contain the auto verified sms code - no need to ask the user for input.
              console.log('auto verified on android');
              //console.log(phoneAuthSnapshot);
              Toast.show({
                text: 'Verification code has been sent to your phone.',
                buttonText: 'Okay',
                duration: 3000,
                textStyle: {color: constant.primaryTextColor},
                buttonStyle: {backgroundColor: constant.primaryColor},
                buttonTextStyle: {color: '#fff'},
                onClose: () => {
                  navigation.navigate('OtpVerify', {
                    verificationId: phoneAuthSnapshot.verificationId,
                    phoneNumber: formattedPhone,
                    code: phoneAuthSnapshot.code,
                  });
                },
              });
              setLoading(false);
              // Example usage if handling here and not in optionalCompleteCb:
              // const { verificationId, code } = phoneAuthSnapshot;
              // const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

              // Do something with your new credential, e.g.:
              // firebase.auth().signInWithCredential(credential);
              // firebase.auth().currentUser.linkWithCredential(credential);
              // etc ...
              break;
          }
        } /* ,
          (error) => {
            // optionalErrorCb would be same logic as the ERROR case above,  if you've already handed
            // the ERROR case in the above observer then there's no need to handle it here
            console.log(error);
            // verificationId is attached to error if required
            console.log(error.verificationId);
          },
          (phoneAuthSnapshot) => {
            // optionalCompleteCb would be same logic as the AUTO_VERIFIED/CODE_SENT switch cases above
            // depending on the platform. If you've already handled those cases in the observer then
            // there's absolutely no need to handle it here.

            // Platform specific logic:
            // - if this is on IOS then phoneAuthSnapshot.code will always be null
            // - if ANDROID auto verified the sms code then phoneAuthSnapshot.code will contain the verified sms code
            //   and there'd be no need to ask for user input of the code - proceed to credential creating logic
            // - if ANDROID auto verify timed out then phoneAuthSnapshot.code would be null, just like ios, you'd
            //   continue with user input logic.
            console.log(phoneAuthSnapshot);
          }, */,
      );
    /*  } catch (err) {
      Toast.show({
        text: err.message,
        buttonText: 'Okay',
        duration: 5000,
        textStyle: {color: constant.primaryTextColor},
        buttonStyle: {backgroundColor: constant.primaryColor},
        buttonTextStyle: {color: '#fff'},
      });
    } */
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.firstView}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={constant.primaryColor}
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
            {loading ? (
              <Spinner size={undefined} style={undefined} />
            ) : (
              <Button
                onPress={() => verifyPhoneHandler()}
                style={styles.fourthView}>
                <Text style={styles.thirdText}>Send SMS</Text>
              </Button>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Login;
