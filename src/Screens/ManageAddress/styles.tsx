import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width} = constant.styleGuide;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    height: 60,
  },
  secondView: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  thirdView: {
    height: 25,
    width: 25,
    borderRadius: 2,
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: constant.lightText,
  },
  img: {
    height: 15,
    width: 15,
    tintColor: constant.primaryColor,
  },
  firstText: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10,
    color: constant.thirdTextColor,
  },
  fourthView: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  secondText: {
    lineHeight: 20,
    fontSize: 13,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fifthView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  sixthView: {
    height: 25,
    width: 70,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: constant.primaryColor,
  },
  seventhView: {
    height: 25,
    width: 70,
    borderWidth: 0.5,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: constant.thirdTextColor,
  },
  thirdText: {
    fontSize: 12,
    fontWeight: '500',
    color: constant.primaryColor,
  },
  fourthText: {
    fontSize: 12,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  eightView: {
    marginTop: 55,
  },
  button: {
    height: 50,
    width: width - 45,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    bottom: 20,
  },
  fifthText: {
    color: constant.commonColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ninthView: {
    paddingTop: 10,
  },
});
