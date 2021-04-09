import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import constant from '../../utils/constant';
import styles from './styles';

const visaIcon = require('../../../assets/visa2.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const AddCard: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' && 'padding'}
        style={styles.keyboardView}>
        <View style={styles.firstView}>
          <Header navigation={navigation} title="Add Card" />
        </View>
        <View style={styles.secondView}>
          <Text style={styles.firstText}>Debit/Credit Card</Text>
          <Image source={visaIcon} style={styles.img} resizeMode="contain" />
        </View>
        <View style={styles.thirdView}>
          <View style={styles.fourthView}>
            <TextInput
              placeholder="Card Holder"
              placeholderTextColor={constant.secondaryTextColor}
              selectionColor={constant.secondaryTextColor}
              style={styles.textInput}
            />
          </View>
          <View style={styles.fourthView}>
            <TextInput
              placeholder="Card Number"
              placeholderTextColor={constant.secondaryTextColor}
              selectionColor={constant.secondaryTextColor}
              style={styles.textInput}
              keyboardType={'number-pad'}
            />
          </View>
          <View style={styles.fourthView}>
            <TextInput
              placeholder="Expiry"
              placeholderTextColor={constant.secondaryTextColor}
              selectionColor={constant.secondaryTextColor}
              style={styles.textInput}
              keyboardType={'number-pad'}
            />
          </View>
          <View style={styles.fourthView}>
            <TextInput
              placeholder="CVV"
              placeholderTextColor={constant.secondaryTextColor}
              selectionColor={constant.secondaryTextColor}
              style={styles.textInput}
              keyboardType={'number-pad'}
            />
          </View>
        </View>
        <View style={styles.fifthView}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('Tabs')}>
            <Text style={styles.secondText}>Save</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddCard;
