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
    flex: 1,
  },
  firstText: {
    fontSize: 28,
    color: constant.thirdTextColor,
    fontWeight: '500',
  },
  secondView: {
    height: 60,
  },
  secondText: {
    top: 18,
    color: constant.thirdTextColor,
    fontSize: 16,
    fontWeight: '500',
  },
  thirdText: {
    top: 25,
    color: constant.thirdTextColor,
    fontSize: 16,
    fontWeight: '500',
  },
  thirdView: {
    left: 15,
    top: 10,
  },
  icons: {
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
    flex: 1,
  },
  sixthView: {
    left: 50,
  },
  seventhView: {
    paddingTop: 70,
  },
  eightView: {
    flex: 2,
    justifyContent: 'center',
    bottom: Platform.OS === 'android' ? 0 : 0,
  },
  ninthView: {
    paddingTop: iphoneX ? 60 * heightRatio : 20 * heightRatio,
    alignItems: 'center',
  },
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {
    marginTop: 20,
    width: width,
    //marginLeft: 'auto',
    //marginRight: 'auto',
    paddingHorizontal: 20,
  },
  cellRoot: {
    width: width / 8,
    height: width / 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constant.backColor,
  },
  cellText: {
    color: constant.commonColor,
    fontSize: 22,
    textAlign: 'center',
  },
  focusCell: {
    backgroundColor: constant.primaryColor,
  },
  fourthText: {
    fontSize: 16,
    fontWeight: '500',
    color: constant.codeColor,
  },
  fifthText: {
    top: 15,
    fontSize: 15,
    fontWeight: '700',
    color: constant.primaryColor,
  },
});
