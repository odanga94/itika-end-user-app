import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height} = constant.styleGuide;
const iphoneX = height > 811;

export default StyleSheet.create({
  firstView: {
    flex: 1,
  },
  secondView: {
    flex: iphoneX ? 0.5 : 0.4,
    justifyContent: 'center',
  },
  icon: {
    height: 15,
    width: 15,
    left: 20,
    top: 25,
  },
  thirdView: {
    flex: 1,
    alignItems: 'center',
  },
  firstText: {
    fontSize: 28,
    top: 25,
    color: constant.commonColor,
  },
  secondText: {
    fontSize: 28,
    color: constant.commonColor,
    paddingTop: 30,
  },
});
