import {StyleSheet} from 'react-native';
import constant from '../../utils/constant';

const {width, height, heightRatio} = constant.styleGuide;

const iphoneX = height > 811;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  firstView: {
    flex: iphoneX ? 0.4 : 0.5,
  },
  headerView: {
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: '#505050',
  },
  secondView: {
    flex: 1,
  },
  imgView: {
    width: height / 6,
    height: height / 6,
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
  thirdView: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 18,
    backgroundColor: constant.backColor,
    borderRadius: 5,
    justifyContent: 'center',
  },
  textInput: {
    width: width - 80,
    left: 20,
    fontSize: 14,
    fontWeight: '500',
    color: constant.thirdTextColor,
  },
  profileView: {
    //height: 100 * heightRatio,
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: 'center',
  },
  pic: {
    height: 50,
    width: 50,
  },
  firstText: {
    padding: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: constant.thirdTextColor,
  },
  button: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    backgroundColor: constant.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: constant.commonColor,
  },
  errorText: {
    fontFamily: 'poppins-regular',
    color: 'red',
    fontSize: 14,
  },
});
