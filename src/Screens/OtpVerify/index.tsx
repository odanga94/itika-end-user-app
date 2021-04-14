import React, {useState, useEffect} from 'react';
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

import styles from './styles';
import {RootStackParamList} from '../AppNavigator';

const backIcon = require('../../../assets/back.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const OtpVerify: React.FC<Props> = (props) => {
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const {navigation} = props;
  const [val, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value.length > 3) {
      navigation.reset({
        index: 0,
        routes: [{name: 'SignUp'}],
      });
    }
  }, [value, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
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
          <Text style={styles.thirdText}>number +91 8904871491</Text>
        </View>
        <View style={styles.seventhView}>
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
        </View>
        <View style={styles.ninthView}>
          <Text style={styles.fourthText}>Didn't you received any code?</Text>
          <TouchableWithoutFeedback onPress={() => Alert.alert('Code Resent')}>
            <Text style={styles.fifthText}>Resend Code</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerify;
