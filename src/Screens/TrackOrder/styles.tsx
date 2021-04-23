import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {heightRatio, height} = constant.styleGuide;
const iphoneX = height > 811;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    height: 50,
  },
  secondView: {
    height: 50,
    width: 50,
    backgroundColor: constant.primaryColor,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 15,
    width: 15,
  },
  thirdView: {
    flex: 0.5,
  },
  fourthView: {
    height: 50,
    left: 30,
    marginRight: 60,
    justifyContent: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: constant.lightText,
  },
  firstText: {
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 5,
    color: constant.thirdTextColor,
  },
  fifthView: {
    left: 30,
    top: 10,
  },
  secondText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
  thirdText: {
    paddingTop: 3,
    fontSize: 12,
    fontWeight: '500',
    color: '#505050',
  },
  sixthView: {
    paddingTop: 40,
    left: 30,
  },
  seventhView: {
    flexDirection: 'row',
    height: 80,
  },
  eighthView: {
    flex: 0.8,
  },
  fourthText: {
    fontSize: 14,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fifthText: {
    fontSize: 12,
    fontWeight: '500',
    paddingTop: 5,
    color: '#505050',
  },
  driverImg: {
    height: 40,
    width: 40,
    borderRadius: 30,
    left: iphoneX ? 45 * heightRatio : 65,
  },
  mapEdge: {
    top: 100 * heightRatio,
    right: 100 * heightRatio,
    bottom: 100 * heightRatio,
    left: 100 * heightRatio,
  },
});
