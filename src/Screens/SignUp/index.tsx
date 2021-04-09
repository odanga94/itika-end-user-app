import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {StackNavigationProp} from '@react-navigation/stack';

import constant from '../../utils/constant';
import Button from '../../Components/Button';
import {RootStackParamList} from '../AppNavigator';
import styles from './styles';

const image = require('../../../assets/Artboard.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const SignUp: React.FC<Props> = (props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const onChangeText = (val: string) => {
    setName(val);
  };
  const onChangeEmail = (eml: string) => {
    setEmail(eml);
  };
  const {navigation} = props;
  return (
    <View style={styles.firstView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.firstView}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={constant.blackColor}
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
              <View style={styles.fourthView}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor={'grey'}
                  autoFocus={true}
                  autoCorrect={false}
                  onChangeText={(text) => onChangeText(text)}
                  value={name}
                  selectionColor={'grey'}
                  style={styles.input}
                />
              </View>
              <View style={styles.fifthView}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={'grey'}
                  autoCorrect={false}
                  onChangeText={(text) => onChangeEmail(text)}
                  value={email}
                  selectionColor={'grey'}
                  style={styles.input}
                />
              </View>
              <Button
                style={styles.button}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Tabs'}],
                  })
                }>
                <Text style={styles.thirdText}>Register</Text>
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default SignUp;
