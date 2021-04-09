import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height, width} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  firstView: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  secondView: {
    flex: iphoneX ? 0.4 : 0.5,
  },
  thirdView: {
    marginTop: 20,
    flex: 1,
  },
  image: {
    flex: 1,
    width: width,
  },
});
