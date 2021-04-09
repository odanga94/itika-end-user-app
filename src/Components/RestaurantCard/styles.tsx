import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {heightRatio} = constant.styleGuide;

export default StyleSheet.create({
  firstView: {
    flex: 1,
  },
  firstText: {
    fontSize: 28,
    color: constant.thirdTextColor,
    fontWeight: '500',
    paddingLeft: 15,
  },
  container: {
    paddingRight: 12 * heightRatio,
  },
});
