import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

export default StyleSheet.create({
  firstView: {
    flex: 1,
    flexDirection: 'row',
  },
  secondView: {
    justifyContent: 'center',
  },
  backIcon: {
    height: 20,
    width: 20,
    marginLeft: 20,
  },
  firstText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
    left: -20,
  },
  thirdView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
