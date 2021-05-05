import {StyleSheet} from 'react-native';

import constants from '../../utils/constant';

const {width} = constants.styleGuide;

const styles = StyleSheet.create({
  searchBarCard: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    margin: 5,
    width: '95%',
  },
  selectedLocationContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  suggestionContainer: {
    marginHorizontal: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  selectedLocation: {
    color: constants.primaryTextColor,
    fontFamily: 'poppins-bold',
    marginLeft: 5,
  },
  suggestion: {
    fontFamily: 'poppins-regular',
  },
  button: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: constants.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
  },
  thirdText: {
    color: constants.commonColor,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default styles;
