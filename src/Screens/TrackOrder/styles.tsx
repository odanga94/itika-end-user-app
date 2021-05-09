import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {heightRatio, height, width} = constant.styleGuide;
const iphoneX = height > 811;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    height: 50,
  },
  secondView: {
    height: 50,
    width: 50,
    backgroundColor: constant.primaryColor,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 15,
    width: 15,
  },
  thirdView: {
    flex: 0.66,
  },
  imgView: {
    height: 50 * heightRatio,
    width: 50 * heightRatio,
    borderRadius: 42.5 * heightRatio,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: constant.primaryColor,
    marginRight: 10,
  },
  img: {
    height: 50 * heightRatio,
    width: 50 * heightRatio,
    borderRadius: 42.5 * heightRatio,
    borderWidth: 1.5,
    borderColor: constant.primaryColor,
  },
  fourthView: {
    height: 50,
    left: 30,
    marginRight: 60,
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: constant.lightText,
    flexDirection: 'row',
  },
  firstText: {
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 5,
    color: constant.thirdTextColor,
  },
  fifthView: {
    left: 30,
    marginRight: 60,
    marginVertical: 5,
    flexDirection: 'row',
    borderBottomColor: constant.lightText,
    borderBottomWidth: 0.4,
    paddingBottom: 2.5,
  },
  secondText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
  thirdText: {
    paddingTop: 3,
    fontSize: 12,
    fontWeight: '500',
    color: '#505050',
  },
  sixthView: {
    paddingTop: 10,
    left: 30,
  },
  seventhView: {
    flexDirection: 'row',
    height: 80,
  },
  eighthView: {
    flex: 0.8,
    justifyContent: 'center'
  },
  fourthText: {
    fontSize: 14,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  fifthText: {
    fontSize: 12,
    fontWeight: '500',
    //paddingTop: 5,
    color: '#505050',
  },
  driverImg: {
    height: 40,
    width: 40,
    borderRadius: 30,
    left: iphoneX ? 45 * heightRatio : 65,
  },
  mapEdge: {
    top: 100 * heightRatio,
    right: 100 * heightRatio,
    bottom: 100 * heightRatio,
    left: 100 * heightRatio,
  },
  markerView: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    paddingTop: iphoneX ? 2 : 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: constant.primaryTextColor,
  },
  callContainer: {
    backgroundColor: constant.primaryTextColor,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    borderColor: constant.primaryTextColor,
    paddingHorizontal: 5,
    alignItems: 'center',
    height: 40,
    paddingVertical: 5,
  },
});
