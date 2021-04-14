import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'poppins-bold',
    marginVertical: 4,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    fontFamily: 'poppins-regular',
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'poppins-regular',
    color: 'red',
    fontSize: 14,
  },
});

export default styles;
