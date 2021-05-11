/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

import Button from '../Button';
import styles from './styles';

interface Props {
  retry: any;
  error: string;
}

const ErrorMessage: React.FC<Props> = (props) => {
  const {error, retry} = props;

  return (
    <View style={styles.centered}>
      <Text
        style={{
          fontFamily: 'poppins-bold',
          fontSize: 18,
          textAlign: 'center',
          marginBottom: 10,
        }}>
        {error}
      </Text>
      <Button style={styles.button} onPress={retry}>
        <Text style={styles.thirdText}>Try Again</Text>
      </Button>
    </View>
  );
};

export default ErrorMessage;
