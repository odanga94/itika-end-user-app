import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height, width, heightRatio} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  commonView: {
    flex: 1,
  },
  secondView: {
    height: 60,
  },
  eighthView: {
    left: 20,
    height: 50,
    borderBottomWidth: 0.4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    paddingBottom: 2,
    borderBottomColor: '#505050',
  },
  seventhText: {
    paddingTop: iphoneX ? 10 : 15,
    fontSize: 16,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  eightText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#505050',
  },
  button: {
    height: 45,
    width: width - 42,
    backgroundColor: constant.primaryTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    //top: 10 * heightRatio,
    left: 20,
    marginVertical: 10 * heightRatio,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: constant.commonColor,
  },
  ninthView: {
    flex: 1,
    paddingTop: iphoneX ? 15 : 0,
  },
  nonActiveView: {
    left: 20,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    bottom: 10,
  },
  pastView: {
    height: 50,
    backgroundColor: constant.backColor,
    marginTop: 15,
    width: width - 40,
    left: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  firstText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
  buttonYellow: {
    height: 50,
    width: '100%',
    backgroundColor: constant.primaryTextColor,
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
  orderContainer: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: width - 42,
    left: 20,
  },
});
