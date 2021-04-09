import {StyleSheet, Platform} from 'react-native';
import constant from '../../utils/constant';
const {width, heightRatio} = constant.styleGuide;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    height: 60,
    top: 10,
  },
  secondView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  firstText: {
    fontSize: 16,
    fontWeight: '400',
    color: constant.blackColor,
    marginLeft: 20,
  },
  img: {
    height: 22,
    width: 22,
    marginRight: 20,
  },
  thirdView: {
    flex: 1,
  },
  fourthView: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 18,
    backgroundColor: constant.backColor,
    borderRadius: 5,
    justifyContent: 'center',
  },
  textInput: {
    width: width - 80,
    left: 20,
    fontSize: 14,
    fontWeight: '500',
    color: constant.secondaryTextColor,
  },
  fifthView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 320,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    bottom: 20,
  },
  secondText: {
    color: constant.commonColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  keyboardView: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? -20 * heightRatio : 0,
  },
});
