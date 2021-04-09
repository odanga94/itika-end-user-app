import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: constant.commonColor,
  },
  firstView: {
    marginTop: 230,
  },
  button: {
    height: 40,
    width: 240,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    bottom: 20,
    marginTop: 50,
  },
  firstText: {
    color: constant.thirdTextColor,
    fontSize: 14,
    fontWeight: '500',
  },
  secondText: {
    color: constant.commonColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondButton: {
    height: 40,
    width: 240,
    backgroundColor: constant.backColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    bottom: 20,
    marginTop: 15,
  },
  thirdText: {
    color: constant.thirdTextColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
