import React, {useReducer, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './styles';
import {checkValidity} from '../../utils';

interface Props {
  rules: any;
  initialValue: string;
  initiallyValid: boolean;
  id: string;
  onInputChange: (id: string, text: string, validity: boolean) => void;
  errorText: string;
  label: string;
  style: any;
  keyboardType: any;
  secureTextEntry: any;
  autoCapitalize: string;
  passwordValue: string;
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

const Input: React.FC<Props> = (props) => {
  const {
    onInputChange,
    id,
    initialValue,
    initiallyValid,
    errorText,
    label,
    style,
    rules,
    passwordValue,
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initiallyValid,
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangedHandler = (text: string) => {
    let isValid = checkValidity(text, rules, id, passwordValue);
    dispatch({type: INPUT_CHANGE, value: text, isValid});
  };

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={{...styles.input, ...style}}
        value={inputState.value}
        onChangeText={textChangedHandler}
        autoCapitalize="sentences"
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;
