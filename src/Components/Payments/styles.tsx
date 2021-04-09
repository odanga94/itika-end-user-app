import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

export default StyleSheet.create({
  firstView: {
    flex: 1,
  },
  secondView: {
    left: 20,
    top: 30,
    height: 78,
    borderBottomWidth: 0.4,
    borderBottomColor: constant.lightText,
    marginRight: 40,
  },
  firstText: {
    fontSize: 16,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  secondText: {
    paddingTop: 8,
    fontSize: 13,
    fontWeight: '500',
    color: constant.secondaryTextColor,
  },
  thirdText: {
    paddingTop: 2,
    fontSize: 12,
    fontWeight: '500',
    color: constant.secondaryTextColor,
  },
  thirdView: {
    left: 20,
    marginTop: 40,
    height: 80,
    marginRight: 40,
  },
  fourthView: {
    height: 50,
    backgroundColor: constant.couponBack,
    marginLeft: 20,
    marginRight: 20,
    top: 20,
    justifyContent: 'center',
    marginBottom: 30,
  },
  fourthText: {
    left: 20,
    color: constant.thirdTextColor,
    fontSize: 14,
    fontWeight: '500',
  },
});
