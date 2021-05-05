import {StyleSheet} from 'react-native';

import constants from '../../utils/constant';

const {width} = constants.styleGuide;

const styles = StyleSheet.create({
  imagePicker: {
    marginBottom: 7,
    marginTop: 3,
  },
  imagePreview: {
    width: width / 2,
    height: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default styles;
