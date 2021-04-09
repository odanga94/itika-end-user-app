import {StyleSheet, Platform} from 'react-native';
import constant from '../../utils/constant';

const {height, heightRatio} = constant.styleGuide;
const iphoneX = height > 811;

export default StyleSheet.create({
  firstView: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  secondView: {
    height: iphoneX ? 30 * heightRatio : 50 * heightRatio,
    borderBottomWidth: 0.4,
    borderBottomColor: constant.secondaryTextColor,
  },
  firstText: {
    left: 20,
    fontSize: 18,
    fontWeight: '700',
    color: constant.thirdTextColor,
    top: iphoneX ? 5 : 18,
  },
  thirdView: {
    flex: 1,
  },
  fourthView: {
    height: 85,
    borderBottomWidth: 0.4,
    borderBottomColor: constant.secondaryTextColor,
    left: 20,
    marginRight: 40,
    justifyContent: 'center',
  },
  fifthView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sixthView: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: constant.primaryColor,
  },
  secondText: {
    fontSize: 18,
    fontWeight: '400',
    color: constant.thirdTextColor,
  },
  thirdText: {
    fontSize: 28,
    fontWeight: '300',
    color: constant.primaryColor,
    bottom: Platform.OS === 'ios' ? 4 : 2,
  },
  fourthText: {
    fontSize: 16,
    fontWeight: '400',
    color: constant.secondaryTextColor,
  },
  seventhView: {
    height: 100,
    backgroundColor: constant.commonColor,
  },
  eightView: {
    height: 50,
    backgroundColor: constant.primaryColor,
    top: 20,
    left: 20,
    marginRight: 40,
    borderRadius: 5,
    flexDirection: 'row',
  },
  ninthView: {
    flex: 1,
  },
  fifthText: {
    left: 15,
    top: 8,
    fontSize: 12,
    fontWeight: '700',
    color: constant.commonColor,
  },
  sixthText: {
    left: 15,
    top: 12,
    fontSize: 10,
    fontWeight: '500',
    color: constant.commonColor,
  },
  tenthView: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  eleventhView: {
    height: 30,
    width: 100,
    top: 10,
    left: 20,
    borderRadius: 5,
    borderWidth: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: constant.commonColor,
  },
  seventhText: {
    fontSize: 16,
    fontWeight: '600',
    color: constant.commonColor,
  },
});
