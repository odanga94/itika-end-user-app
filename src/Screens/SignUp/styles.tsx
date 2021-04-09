import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width, heightRatio} = constant.styleGuide;

export default StyleSheet.create({
  image: {
    flex: 1,
    width: width,
  },
  firstView: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  dot: {
    marginBottom: 25,
  },
  secondView: {
    flex: 2,
    borderRadius: 15,
    backgroundColor: constant.commonColor,
    marginTop: -12,
  },
  thirdView: {
    flex: 1,
    left: 55,
    paddingTop: 20 * heightRatio,
    backgroundColor: constant.commonColor,
  },
  firstText: {
    fontSize: 28 * heightRatio,
    color: constant.primaryTextColor,
    fontWeight: '500',
  },
  secondText: {
    top: 12,
    color: constant.secondaryTextColor,
    fontSize: 16,
    fontWeight: '500',
  },
  fourthView: {
    height: 45,
    width: width - 110,
    borderRadius: 8,
    backgroundColor: constant.backColor,
    flexDirection: 'row',
    marginTop: 50,
  },
  input: {
    left: 15,
    width: width - 110,
  },
  fifthView: {
    height: 45,
    width: width - 110,
    borderRadius: 8,
    backgroundColor: constant.backColor,
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    height: 50,
    width: width - 110,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  thirdText: {
    color: constant.commonColor,
    fontSize: 18,
    fontWeight: '700',
  },
});
