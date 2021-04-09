import {StyleSheet} from 'react-native';

import constant from '../../utils/constant';

const {height, width, heightRatio} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  commonView: {
    flex: 1,
  },
  thirdView: {
    height: 260,
    marginTop: iphoneX ? 20 * heightRatio : 0,
  },
  secondView: {
    flex: 0.3,
    top: iphoneX ? 20 : 0,
  },
  fourthView: {
    flex: 0.2,
    left: 20,
    top: iphoneX ? 10 : 15,
    borderBottomWidth: 0.3,
    marginRight: 50,
    borderBottomColor: constant.secondaryTextColor,
  },
  firstText: {
    fontSize: 16,
    fontWeight: '400',
    top: 10,
    color: constant.thirdTextColor,
  },
  fifthView: {
    flex: iphoneX ? 0.4 : 0.5,
    top: iphoneX ? 30 : 35,
  },
  commonText: {
    top: 2,
    fontSize: 13,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  secondText: {
    right: 10,
    fontSize: 13,
    fontWeight: '300',
    color: constant.thirdTextColor,
  },
  sixthView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
    left: 20,
  },
  seventhView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    marginRight: 50,
    left: 20,
  },
  eighthView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: constant.secondaryTextColor,
    height: 65,
    marginRight: 50,
    left: 20,
  },
  thirdText: {
    right: 5,
    fontSize: 14,
    fontWeight: '400',
    color: constant.thirdTextColor,
  },
  ninthView: {
    top: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    borderBottomWidth: 0.3,
    borderBottomColor: constant.secondaryTextColor,
  },
  fourthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: constant.payColor,
    left: 20,
  },
  fifthText: {
    fontSize: 14,
    fontWeight: 'bold',
    top: 4,
    color: constant.payColor,
    right: 30,
  },
  thirthteenView: {
    borderRadius: 3,
    height: 28,
    width: 28,
    borderWidth: 0.2,
    borderColor: constant.secondaryTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: constant.primaryColor,
  },
  tenthView: {
    flex: 0.5,
    backgroundColor: constant.commonColor,
  },
  eleventhView: {
    flex: 0.3,
    flexDirection: 'row',
    left: 20,
    justifyContent: 'space-between',
    top: 10,
  },
  sixteenthView: {
    flex: 1,
    top: iphoneX ? 0 : 10,
  },
  twelvethView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeIcon: {
    height: 35,
    width: 35,
    left: 2,
    bottom: 2,
  },
  sixthText: {
    left: 10,
    fontSize: 14,
    fontWeight: '400',
    color: constant.blackColor,
  },
  fourthteenView: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    right: 40,
  },
  fifthteenView: {
    height: 25,
    width: 65,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: constant.primaryColor,
  },
  seventhText: {
    fontSize: 12,
    fontWeight: '400',
    color: constant.primaryColor,
  },
  seventeenView: {
    top: iphoneX ? 15 : 5,
    left: 20,
  },
  eightText: {
    fontSize: 12,
    paddingTop: 3,
    fontWeight: '400',
    color: constant.blackColor,
  },
  buttonView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: iphoneX ? 35 : 45,
  },
  button: {
    height: 50,
    width: width - 30,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: iphoneX ? 20 : 0,
    marginBottom: iphoneX ? 0 : 35 * heightRatio,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: constant.commonColor,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    height: 100,
    width: 100,
    bottom: 80,
  },
  emptyTextFirst: {
    bottom: 30,
    fontSize: 16,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  emptyTextSecond: {
    bottom: 20,
    fontSize: 16,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
});
