import {StyleSheet, Dimensions} from 'react-native';

import constant from '../../utils/constant';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#030202',
  },
  firstView: {
    flex: 1,
    backgroundColor: "#fff"
  },
  backgroundColorImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  secondView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 200,
    width: 200,
    resizeMode: 'stretch',
    marginTop: 65,
    marginBottom: -40
  },
  firstText: {
    color: constant.primaryTextColor,
    paddingTop: 25,
    fontSize: 28,
    fontWeight: 'bold',
  },
  thirdView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fourthView: {
    height: 50,
    width: 320,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50,
  },
  thirdText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fifthView: {
    flexDirection: 'row',
    marginTop: 30,
  },
  fourthText: {
    color: constant.primaryTextColor,
    fontWeight: '300',
    fontSize: 18,
  },
  fifthText: {
    color: constant.primaryColor,
    fontWeight: '700',
    fontSize: 18,
  },
  sixthText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  terms: {
    textAlign: 'center',
    fontFamily: 'poppins-regular',
    fontSize: 14,
    color: '#505050',
  },
});
