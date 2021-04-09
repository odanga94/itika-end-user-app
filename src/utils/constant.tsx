import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const constant = {
  primaryColor: '#c03626',
  primaryTextColor: '#f9a11b',
  thirdTextColor: '#293565',
  secondaryTextColor: '#9b9a9f',
  backColor: '#edeef2',
  commonColor: '#FFF',
  blackColor: '#000',
  couponBack: '#f8f8fa',
  payColor: '#283464',
  paymentBackGround: '#f6f8fb',
  cardColor: '#D3D3D3',
  lightText: '#c4c6ce',
  catFirst: '#fe8d00',
  catSecond: '#59c8fb',
  catThird: '#ff2954',
  catFifth: '#5653D7',
  codeColor: '#cdcfd5',
  loc: '#959ab1',
  styleGuide: {
    height: height,
    width: width,
    heightRatio: height / 667,
    widthRatio: width / 375,
  },
};

export default constant;
