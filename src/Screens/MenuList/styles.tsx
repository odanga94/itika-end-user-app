import {StyleSheet, Platform} from 'react-native';
import constant from '../../utils/constant';

const {height, heightRatio} = constant.styleGuide;
const iphoneX = height > 811;

export default StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    height: Platform.OS === 'android' ? 60 * heightRatio : 75 * heightRatio,
    flexDirection: 'row',
    alignItems: 'center',
    left: 20,
    justifyContent: 'space-between',
    marginRight: 60,
  },
  secondView: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: constant.paymentBackGround,
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
    bottom: 5,
    top: iphoneX ? 15 : 10,
  },
  imageIcon: {
    height: 15,
    width: 15,
    position: 'absolute',
  },
  backIcon: {
    height: 20,
    width: 20,
    top: iphoneX ? 15 : 10,
  },
  firstText: {
    fontSize: 18,
    fontWeight: '500',
    top: iphoneX ? 15 : 10,
    left: 18,
    color: constant.thirdTextColor,
  },
  thirdView: {
    flex: 1.5,
  },
  fourthView: {
    flex: 0.2,
    flexDirection: 'row',
  },
  fifthView: {
    flex: 2,
    justifyContent: 'center',
  },
  secondText: {
    fontSize: 22,
    fontWeight: '400',
    left: 20,
    color: constant.thirdTextColor,
  },
  sixthView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thirdText: {
    left: 35 * heightRatio,
    fontSize: 16,
    fontWeight: '700',
  },
  seventhView: {
    left: 35 * heightRatio,
  },
  eighthView: {
    flex: 0.9,
  },
  ninthView: {
    flex: iphoneX ? 1.3 : 0.9,
  },
});
