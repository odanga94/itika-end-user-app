import React, {useReducer, useEffect} from 'react';
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
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import PhoneInput from '../../Components/PhoneInput';
import constant from '../../utils/constant';
import Button from '../../Components/Button';
import styles from './styles';
import {RootStackParamList} from '../AppNavigator';
import {checkValidity} from '../../utils/';

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

  const verifyPhoneHandler = () => {
    if (!inputState.isValid) {
      Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    navigation.navigate('OtpVerify');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
              <Text style={styles.thirdText}>Continue</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Login;
