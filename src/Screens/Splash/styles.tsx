import {StyleSheet} from 'react-native';

import constant from '../../utils/constant';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#030202',
  },
  firstView: {
    flex: 1,
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
    height: 100,
    width: 100,
    resizeMode: 'stretch',
    marginTop: 65,
  },
  firstText: {
    color: '#fff',
    paddingTop: 25,
    fontSize: 28,
    fontWeight: 'bold',
  },
  secondText: {
    color: '#fff',
    padding: 8,
    fontSize: 13,
    fontWeight: '300',
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
    color: '#fff',
    fontWeight: '300',
    fontSize: 14,
  },
  fifthText: {
    color: constant.primaryColor,
    fontWeight: '700',
    fontSize: 14,
  },
  sixthText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
