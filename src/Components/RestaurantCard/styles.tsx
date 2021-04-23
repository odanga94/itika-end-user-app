import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {heightRatio, height, width} = constant.styleGuide;

export default StyleSheet.create({
  firstView: {
    flex: 1,
  },
  firstText: {
    fontSize: 28,
    color: constant.thirdTextColor,
    fontWeight: '500',
    paddingLeft: 15,
    textAlign: 'center',
  },
  container: {
    paddingRight: 12 * heightRatio,
  },
  secondView: {
    height: height / 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: constant.primaryColor,
  },
  image: {
    height: height / 6,
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
