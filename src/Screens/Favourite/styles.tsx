import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

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
});
