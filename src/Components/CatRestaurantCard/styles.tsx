import {StyleSheet, Platform} from 'react-native';
import constant from '../../utils/constant';

export default StyleSheet.create({
  firstView: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  secondView: {
    left: 20,
    height: 125,
    marginRight: 40,
    backgroundColor: constant.commonColor,
    marginTop: 5,
    borderRadius: 5,
    shadowColor: constant.cardColor,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 3,
    marginBottom: 15,
    flexDirection: 'row',
  },
  thirdView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 100,
  },
  fourthView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 15 : 10,
  },
  firstText: {
    fontSize: 17,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fifthView: {
    flexDirection: 'row',
    paddingTop: 5,
    left: -1,
  },
  mapPin: {
    height: 15,
    width: 15,
  },
  secondText: {
    fontSize: 12,
    left: 2,
    fontWeight: '500',
    color: constant.lightText,
  },
  sixthView: {
    paddingTop: Platform.OS === 'ios' ? 20 : 18,
    flexDirection: 'row',
  },
  thirdText: {
    fontSize: 12,
    fontWeight: '400',
    color: constant.blackColor,
    paddingLeft: 5,
  },
  fourthText: {
    fontSize: 12,
    fontWeight: '400',
    color: constant.lightText,
    left: 2,
  },
  seventhView: {
    height: 18,
    width: 80,
    backgroundColor: constant.primaryColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
  },
  fifthText: {
    fontSize: 10,
    color: constant.commonColor,
    fontWeight: '400',
  },
  starIcon: {
    height: 12,
    width: 12,
  },
});
