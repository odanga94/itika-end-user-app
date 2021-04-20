import React, {useState, useEffect, useRef} from 'react';
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
import * as firebase from 'firebase';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import {Toast} from 'native-base';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {RootStackParamList} from '../AppNavigator';
import Spinner from '../../Components/UI/Spinner';
import {firebaseAppAuth, firebaseConfig} from '../../../App';
import constant from '../../utils/constant';
import * as authActions from '../../store/actions/user/auth';

const backIcon = require('../../../assets/back.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  route: StackNavigationProp<RootStackParamList>;
}

const OtpVerify: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const {navigation, route} = props;

  const recaptchaVerifier = useRef(null);

  const CELL_COUNT = 6;

  const [value, setValue] = useState('');
  const [phoneAuthLoading, setPhoneAuthLoading] = useState(false);
  const [verId, setVerId] = useState(route.params.verificationId);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [val, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //console.log(route);

  const verifyPhoneHandler = async () => {
    setValue('');
    try {
      const phoneProvider = new firebase.default.auth.PhoneAuthProvider();
      const id = await phoneProvider.verifyPhoneNumber(
        route.params.phoneNumber,
        recaptchaVerifier.current,
      );
      setVerId(id);
      Toast.show({
        text: 'Verification code has been sent to your phone.',
        buttonText: 'Okay',
        duration: 5000,
        textStyle: {color: constant.primaryTextColor},
        buttonStyle: {backgroundColor: constant.primaryColor},
        buttonTextStyle: {color: '#fff'},
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

  useEffect(() => {
    const phoneAuthHandler = async (verificationId: string) => {
      setPhoneAuthLoading(true);
      try {
        const credential = firebase.default.auth.PhoneAuthProvider.credential(
          verificationId,
          value,
        );
        const authDetails = await firebaseAppAuth.signInWithCredential(
          credential,
        );
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
      phoneAuthHandler(verId);
    }
  }, [value, route, verId, dispatch, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
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
            <Spinner />
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
          <Text style={styles.fourthText}>Didn't you receive any code?</Text>
          <TouchableWithoutFeedback onPress={() => verifyPhoneHandler()}>
            <Text style={styles.fifthText}>Resend Code</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerify;
