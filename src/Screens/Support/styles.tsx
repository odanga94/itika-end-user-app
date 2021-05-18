import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width, height} = constant.styleGuide;
const iphoneX = height > 811;

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
  commonView: {
    flex: 1,
  },
  ninthView: {
    flex: 1,
    paddingTop: iphoneX ? 15 : 0,
  },
  chatContainer: {
    paddingHorizontal: 10,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: height / 10,
    alignSelf: 'center',
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
  },
  chatText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
});
