import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width, heightRatio} = constant.styleGuide;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    height: 50,
  },
  commonView: {
    flex: 1,
  },
  secondView: {
    marginTop: 20 * heightRatio,
    marginLeft: 40,
  },
  thirdView: {
    height: 25,
    width: 60,
    borderWidth: 0.5,
    marginTop: 15 * heightRatio,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  firstText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
  secondText: {
    fontSize: 12,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fourthView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: width - 70,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    bottom: 20,
  },
  thirdText: {
    color: constant.commonColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
