import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
import constant from '../../utils/constant';

const styles = StyleSheet.create({
  screen: {
    //height: '95%',
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: height / 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  image: {
    height: height / 3.5,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  fourthView: {
    height: 50,
    width: 320,
    backgroundColor: constant.primaryTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50,
    alignSelf: 'center'
  },
  sixthText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 5,
  },
  authButton: {
    backgroundColor: 'rgb(51, 79, 141)',
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: 'row',
    width: '90%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'poppins-regular',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default styles;
