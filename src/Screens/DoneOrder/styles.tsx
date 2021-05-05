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
    height: constant.styleGuide.width / 2,
    width: constant.styleGuide.height / 2,
    /* borderWidth: 1.0,
    borderRadius: constant.styleGuide.width / 4, */
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 80,
    borderColor: constant.primaryTextColor,
  },
  imgIcon: {
    height: '100%',
    width: '100%',
  },
  firstText: {
    bottom: 25,
    fontSize: 18,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
});
