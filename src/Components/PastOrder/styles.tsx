import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width, height, heightRatio} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  firstView: {
    flex: 1,
  },
  secondView: {
    height: 50,
    backgroundColor: constant.backColor,
    marginTop: 45,
    width: width - 40,
    left: 20,
    justifyContent: 'center',
  },
  thirdView: {
    flex: 1,
    top: 20,
  },
  firstText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
    left: 20,
  },
  secondText: {
    fontSize: 17,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  thirdText: {
    paddingTop: 2,
    fontSize: 17,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fourthText: {
    fontSize: 12,
    left: 3,
    fontWeight: '500',
    color: '#505050',
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
    color: '#505050',
    marginLeft: 5,
  },
  seventhText: {
    paddingTop: iphoneX ? 10 : 15,
    fontSize: 14,
    fontWeight: '500',
    color: '#505050',
  },
  eighthText: {
    paddingTop: iphoneX ? 10 : 15,
    fontSize: 16,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fourthView: {
    height: 120,
    flexDirection: 'row',
    left: 20,
  },
  fifthView: {
    width: 115,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  sixthView: {
    flexDirection: 'row',
    paddingTop: 6,
  },
  mapIcon: {
    height: 15,
    width: 15,
  },
  seventhView: {
    height: 185,
    left: 20,
  },
  eighthView: {
    height: 50,
    borderBottomWidth: 0.4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    paddingBottom: 2,
    borderBottomColor: '#505050',
  },
  button: {
    height: 45,
    width: width - 42,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5 * heightRatio,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: constant.commonColor,
  },
  priceView: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  nonActiveView: {
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    bottom: 10,
  },
});
