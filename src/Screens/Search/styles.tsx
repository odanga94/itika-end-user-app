import {StyleSheet, Platform} from 'react-native';
import constant from '../../utils/constant';

const {width, heightRatio} = constant.styleGuide;

export default StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    flex: 0.3,
    flexDirection: 'row',
    top: 20,
  },
  icon: {
    height: 20,
    width: 20,
    top: 15,
    marginLeft: 20,
  },
  secondView: {
    height: 45,
    borderRadius: 20,
    borderWidth: 0.5,
    justifyContent: 'center',
    borderColor: constant.secondaryTextColor,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20 * heightRatio,
  },
  secondIcon: {
    height: 15,
    width: 15,
    top: Platform.OS === 'android' ? 5 : 0,
    left: 15,
  },
  textInput: {
    paddingLeft: 20,
    width: width - 110,
    color: constant.thirdTextColor,
    fontWeight: '500',
    fontSize: 14,
    paddingRight: 20,
    top: Platform.OS === 'android' ? 5 : 0,
  },
  fourthView: {
    flex: 3,
  },
});
