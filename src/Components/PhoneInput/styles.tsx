import {StyleSheet, Platform} from 'react-native';
import constant from '../../utils/constant';

const {width, heightRatio} = constant.styleGuide;

export default StyleSheet.create({
  firstView: {
    height: 45,
    width: width - 110,
    left: 30,
    borderRadius: 5,
    backgroundColor: constant.backColor,
    flexDirection: 'row',
    marginTop: 5,
  },
  thirdView: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    paddingRight: 12,
    alignItems: 'center',
    borderRightWidth: 0.3,
    borderRightColor: 'grey',
  },
  icon: {
    height: 10,
    width: 10,
    left: 5,
  },
  fourthView: {
    flex: 2,
    justifyContent: 'center',
  },
  textInput: {
    paddingLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: constant.thirdTextColor,
    paddingRight: 5,
  },
  secondView: {
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  callingCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
});
