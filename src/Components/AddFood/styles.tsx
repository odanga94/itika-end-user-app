import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

export default StyleSheet.create({
  firstView: {
    height: 30,
    width: 60,
    flexDirection: 'row',
    backgroundColor: constant.commonColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: constant.lightText,
  },
  firstText: {
    fontSize: 18,
    right: 8,
    color: constant.primaryColor,
  },
  secondText: {
    fontSize: 18,
    color: constant.primaryColor,
  },
  thirdText: {
    fontSize: 22,
    left: 8,
    color: constant.primaryColor,
  },
});
