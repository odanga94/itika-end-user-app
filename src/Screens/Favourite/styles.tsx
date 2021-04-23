import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width} = constant.styleGuide;

export default StyleSheet.create({
  firstView: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstText: {
    left: 20,
    paddingTop: 30,
    fontSize: 18,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  secondView: {
    flex: 1,
    marginTop: 20,
    // top: -3,
    // backgroundColor: 'red',
  },
  button: {
    height: 50,
    width: width - 110,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  thirdText: {
    color: constant.commonColor,
    fontSize: 18,
    fontWeight: '700',
  },
});
