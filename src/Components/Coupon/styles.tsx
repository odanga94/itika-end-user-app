import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width} = constant.styleGuide;

export default StyleSheet.create({
  firstView: {
    height: 45,
    width: width - 40,
    backgroundColor: constant.couponBack,
    left: 18,
    flexDirection: 'row',
  },
  secondView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  firstText: {
    left: 28,
    fontSize: 12,
    fontWeight: '500',
    color: constant.primaryColor,
  },
  thirdView: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  icon: {
    height: 15,
    width: 15,
    left: 20,
  },
  forIcon: {
    height: 12,
    width: 12,
    left: 20,
    tintColor: constant.secondaryTextColor,
  },
  discountIcon: {
    height: 15,
    width: 15,
    left: 15,
  },
});
