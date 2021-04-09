import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height, width, heightRatio} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  commonView: {
    flex: 1,
  },
  secondView: {
    height: 60,
  },
  eighthView: {
    left: 20,
    height: 50,
    borderBottomWidth: 0.4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    paddingBottom: 2,
    borderBottomColor: constant.lightText,
  },
  seventhText: {
    paddingTop: iphoneX ? 10 : 15,
    fontSize: 16,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  eightText: {
    fontSize: 14,
    fontWeight: '500',
    color: constant.lightText,
  },
  button: {
    height: 45,
    width: width - 42,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    top: 10 * heightRatio,
    left: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: constant.commonColor,
  },
  ninthView: {
    flex: 1,
    paddingTop: iphoneX ? 15 : 0,
  },
  nonActiveView: {
    left: 20,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    bottom: 10,
  },
});
