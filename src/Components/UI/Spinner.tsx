import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import constants from '../../utils/constant';

interface Props {
  size: string | undefined;
  style: any | undefined;
}

const Spinner: React.FC<Props> = (props: any) => {
  return (
    <View style={{...styles.centered, ...props.style}}>
      <ActivityIndicator
        size={props.size ? props.size : 'large'}
        color={constants.primaryTextColor}
      />
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
