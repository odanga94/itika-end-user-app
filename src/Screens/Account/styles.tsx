import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  commonView: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  secondView: {
    flex: iphoneX ? 0.4 : 0.5,
    flexDirection: 'row',
  },
  thirdView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgView: {
    width: height / 7,
    height: height / 7,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: constant.primaryTextColor,
    overflow: 'hidden',
    alignItems: 'center',
    marginVertical: 3,
    backgroundColor: '#ccc',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  firstText: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 30,
    left: 5,
    color: constant.thirdTextColor,
  },
  secondText: {
    fontSize: 14,
    left: 5,
    fontWeight: '500',
    paddingTop: 35,
    color: constant.thirdTextColor,
  },
  fourthView: {
    flex: 2,
  },
  fifthView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    top: 20,
    left: 20,
    marginRight: 40,
    height: 40,
  },
  commonText: {
    fontSize: 16,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  sixthView: {
    top: 20,
    left: 20,
    marginRight: 40,
    height: 40,
  },
  thirdText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
  icons: {
    height: 10,
    width: 10,
    tintColor: constant.thirdTextColor,
  },
  camIcon: {
    height: 12,
    width: 12,
    // left: 6,
    // top: 6,
  },
});
