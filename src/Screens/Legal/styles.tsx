import {StyleSheet} from 'react-native';

import constant from '../../utils/constant';

const {height, width, heightRatio} = constant.styleGuide;
const iphoneX = height > 811;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.commonColor,
  },
  commonView: {
    flex: 1,
  },
  ninthView: {
    flex: 1,
    paddingTop: iphoneX ? 15 : 0,
  },
  firstText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: constant.primaryTextColor,
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
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: constant.commonColor,
  },
  chatContainer: {
    paddingHorizontal: 10,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: height / 10,
    alignSelf: 'center',
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
});

export default styles;
