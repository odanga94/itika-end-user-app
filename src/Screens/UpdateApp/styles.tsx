import {StyleSheet} from 'react-native';

import constant from '../../utils/constant';

const {width} = constant.styleGuide;

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
    textAlign: 'center',
  },
  button: {
    height: 50,
    width: width - 110,
    backgroundColor: constant.primaryTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    //left: 20
  },
  thirdText: {
    color: constant.commonColor,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 5,
  },
  fifthView: {
    borderRadius: 8,
    marginTop: 10,
    flex: 0.15,
    alignItems: 'center',
  },
});
