import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height, width, heightRatio} = constant.styleGuide;
const iphoneX = height > 811;

export default StyleSheet.create({
  firstView: {
    height: iphoneX ? height - 290 * heightRatio : height - 250,
    backgroundColor: constant.commonColor,
    top: 250,
    width: width,
    left: -20,
  },
  secondView: {
    height: iphoneX ? 340 : 280,
  },
  thirdView: {
    height: 45,
    width: width - 50,
    top: 30,
    borderRadius: 5,
    backgroundColor: constant.backColor,
    flexDirection: 'row',
  },
  fourthView: {
    justifyContent: 'center',
    left: 10,
  },
  fifthView: {
    alignItems: 'center',
  },
  firstIcon: {
    height: 15,
    width: 15,
  },
  textInput: {
    left: 25,
    width: width - 150,
    color: constant.thirdTextColor,
    fontWeight: '500',
    fontSize: 14,
  },
  sixthView: {
    top: 45,
    left: 30,
    marginRight: 60,
    bottom: 20,
  },
  seventhView: {
    height: 50,
    borderBottomWidth: 0.4,
    justifyContent: 'center',
    borderBottomColor: constant.lightText,
  },
  firstText: {
    fontWeight: '500',
    color: constant.loc,
  },
  eightView: {
    top: 40,
    left: 30,
    marginRight: 60,
    bottom: 20,
  },
  ninthView: {
    borderBottomWidth: 0.5,
    borderBottomColor: constant.lightText,
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
  },
  secondText: {
    fontWeight: '500',
    fontSize: 14,
    left: 10,
    color: '#505050',
  },
  locateIcon: {
    height: 20,
    width: 20,
    tintColor: constant.primaryTextColor,
  },
  tenthView: {
    top: 20,
  },
  thirdText: {
    fontWeight: '500',
    color: constant.thirdTextColor,
    fontSize: 14,
  },
  twelvethView: {
    flexDirection: 'row',
    top: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: constant.lightText,
    height: 30,
  },
  secondIcon: {
    height: 20,
    width: 20,
    tintColor: constant.primaryTextColor,
  },
  fourthText: {
    color: '#505050',
    left: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});
