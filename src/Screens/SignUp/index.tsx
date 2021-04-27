/* eslint-disable react-native/no-inline-styles */
import React, {useReducer, /*useEffect,*/ useCallback, useState} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import Input from '../../Components/Input';
import constant from '../../utils/constant';
import Button from '../../Components/Button';
import Spinner from '../../Components/UI/Spinner';

import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import * as profileActions from '../../store/actions/user/profile';
import {firebaseAppAuth} from '../../../App';

const image = require('../../../assets/Artboard.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state: any, action: any) => {
  if (action.type === FORM_INPUT_UPDATE) {
    let updatedFormIsValid = true;
    const updatedValues = {
      ...state.inputValues,
      [action.inputLabel]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.inputLabel]: action.isValid,
    };
    for (let key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const SignUp: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.auth.userId);

  const {navigation} = props;

  const [isLoading, setIsLoading] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    inputValidities: {
      email: false,
      password: false,
      confirmPassword: false,
      firstName: false,
      lastName: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputLabel, value, validity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value,
        isValid: validity,
        inputLabel,
      });
    },
    [dispatchFormState],
  );

  const registrationHandler = async () => {
    //console.log(formState.formIsValid, formState.inputValues);
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    setIsLoading(true);
    try {
      const phone = firebaseAppAuth.currentUser?.phoneNumber;
      const userData = {
        firstName: formState.inputValues.firstName,
        lastName: formState.inputValues.lastName,
        email: formState.inputValues.email,
        password: formState.inputValues.password,
        phone: phone,
      };
      await dispatch(profileActions.createProfile(userId, userData));
      navigation.reset({
        index: 0,
        routes: [{name: 'Tabs'}],
      });
    } catch (err) {
      Alert.alert('Something went wrong.', err.message, [{text: 'Okay'}]);
    }
    setIsLoading(false);
  };

  //console.log('user', firebaseAppAuth.currentUser);
  /* useEffect(() => {
    setFormIsValid(formState.formIsValid);
    setCredentials({...formState.inputValues});
  }, [formState, setFormIsValid, setCredentials]); */

  return (
    <View style={styles.firstView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.firstView}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={constant.primaryColor}
        />
        <View style={styles.firstView}>
          <View style={styles.firstView}>
            <Swiper
              dotColor={constant.commonColor}
              activeDotColor={constant.primaryColor}
              dotStyle={styles.dot}
              activeDotStyle={styles.dot}>
              <Image source={image} style={styles.image} resizeMode="cover" />
              <Image source={image} style={styles.image} resizeMode="cover" />
              <Image source={image} style={styles.image} resizeMode="cover" />
            </Swiper>
          </View>
          <View style={styles.secondView}>
            <View style={styles.thirdView}>
              <Text style={styles.firstText}>Register</Text>
              <Text style={styles.secondText}>
                Enter your details to get started{' '}
              </Text>
              <ScrollView style={styles.fourthView}>
                <Input
                  id="firstName"
                  label="First Name:"
                  keyboardType="default"
                  rules={{required: true}}
                  autoCapitalize="none"
                  errorText="Please enter a valid name."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  style={styles.textInput}
                />
                <Input
                  id="lastName"
                  label="Last Name:"
                  keyboardType="default"
                  rules={{required: true}}
                  autoCapitalize="none"
                  errorText="Please enter a valid name."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  style={styles.textInput}
                />
                <Input
                  id="email"
                  label="E-mail:"
                  keyboardType="email-address"
                  rules={{required: true, isEmail: true}}
                  initiallyValid={true}
                  autoCapitalize="none"
                  errorText="Please enter a valid email address."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  style={styles.textInput}
                />
                {/* <Input
                  id="phone"
                  label="Phone:"
                  keyboardType="phone-pad"
                  rules={{required: true, minLength: 10, maxLength: 10}}
                  autoCapitalize="none"
                  errorText="Please enter a valid phone number."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  style={styles.textInput}
                /> */}
                <Input
                  id="password"
                  label="Password:"
                  keyboardType="default"
                  secureTextEntry
                  rules={{minLength: 6, required: true}}
                  initiallyValid={true}
                  autoCapitalize="none"
                  errorText="Please enter a valid password."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  style={styles.textInput}
                />
                <Input
                  id="confirmPassword"
                  label="Confirm Password:"
                  passwordValue={formState.inputValues.password}
                  keyboardType="default"
                  secureTextEntry
                  rules={{minLength: 6, required: true}}
                  autoCapitalize="none"
                  errorText="Passwords do not match"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  style={styles.textInput}
                />
              </ScrollView>
              <View style={styles.fifthView}>
                {isLoading ? (
                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                      alignSelf: 'center',
                    }}>
                    <Spinner />
                  </View>
                ) : (
                  <Button
                    style={styles.button}
                    onPress={() => registrationHandler()}>
                    <Text style={styles.thirdText}>Register</Text>
                  </Button>
                )}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default SignUp;
