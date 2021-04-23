import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  commonView: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  headerView: {
    height: 50,
  },
  secondView: {
    flex: iphoneX ? 0.4 : 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
  backView: {
    marginLeft: 20,
    marginTop: iphoneX ? 35 : 20,
  },
  thirdView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    top: iphoneX ? 17 : 10,
  },
  firstText: {
    fontSize: 18,
    fontWeight: '500',
    color: constant.thirdTextColor,
    left: -20,
  },
  fourthView: {
    height: 75,
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
  secondText: {
    fontSize: 16,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '400',
    color: constant.secondaryTextColor,
    bottom: 5,
  },
  homeIcon: {
    height: 35,
    width: 35,
    left: 2,
    bottom: 2,
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
    textAlign: 'center',
  },
});
