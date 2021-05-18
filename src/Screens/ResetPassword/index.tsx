/* eslint-disable react-native/no-inline-styles */
import React, {useState, Fragment, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import Button from '../../Components/Button';
import Spinner from '../../Components/UI/Spinner';
import Input from '../../Components/Input';
import {firebaseAppAuth} from '../../../App';
import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import constant from '../../utils/constant';
import {checkValidity} from '../../utils/';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const ResetPassword: React.FC<Props> = (props) => {
  const {navigation} = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [email, setEmail] = useState('');

  const passwordResetHandler = async () => {
    if (!email || !formIsValid) {
      Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    //console.log(credentials);
    setIsLoading(true);

    await firebaseAppAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Email Sent',
          `We have sent a password reset email to ${email}. Please check your email to reset your password`,
          [
            {
              text: 'Back to Login',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Something went wrong', error.message, [{text: 'Okay'}]);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  const inputChangeHandler = (
    inputLabel: string,
    value: string,
    validity: boolean,
  ) => {
    setEmail(value);
    setFormIsValid(validity);
  };

  return (
    <View style={{flex: 1, padding: 20, justifyContent: 'space-between'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={constant.styleGuide.height / 4.5}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.screen}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../assets/icon-fd.png')}
              resizeMode="contain"
            />
          </View>
          <Input
            id="email"
            label="Enter the email you use with Itika App:"
            keyboardType="email-address"
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
            style={styles.textInput}
            rules={{required: true, isEmail: true}}
            secureTextEntry={false}
            initiallyValid={true}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoading ? (
        <Spinner size={undefined} style={undefined} />
      ) : (
        <Button
          style={styles.fourthView}
          onPress={() => {
            passwordResetHandler();
          }}>
          <Text style={styles.sixthText}>Send Email</Text>
        </Button>
      )}
    </View>
  );
};

/* ResetPassword.navigationOptions = {
  headerTitle: 'Sign In',
}; */

export default ResetPassword;
