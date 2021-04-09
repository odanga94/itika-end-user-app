import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');
const iPhoneX = height > 811;
const footerHeight = iPhoneX ? 85 : 60;

export default StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    height: footerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  touch: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    top: iPhoneX ? -10 : 0,
  },
  image: {
    height: 20,
  },
  focusedText: {
    color: '#05c2c0',
    top: 5,
    fontSize: 10,
    fontWeight: '700',
  },
  text: {
    color: 'gray',
    top: 5,
    fontSize: 10,
    fontWeight: '700',
  },
});
