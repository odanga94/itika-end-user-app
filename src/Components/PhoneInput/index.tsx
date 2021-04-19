import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Text,
} from 'react-native';
import CountryPicker, {
  FlagButton,
  CountryCode,
  Country,
} from 'react-native-country-picker-modal';
import constant from '../../utils/constant';
import styles from './styles';

const dropDown = require('../../../assets/dropdown.png');

interface Props {
  enableEvent: string;
  focus: boolean;
  number: string;
  setNumber: (text: string) => void;
}

const PhoneInput: React.FC<Props> = (props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [code, setCode] = useState<CountryCode>('KE');
  //const [number, setNumber] = useState<string>('');
  const [callingCode, setCallingCode] = useState<string>('254');
  const onSelect = (country: Country) => {
    setCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };
  const {enableEvent, focus, number, setNumber} = props;
  return (
    <View style={styles.firstView} pointerEvents={enableEvent}>
      <View style={styles.secondView}>
        <FlagButton
          withEmoji={true}
          countryCode={code}
          onOpen={() => setOpenModal(true)}
        />
        <CountryPicker
          onSelect={onSelect}
          withEmoji={true}
          withFilter={true}
          withFlag={true}
          placeholder
          visible={openModal}
          onClose={() => setOpenModal(false)}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
        <View style={styles.thirdView}>
          <Text style={styles.callingCode}>{`+${callingCode}`}</Text>
          <Image source={dropDown} style={styles.icon} resizeMode="center" />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.fourthView}>
        <TextInput
          onChangeText={(text) => setNumber(text)}
          value={number}
          autoFocus={focus}
          selectionColor={constant.thirdTextColor}
          style={styles.textInput}
          keyboardType={'number-pad'}
        />
      </View>
    </View>
  );
};

export default PhoneInput;
