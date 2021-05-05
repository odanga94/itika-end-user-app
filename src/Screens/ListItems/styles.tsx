import {StyleSheet} from 'react-native';

import constants from '../../utils/constant';

const styles = StyleSheet.create({
  secondText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    color: constants.thirdTextColor,
  },
  button: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: constants.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
  },
  thirdText: {
    color: constants.commonColor,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default styles;
