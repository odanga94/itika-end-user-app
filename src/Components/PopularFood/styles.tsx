import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

export default StyleSheet.create({
  firtView: {
    flex: 1,
    top: -5,
  },
  secondView: {
    paddingLeft: 20,
  },
  img: {
    height: 150,
  },
  firstText: {
    fontSize: 18,
    top: 10,
    fontWeight: '400',
    color: constant.thirdTextColor,
  },
  thirdView: {
    flexDirection: 'row',
    top: 15,
    justifyContent: 'space-between',
  },
  fourthView: {
    height: 25,
    width: 60,
    borderColor: constant.primaryColor,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thirdText: {
    fontSize: 14,
    fontWeight: '500',
    color: constant.blackColor,
  },
  secondText: {
    fontSize: 16,
    fontWeight: '400',
    color: constant.secondaryTextColor,
  },
  container: {
    paddingRight: 20,
  },
});
