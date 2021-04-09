import {StyleSheet} from 'react-native';

import constant from '../../utils/constant';
const {height, heightRatio} = constant.styleGuide;
const iphoneX = height > 811;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    flex: 1,
  },
  sortView: {
    flex: 1,
    paddingTop: 10,
  },
  secondView: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  commonText: {
    fontSize: 18,
    color: constant.thirdTextColor,
    fontWeight: '500',
  },
  thirdView: {
    flex: 1.3,
  },
  firstText: {
    left: 20,
    fontSize: 14,
    color: constant.secondaryTextColor,
    fontWeight: '500',
  },
  fourthView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: 15 * heightRatio,
    left: 8 * heightRatio,
  },
  fifthView: {
    height: 25 * heightRatio,
    marginLeft: 6 * heightRatio,
    paddingHorizontal: 10,
    backgroundColor: constant.commonColor,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: constant.lightText,
  },
  secondText: {
    fontSize: 14,
    fontWeight: '500',
    color: constant.secondaryTextColor,
  },
  sixthView: {
    flex: iphoneX ? 1.5 : 1,
  },
  activeView: {
    height: 25 * heightRatio,
    marginLeft: 6 * heightRatio,
    paddingHorizontal: 10,
    backgroundColor: constant.commonColor,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: constant.primaryColor,
  },
  activeText: {
    fontSize: 14,
    fontWeight: '500',
    color: constant.primaryColor,
  },
  thirdText: {
    fontSize: 16,
    color: constant.thirdTextColor,
    fontWeight: '500',
  },
  activeThirdText: {
    fontSize: 16,
    color: constant.primaryColor,
    fontWeight: '500',
  },
  seventhView: {
    flex: 2,
  },
  eightView: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: constant.commonColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderColor: constant.secondaryTextColor,
    flexDirection: 'row',
  },
  ninthView: {
    flex: iphoneX ? 1.5 : 1.4,
  },
  fourthText: {
    left: 20,
    fontSize: 14,
    color: constant.secondaryTextColor,
    fontWeight: '500',
  },
  tenthView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 18 * heightRatio,
    marginTop: iphoneX ? 25 : 10,
    marginRight: 22 * heightRatio,
  },
  marker: {
    backgroundColor: constant.primaryColor,
    borderColor: constant.couponBack,
    borderWidth: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  container: {
    alignItems: 'center',
    marginTop: iphoneX ? 30 : 20,
    height: 20,
  },
  select: {
    backgroundColor: constant.primaryColor,
  },
  priceText: {
    fontSize: 16,
    color: constant.thirdTextColor,
    fontWeight: 'bold',
  },
  doneTewxt: {
    fontSize: 18,
    color: constant.primaryColor,
    fontWeight: '500',
  },
  tickIcon: {
    height: 15,
    width: 15,
  },
});
