import {StyleSheet} from 'react-native';
import constants from '../../utils/constant';

const {width} = constants.styleGuide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  screen: {
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderTopColor: '#ccc',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    fontFamily: 'poppins-regular',
    marginTop: 3,
    //marginBottom: 15,
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorContainer: {
    marginTop: -10,
    marginBottom: 3,
  },
  errorText: {
    fontFamily: 'poppins-regular',
    color: 'red',
    fontSize: 14,
  },
  secondText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    color: constants.thirdTextColor,
  },
  button: {
    height: 50,
    width: width / 2.5,
    backgroundColor: constants.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  thirdText: {
    color: constants.commonColor,
    fontSize: 18,
    fontWeight: '700',
  },
  radioView: {
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 7.5,
    marginTop: 3,
  },
});

export default styles;
