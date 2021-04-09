import {StyleSheet} from 'react-native';

import constant from '../../utils/constant';

export default StyleSheet.create({
  firstView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constant.commonColor,
  },
  secondView: {
    height: 120,
    width: 120,
    borderWidth: 1.0,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 80,
    borderColor: constant.primaryColor,
  },
  imgIcon: {
    height: 60,
    width: 60,
  },
  firstText: {
    bottom: 25,
    fontSize: 16,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
});
