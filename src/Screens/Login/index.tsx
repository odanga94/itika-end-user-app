import * as React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import PhoneInput from '../../Components/PhoneInput';
import constant from '../../utils/constant';
import Button from '../../Components/Button';
import styles from './styles';
import {RootStackParamList} from '../AppNavigator';

const backIcon = require('../../../assets/back.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Login: React.FC<Props> = (props) => {
  const {navigation} = props;
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
            <PhoneInput enableEvent="auto" focus={true} />
          </View>
        </View>
        <View style={styles.eightView}>
          <View style={styles.ninthView}>
            <Button
              onPress={() => navigation.navigate('OtpVerify')}
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
