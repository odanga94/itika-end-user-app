import {StyleSheet} from 'react-native';

import constant from '../../utils/constant';

const {width, height, heightRatio} = constant.styleGuide;
const iphoneX = height > 811;

const styles = StyleSheet.create({
  problemImageContainer: {
    width: width / 3,
    height: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 5,
  },
  problemImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: constant.primaryTextColor,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    flexDirection: 'row',
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
  price: {
    fontSize: 16,
    fontFamily: 'poppins-bold',
    color: '#505050',
  },
  title: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
  },
  description: {
    fontSize: 14,
    fontFamily: 'poppins-regular',
  },
  imageContainer: {
    width: height / 8,
    height: height / 8,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: constant.primaryTextColor,
    overflow: 'hidden',
    marginVertical: 3,
  },
  proImage: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: height / 4,
  },
  proDetails: {
    flexDirection: 'row',
  },
  proTextContainer: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  paymentTextContainer: {
    borderBottomColor: '#505050',
    borderBottomWidth: 1,
    width: width / 2.5,
    marginBottom: 10,
  },
  mpesaContainer: {
    width: width / 2,
    maxHeight: width / 2,
    //marginTop: 5
  },
  mpesaImage: {
    width: '100%',
    height: '100%',
    //maxHeight: width / 3
  },
  fourthView: {
    flex: iphoneX ? 0.25 : 0.3,
    top: 10,
    marginBottom: 10,
  },
  secondText: {
    left: 20,
    fontSize: 14,
    fontWeight: '500',
    color: constant.thirdTextColor,
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
  fourthText: {
    fontSize: 14,
    left: 10,
    fontWeight: '600',
    paddingTop: 3,
    color: constant.thirdTextColor,
  },
  tickIcon: {
    height: 15,
    width: 15,
    tintColor: constant.commonColor,
  },
});

export default styles;
