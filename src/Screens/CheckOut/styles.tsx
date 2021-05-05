import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height, width, heightRatio} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  screen: {
    width: '100%',
    justifyContent: 'center',
  },
  firstView: {
    flex: iphoneX ? 0.1 : 0.2,
    flexDirection: 'row',
  },
  secondView: {
    justifyContent: 'center',
    width: 40,
    marginLeft: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
  thirdView: {
    justifyContent: 'center',
    flex: 1,
    left: -10,
  },
  firstText: {
    textAlign: 'center',
    fontSize: 18,
    left: -10,
    fontWeight: '700',
    color: constant.thirdTextColor,
  },
  fourthView: {
    flex: iphoneX ? 0.25 : 0.3,
    top: 20,
  },
  secondText: {
    left: 20,
    fontSize: 14,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fifthView: {
    height: 60,
    backgroundColor: constant.paymentBackGround,
    left: 20,
    marginTop: 15 * heightRatio,
    marginRight: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: constant.primaryColor,
    flexDirection: 'row',
  },
  thirdText: {
    paddingTop: 9 * heightRatio,
    left: 10,
    fontSize: 14,
    fontWeight: '500',
    color: constant.primaryColor,
  },
  fourthText: {
    fontSize: 14,
    left: 10,
    fontWeight: '600',
    paddingTop: 3,
    color: constant.thirdTextColor,
  },
  sixthView: {
    flex: 0.8,
  },
  seventhView: {
    justifyContent: 'center',
    flex: 0.2,
    alignItems: 'center',
  },
  eighthView: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: constant.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickIcon: {
    height: 15,
    width: 15,
    tintColor: constant.commonColor,
  },
  ninthView: {
    height: 60,
    backgroundColor: constant.paymentBackGround,
    left: 20,
    marginRight: 40,
    marginTop: iphoneX ? 15 : 20,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: constant.primaryColor,
    flexDirection: 'row',
  },
  activeNinthView: {
    height: 60,
    backgroundColor: constant.paymentBackGround,
    left: 20,
    marginRight: 40,
    marginTop: iphoneX ? 15 : 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  tenthView: {
    flex: 1,
    top: 18,
  },
  fifthText: {
    fontSize: 14,
    left: 20,
    fontWeight: '500',
    color: constant.thirdTextColor,
    marginBottom: 20,
  },
  eleventhView: {
    flex: 0.8,
    alignItems: 'center',
    left: 15,
    flexDirection: 'row',
  },
  sixthText: {
    paddingLeft: 10,
    color: constant.thirdTextColor,
    fontSize: 14,
    fontWeight: '700',
  },
  twelvethView: {
    flex: 0.2,
    justifyContent: 'center',
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    top: iphoneX ? 40 : 0,
    paddingBottom: 10,
  },
  button: {
    height: 50,
    width: width - 40,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: constant.commonColor,
  },
  thirthteenthView: {
    flex: 0.2,
  },
  cardIcon: {
    height: 30,
    width: 30,
  },
});
