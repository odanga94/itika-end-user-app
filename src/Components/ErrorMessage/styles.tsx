import {StyleSheet} from 'react-native';

import constant from '../../utils/constant';

const {width} = constant.styleGuide;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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

export default styles;
