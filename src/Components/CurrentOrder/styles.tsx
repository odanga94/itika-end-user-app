import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  firstView: {
    flex: iphoneX ? 0.8 : 1,
    flexDirection: 'row',
  },
  secondView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 14,
  },
  img: {
    height: 100,
    width: 100,
  },
  fourthView: {
    flexDirection: 'row',
    paddingTop: 6,
  },
  fifthView: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  thirdView: {
    flex: 1,
    left: 8,
  },
  mapPin: {
    height: 15,
    width: 15,
  },
  thirdText: {
    fontSize: 12,
    left: 3,
    fontWeight: '500',
    color: constant.lightText,
  },
  firstText: {
    paddingTop: iphoneX ? 2 : 5,
    fontSize: 17,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  secondText: {
    paddingTop: 2,
    fontSize: 17,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fifthText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
  sixthText: {
    fontSize: 13,
    fontWeight: '500',
    left: 2,
    color: constant.lightText,
  },
});
