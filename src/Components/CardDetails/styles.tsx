import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {heightRatio, height, widthRatio} = constant.styleGuide;
const iphoneX = height > 811;

export default StyleSheet.create({
  firstView: {
    flex: 1,
    top: 20,
    paddingLeft: 15,
  },
  image: {
    height: iphoneX ? 200 * heightRatio : 175 * heightRatio,
    width: iphoneX ? 185 : 155 * widthRatio,
    borderRadius: 5,
  },
  firstText: {
    marginTop: 20,
    fontSize: 14 * heightRatio,
    color: constant.thirdTextColor,
    fontWeight: '500',
  },
  secondText: {
    top: 8,
    fontSize: 10 * heightRatio,
    color: constant.secondaryTextColor,
  },
  secondView: {
    flexDirection: 'row',
    top: 20,
  },
  thirdText: {
    marginRight: 5,
    fontSize: 8 * heightRatio,
    fontWeight: '400',
    color: constant.blackColor,
    left: 8 * heightRatio,
    top: 2,
  },
  fourthText: {
    color: constant.secondaryTextColor,
    fontSize: 8 * heightRatio,
    fontWeight: '400',
    left: iphoneX ? 10 : 8 * heightRatio,
    top: 2,
  },
  thirdView: {
    height: 18,
    width: iphoneX ? 50 * heightRatio : 60 * heightRatio,
    backgroundColor: constant.primaryColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    left: iphoneX ? 16 : 15 * heightRatio,
  },
  fifthText: {
    fontSize: iphoneX ? 6 * heightRatio : 7 * heightRatio,
    color: constant.commonColor,
    fontWeight: '500',
  },
  starIcon: {
    height: 8 * heightRatio,
    width: 8 * widthRatio,
    top: 2,
  },
});
