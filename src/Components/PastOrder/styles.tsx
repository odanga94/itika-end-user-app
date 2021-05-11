import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width, height, heightRatio} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  firstView: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 5,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    //borderBottomWidth: 1,
  },
  secondView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 14,
    borderRadius: 8,
  },
  img: {
    height: 100,
    width: 100,
  },
  fourthView: {
    //flexDirection: 'row',
    paddingTop: 6,
  },
  fifthView: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  thirdView: {
    flex: 1,
    left: 8,
  },
  mapPin: {
    height: 15,
    width: 15,
  },
  thirdText: {
    fontSize: 14,
    left: 3,
    fontWeight: '500',
    color: '#505050',
  },
  firstText: {
    paddingTop: iphoneX ? 2 : 5,
    fontSize: 17,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  secondText: {
    paddingTop: 2,
    fontSize: 17,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fifthText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
  sixthText: {
    fontSize: 14,
    fontWeight: '500',
    left: 2,
    color: '#505050',
  },
  button: {
    height: 45,
    width: width - 42,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5 * heightRatio,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: constant.commonColor,
  },
});

