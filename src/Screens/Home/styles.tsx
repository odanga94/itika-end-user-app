import {StyleSheet, Platform} from 'react-native';

import constant from '../../utils/constant';

const {height, heightRatio, width} = constant.styleGuide;
const iphoneX = height > 811;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    height: 50 * heightRatio,
    marginLeft: 8 * heightRatio,
    marginRight: 8 * heightRatio,
  },
  secondView: {
    flex: 1,
    top: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  firstIcon: {
    height: 23,
    width: 23,
  },
  firstText: {
    left: 5,
    fontSize: 16,
    color: constant.thirdTextColor,
    fontWeight: '500',
  },
  thirdView: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: constant.paymentBackGround,
    justifyContent: 'center',
    alignItems: 'center',
    left: Platform.OS === 'android' ? 25 : 30 * heightRatio,
    bottom: 5,
  },
  secondIcon: {
    height: 15,
    width: 15,
  },
  fourthView: {
    left: Platform.OS === 'android' ? 32 : 35 * heightRatio,
    bottom: 5,
  },
  thirdIcon: {
    height: 35,
    width: 35,
    position: 'absolute',
  },
  fifthView: {
    flex: iphoneX ? 1.8 : 2.2,
    justifyContent: 'center',
  },
  sixthView: {
    flex: iphoneX ? 1 : 1.45,
  },
  seventhView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 60,
    marginLeft: 15,
    paddingTop: 30 * heightRatio,
  },
  secondText: {
    fontSize: 16 * heightRatio,
    color: constant.thirdTextColor,
    fontWeight: '500',
  },
  thirdText: {
    fontSize: 16,
    color: constant.thirdTextColor,
    fontWeight: '500',
  },
  eightView: {
    flexDirection: 'row',
  },
  searchView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 80,
  },
  orderText: {
    fontSize: 22,
    marginBottom: 10,
    color: constant.thirdTextColor,
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    height: 45,
    width: width - 42,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    top: 10 * heightRatio,
    left: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: constant.commonColor,
  },
});
