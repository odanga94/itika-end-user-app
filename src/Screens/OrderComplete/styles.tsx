import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width, heightRatio, height} = constant.styleGuide;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
    justifyContent: 'center',
  },
  keyBoardView: {
    flex: 1,
    justifyContent: 'center',
  },
  firstView: {
    height: height - 100,
    margin: 20,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 0.2,
    backgroundColor: constant.commonColor,
    shadowColor: constant.cardColor,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 5,
  },
  secondView: {
    flex: 1,
    borderBottomWidth: 0.3,
    borderBottomColor: constant.lightText,
    margin: 30,
    marginBottom: 0,
    alignItems: 'center',
  },
  firstText: {
    paddingTop: 10,
    fontSize: 22,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  secondText: {
    paddingTop: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: constant.highlightTextColor,
  },
  thirdText: {
    paddingTop: 7,
    fontSize: 13,
    fontWeight: '500',
    color: constant.secondaryTextColor,
  },
  thirdView: {
    flex: 3,
    alignItems: 'center',
  },
  fourthText: {
    paddingTop: 20,
    fontSize: 16,
    fontWeight: '400',
  },
  fourthView: {
    marginVertical: 20,
    flexDirection: 'row',
    width: 120,
    height: 30,
    justifyContent: 'space-evenly',
  },
  button: {
    height: 50,
    width: width - 95,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: constant.commonColor,
  },
  secondButton: {
    height: 50,
    width: width - 95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: constant.lightText,
  },
  secondButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: constant.blackColor,
  },
  imgView: {
    height: 85 * heightRatio,
    width: 85 * heightRatio,
    borderRadius: 42.5 * heightRatio,
    borderWidth: 1.5,
    justifyContent: 'center',
    borderColor: constant.primaryColor,
    //marginRight: 10,
    marginTop: 10,
  },
  img: {
    height: 85 * heightRatio,
    width: 85 * heightRatio,
    borderRadius: 42.5 * heightRatio,
    borderWidth: 1.5,
    borderColor: constant.primaryColor,
  },
  textInput: {
    paddingVertical: 2.5,
    marginBottom: 20,
    marginTop: 5,
    width: '80%',
    alignSelf: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
});
