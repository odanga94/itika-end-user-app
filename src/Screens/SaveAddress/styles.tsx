import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height} = constant.styleGuide;
const iphoneX = height > 811;

export default StyleSheet.create({
  view: {
    flex: 1,
  },
  mapView: {
    flex: 3,
  },
  firstIcon: {
    width: 50,
    height: 50,
  },
  icon: {
    height: 20,
    width: 20,
  },
  firstView: {
    height: 30,
    width: 70,
    backgroundColor: constant.commonColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: constant.primaryColor,
    left: 20,
    bottom: 5,
  },
  backIcon: {
    height: 20,
    width: 20,
    top: iphoneX ? 50 : 40,
    left: 20,
  },
  secondView: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  thirdView: {
    top: 20,
    left: 40,
  },
  firstText: {
    fontSize: 18,
    color: constant.thirdTextColor,
    fontWeight: '500',
  },
  fourthView: {
    flexDirection: 'row',
    top: 20,
  },
  secondText: {
    left: 5,
    fontSize: 16,
    fontWeight: '500',
    color: constant.secondaryTextColor,
  },
  button: {
    height: 50,
    width: 330,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50,
  },
  thirdText: {
    fontSize: 14,
    color: constant.primaryColor,
    fontWeight: '400',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    color: constant.commonColor,
  },
});
