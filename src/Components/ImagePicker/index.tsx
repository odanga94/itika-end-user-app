import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import {ActionSheet} from 'native-base';
import * as ImgPicker from 'expo-image-picker';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {verifyCameraPermissions} from '../../utils';
import constants from '../../utils/constant';
import styles from './styles';

const ImagePicker = (props: any) => {

  const editPictureHandler = async (config: string) => {
    const hasPermissions = await verifyCameraPermissions();
    if (!hasPermissions) {
      return;
    }
    let image;
    if (config === 'launch-camera') {
      image = await ImgPicker.launchCameraAsync({
        allowsEditing: true,
        //aspect: [1, 1],
        quality: 0.8,
      });
    } else {
      image = await ImgPicker.launchImageLibraryAsync({
        allowsEditing: true,
        //aspect: [1, 1],
        quality: 0.8,
      });
    }
    if (image.uri) {
      props.setImage(image.uri);
    }
  };

  const launchCameraActionSheet = () => {
    let buttons = [
      'Take Picture',
      'Choose from Gallery',
      'Delete Photo',
      'Cancel',
    ];
    const DESTRUCTIVE_INDEX = 2;
    const CANCEL_INDEX = 3;
    if (!props.imageUri) {
      buttons = ['Take Picture', 'Choose from Gallery', 'Cancel'];
    }
    const buttonOptions = {
      options: buttons,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      title: 'Edit Image',
    };
    const handleClicked = async (buttonIndexNumber: number) => {
      switch (buttonIndexNumber) {
        case 0:
          editPictureHandler('launch-camera');
          return;
        case 1:
          editPictureHandler('launch-gallery');
          return;
        case 2:
          if (!props.imageUri) {
            return;
          }
          props.setImage(null);
          break;
        default:
          return;
      }
    };
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(buttonOptions, handleClicked);
    } else {
      ActionSheet.show(buttonOptions, handleClicked);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <TouchableOpacity
        style={styles.imagePreview}
        onPress={launchCameraActionSheet}>
        {!props.imageUri ? (
          <MaterialCommunityIcons
            size={30}
            color={constants.primaryTextColor}
            name="image-plus"
          />
        ) : (
          <Image
            style={styles.image}
            source={{uri: props.imageUri}}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;
