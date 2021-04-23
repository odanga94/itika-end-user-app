import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  commonView: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  secondView: {
    flex: iphoneX ? 0.4 : 0.5,
    flexDirection: 'row',
  },
  thirdView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgView: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  firstText: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 30,
    left: 5,
    color: constant.thirdTextColor,
  },
  secondText: {
    fontSize: 14,
    left: 5,
    fontWeight: '500',
    paddingTop: 35,
    color: constant.thirdTextColor,
  },
  fourthView: {
    flex: 2,
  },
  camView: {
    height: 25,
    width: 25,
    backgroundColor: constant.commonColor,
    top: -20,
    left: 50,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fifthView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    top: 20,
    left: 20,
    marginRight: 40,
    height: 40,
  },
  commonText: {
    fontSize: 16,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  sixthView: {
    top: 20,
    left: 20,
    marginRight: 40,
    height: 40,
  },
  thirdText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
  icons: {
    height: 10,
    width: 10,
    tintColor: constant.thirdTextColor,
  },
  camIcon: {
    height: 12,
    width: 12,
    // left: 6,
    // top: 6,
  },
});
