import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = (props: any) => {
  return (
    <View style={{...styles.inputContainer, ...props.style}}>
      <Ionicons size={23} name="ios-search" />
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        value={props.searchTerm}
        onChangeText={(text) => {
          props.onSearch(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderColor: '#505050',
    margin: 10,
    //width: '95%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  input: {
    marginLeft: 5,
    width: '90%',
    fontSize: 16,
  },
});

export default SearchBar;
