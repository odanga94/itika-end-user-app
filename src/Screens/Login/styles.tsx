import {StyleSheet, Platform} from 'react-native';

import constant from '../../utils/constant';

const {height} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    flex: 1,
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
  },
  firstText: {
    fontSize: 28,
    color: constant.thirdTextColor,
    fontWeight: '500',
  },
  secondView: {
    flex: 0.4,
  },
  secondText: {
    top: 12,
    color: constant.thirdTextColor,
    fontSize: 16,
    fontWeight: '500',
  },
  thirdView: {
    left: 15,
    top: 10,
  },
  icon: {
    height: 20,
    width: 20,
  },
  fourthView: {
    height: 50,
    width: 300,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50,
  },
  fifthView: {
    flex: 2,
  },
  sixthView: {
    left: 50,
  },
  seventhView: {
    top: 80,
    left: 20,
  },
  eightView: {
    flex: 3,
    justifyContent: 'flex-end',
  },
  ninthView: {
    alignItems: 'center',
    bottom: iphoneX ? 10 : 40,
  },
  thirdText: {
    fontSize: 18,
    fontWeight: '500',
    color: constant.commonColor,
  },
});
