import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {height, width, heightRatio} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
    padding: 10,
    paddingTop: 0,
  },
  screen: {
    width: '100%',
    justifyContent: 'center',
  },
  firstView: {
    flex: iphoneX ? 0.1 : 0.2,
    flexDirection: 'row',
  },
  secondView: {
    justifyContent: 'center',
    width: 40,
    marginLeft: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
  thirdView: {
    justifyContent: 'center',
    flex: 1,
    left: -10,
  },
  firstText: {
    textAlign: 'center',
    fontSize: 18,
    left: -10,
    fontWeight: '700',
    color: constant.thirdTextColor,
  },
  fourthView: {
    // flex: iphoneX ? 0.25 : 0.3,
    marginBottom: 10,
  },
  secondText: {
    fontSize: 14,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderTopColor: '#ccc',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    fontFamily: 'poppins-regular',
    marginTop: 3,
    //marginBottom: 15,
  },
  fifthView: {
    paddingVertical: 5,
    backgroundColor: constant.paymentBackGround,
    left: 20,
    marginTop: 8 * heightRatio,
    marginRight: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: constant.primaryTextColor,
    flexDirection: 'row',
  },
  thirdText: {
    paddingTop: 9 * heightRatio,
    left: 10,
    fontSize: 14,
    fontWeight: '500',
    color: constant.primaryTextColor,
  },
  fourthText: {
    fontSize: 14,
    left: 10,
    fontWeight: '600',
    paddingTop: 3,
    color: constant.thirdTextColor,
  },
  sixthView: {
    flex: 0.8,
  },
  seventhView: {
    justifyContent: 'center',
    flex: 0.2,
    alignItems: 'center',
  },
  eighthView: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: constant.primaryTextColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickIcon: {
    height: 15,
    width: 15,
    tintColor: constant.commonColor,
  },
  ninthView: {
    height: 60,
    backgroundColor: constant.paymentBackGround,
    left: 20,
    marginRight: 40,
    marginTop: iphoneX ? 15 : 20,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: constant.primaryColor,
    flexDirection: 'row',
  },
  activeNinthView: {
    height: 60,
    backgroundColor: constant.paymentBackGround,
    left: 20,
    marginRight: 40,
    marginTop: iphoneX ? 15 : 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  tenthView: {
    flex: 1,
    top: 18,
  },
  fifthText: {
    fontSize: 14,
    left: 20,
    fontWeight: '500',
    color: constant.thirdTextColor,
    marginBottom: 20,
  },
  eleventhView: {
    flex: 0.8,
    alignItems: 'center',
    left: 15,
    flexDirection: 'row',
  },
  sixthText: {
    paddingLeft: 10,
    color: constant.thirdTextColor,
    fontSize: 14,
    fontWeight: '700',
  },
  twelvethView: {
    flex: 0.2,
    justifyContent: 'center',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //top: iphoneX ? 40 : 0,
    paddingVertical: 15,
    backgroundColor: '#f3f3f3',
  },
  button: {
    height: 50,
    width: width - 40,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: constant.commonColor,
  },
  thirthteenthView: {
    height: height / 10,
  },
  cardIcon: {
    height: 30,
    width: 30,
  },
  image: {
    width: '100%',
    height: height / 4,
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  datePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePrice: {
    fontSize: 16,
    color: '#888',
    //textAlign: 'center',
    fontFamily: 'poppins-bold',
  },
});
