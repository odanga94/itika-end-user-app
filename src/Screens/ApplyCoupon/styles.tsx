import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width, height} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    flex: iphoneX ? 0.4 : 0.5,
  },
  secondView: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  thirdView: {
    justifyContent: 'center',
  },
  backIcon: {
    height: 20,
    width: 20,
  },
  fourthView: {
    justifyContent: 'center',
    flex: 1,
  },
  firstText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fifthView: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
  sixthView: {
    height: 50,
    width: width - 40,
    borderRadius: 5,
    backgroundColor: constant.backColor,
    flexDirection: 'row',
    marginTop: 5,
  },
  textInput: {
    left: 20,
    flex: 1,
    marginRight: 40,
    fontSize: 14,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    top: iphoneX ? 22 : 25,
    marginBottom: 70,
  },
  flatListView: {
    flex: 1,
  },
  seventhView: {
    left: 22,
    flex: 1,
    marginRight: 42,
  },
  eighthView: {
    paddingBottom: 50,
    borderBottomWidth: 0.4,
    borderBottomColor: constant.secondaryTextColor,
  },
  secondText: {
    paddingTop: 25,
    fontSize: 15,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  thirdText: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: constant.secondaryTextColor,
  },
  fourthText: {
    paddingTop: 2,
    fontSize: 14,
    fontWeight: '500',
    color: constant.secondaryTextColor,
  },
  ninthView: {
    height: 35,
    width: 110,
    borderWidth: 0.5,
    borderColor: constant.primaryColor,
    borderRadius: 5,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constant.couponBack,
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
});
