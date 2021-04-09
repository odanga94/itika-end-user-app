import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width, heightRatio, height} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  firstView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  secondView: {
    flex: 4,
    width: width,
  },
  thirdView: {
    flex: 2,
    backgroundColor: constant.commonColor,
    borderRadius: 20,
    marginTop: -18,
  },
  fourthView: {
    flex: 2,
    top: 45 * heightRatio,
    left: 50,
  },
  firstText: {
    fontSize: 28,
    color: constant.primaryTextColor,
    fontWeight: '500',
  },
  secondText: {
    top: 12,
    color: constant.secondaryTextColor,
    fontSize: 16,
    fontWeight: '500',
  },
  fifthView: {
    flex: 2,
    left: 20,
    marginTop: iphoneX ? 0 : 30 * heightRatio,
  },
  dot: {
    marginBottom: 25,
  },
});
