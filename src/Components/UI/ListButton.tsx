import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import constants from '../../utils/constant';

const ListButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.pressedHandler} style={styles.button}>
      <Text style={styles.secondText}>{props.info}</Text>
      <AntDesign name="right" size={18} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 7.5,
    marginTop: 3,
  },
  secondText: {
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 5,
    color: constants.thirdTextColor,
  },
});

export default ListButton;
