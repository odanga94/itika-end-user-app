import React, {useReducer, Fragment, useCallback, useEffect} from 'react';

import Input from '../Input';
import styles from './styles';

interface Props {
  setFormIsValid: (validity: boolean) => void;
  setCredentials: (credentials: any) => void;
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

const SignInWithEmailForm: React.FC<Props> = (props) => {
  const {setFormIsValid, setCredentials} = props;
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputLabel: string, value: string, validity: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value,
        isValid: validity,
        inputLabel,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    setFormIsValid(formState.formIsValid);
    setCredentials({...formState.inputValues});
  }, [formState, setFormIsValid, setCredentials]);

  return (
    <Fragment>
      <Input
        id="email"
        label="E-mail:"
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
      <Input
        id="password"
        label="Password:"
        keyboardType="default"
        secureTextEntry
        autoCapitalize="none"
        errorText="Please enter a valid password."
        onInputChange={inputChangeHandler}
        initialValue=""
        style={styles.textInput}
        rules={{minLength: 6, required: true}}
        initiallyValid={true}
      />
    </Fragment>
  );
};

export default SignInWithEmailForm;
