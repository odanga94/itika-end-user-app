import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import constants from '../../utils/constant';

interface Props {}

const Spinner: React.FC<Props> = () => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={constants.primaryTextColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default Spinner;
