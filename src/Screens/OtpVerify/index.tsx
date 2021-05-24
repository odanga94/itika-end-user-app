import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import auth from '@react-native-firebase/auth';
import {Toast} from 'native-base';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {RootStackParamList} from '../AppNavigator';
import Spinner from '../../Components/UI/Spinner';
import constant from '../../utils/constant';
import * as authActions from '../../store/actions/user/auth';

const backIcon = require('../../../assets/back.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  route: any;
}

const OtpVerify: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const {navigation, route} = props;

  const CELL_COUNT = 6;

  const [value, setValue] = useState(
    route.params.code ? route.params.code : '',
  );
  const [phoneAuthLoading, setPhoneAuthLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [val, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //console.log(route);

  const verifyPhoneHandler = async () => {
    setValue('');
    setLoading(true);
    auth()
      .verifyPhoneNumber(route.params.phoneNumber)
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
              /* Toast.show({
                text: 'Verification code has been sent to your phone.',
                buttonText: 'Okay',
                duration: 5000,
                textStyle: {color: constant.primaryTextColor},
                buttonStyle: {backgroundColor: constant.primaryColor},
                buttonTextStyle: {color: '#fff'},
                onClose: () => {
                  /* navigation.navigate('OtpVerify', {
                  verificationId: phoneAuthSnapshot.verificationId,
                  phoneNumber: route.params.phoneNumber,
                  code: phoneAuthSnapshot.code,
                });
                },
              }); */
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
              setLoading(false);
              Toast.show({
                text: 'Verification code has been sent to your phone.',
                buttonText: 'Okay',
                duration: 5000,
                textStyle: {color: constant.primaryTextColor},
                buttonStyle: {backgroundColor: constant.primaryColor},
                buttonTextStyle: {color: '#fff'},
                onClose: () => {
                  /* navigation.navigate('OtpVerify', {
                  verificationId: phoneAuthSnapshot.verificationId,
                  phoneNumber: route.params.phoneNumber,
                  code: phoneAuthSnapshot.code,
                }); */
                },
              });

              // proceed with your manual code input flow, same as you would do in
              // CODE_SENT if you were on IOS
              break;
            case auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
              // auto verified means the code has also been automatically confirmed as correct/received
              // phoneAuthSnapshot.code will contain the auto verified sms code - no need to ask the user for input.
              console.log('auto verified on android');
              Toast.show({
                text: 'Verification code has been sent to your phone.',
                buttonText: 'Okay',
                duration: 5000,
                textStyle: {color: constant.primaryTextColor},
                buttonStyle: {backgroundColor: constant.primaryColor},
                buttonTextStyle: {color: '#fff'},
                onClose: () => {
                  /* navigation.navigate('OtpVerify', {
                  verificationId: phoneAuthSnapshot.verificationId,
                  phoneNumber: route.params.phoneNumber,
                  code: phoneAuthSnapshot.code,
                }); */
                },
              });
              //console.log(phoneAuthSnapshot);
              if (phoneAuthSnapshot.code) {
                setValue(phoneAuthSnapshot.code);
              }
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
  };

  useEffect(() => {
    const phoneAuthHandler = async (verificationId: string) => {
      setPhoneAuthLoading(true);
      try {
        const credential = auth.PhoneAuthProvider.credential(
          verificationId,
          value,
        );
        const authDetails = await auth().signInWithCredential(credential);
        //console.log(authDetails);
        dispatch(authActions.authenticate(authDetails.user?.uid, false, false));
        navigation.reset({
          index: 0,
          routes: [{name: 'SignUp'}],
        });
      } catch (err) {
        Alert.alert('Something Went Wrong.', err.message, [{text: 'Okay'}]);
        //setPhoneAuthLoading(false)
      }
      setPhoneAuthLoading(false);
    };

    if (value.length > 5) {
      phoneAuthHandler(route.params.verificationId);
    }
  }, [value, route, dispatch, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.secondView}>
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <View style={styles.thirdView}>
            <Image
              source={backIcon}
              style={styles.icons}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.fifthView}>
        <View style={styles.sixthView}>
          <Text style={styles.firstText}>Verify your</Text>
          <Text style={styles.firstText}>phone number</Text>
          <Text style={styles.secondText}>
            We have sent you an SMS with a code to
          </Text>
          <Text style={styles.thirdText}>
            number {route.params.phoneNumber}
          </Text>
        </View>

        <View style={styles.seventhView}>
          {phoneAuthLoading ? (
            <Spinner size={undefined} style={undefined} />
          ) : (
            <CodeField
              ref={ref}
              {...val}
              value={value}
              autoFocus
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFiledRoot}
              keyboardType="number-pad"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[
                    styles.cellRoot,
                    symbol ? styles.focusCell : null,
                    isFocused && styles.focusCell,
                  ]}>
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          )}
        </View>

        <View style={styles.ninthView}>
          {loading ? (
            <Spinner size={undefined} style={undefined} />
          ) : (
            <Fragment>
              <Text style={styles.fourthText}>
                Didn't you receive any code?
              </Text>
              <TouchableWithoutFeedback onPress={() => verifyPhoneHandler()}>
                <Text style={styles.fifthText}>Resend Code</Text>
              </TouchableWithoutFeedback>
            </Fragment>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerify;
