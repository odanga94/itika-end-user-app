import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height, heightRatio} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  firstView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: iphoneX ? 12 * heightRatio : 15 * heightRatio,
    paddingRight: 12 * heightRatio,
  },
  commonView: {
    paddingLeft: 12 * heightRatio,
  },
  secondView: {
    backgroundColor: constant.catFirst,
    height: 85,
    width: 90,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 45,
    width: 45,
  },
  text: {
    top: iphoneX ? 10 * heightRatio : 15 * heightRatio,
    fontSize: 14,
    color: constant.thirdTextColor,
    fontWeight: '500',
  },
  firstText: {
    top: iphoneX ? 15 * heightRatio : 22 * heightRatio,
    fontSize: 14,
    color: constant.secondaryTextColor,
  },
  thirdView: {
    backgroundColor: constant.catSecond,
    height: 85,
    width: 90,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fourthView: {
    backgroundColor: constant.catThird,
    height: 85,
    width: 90,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fifthView: {
    backgroundColor: constant.catFifth,
    height: 85,
    width: 90,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
