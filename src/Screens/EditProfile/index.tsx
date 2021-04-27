/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useReducer, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActionSheet} from 'native-base';
import * as ImgPicker from 'expo-image-picker';

import {AccountStackParamList} from '../TabNavigation';
import Button from '../../Components/Button';
import Spinner from '../../Components/UI/Spinner';
import constant from '../../utils/constant';
import styles from './styles';
import * as profileActions from '../../store/actions/user/profile';

interface Props {
  navigation: StackNavigationProp<AccountStackParamList>;
}

const pic = require('../../../assets/profile.png');

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state: any, action: any) => {
  if (action.type === FORM_INPUT_UPDATE) {
    let updatedFormIsValid = true;
    const updatedValues = {
      ...state.inputValues,
      [action.inputLabel]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.inputLabel]: action.isValid,
    };
    for (let key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProfile: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const userProfile = useSelector((state: any) => state.profile);
  const userId = useSelector((state: any) => state.auth.userId);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstName: '',
      lastName: '',
      /* phone: '',
      email: '', */
    },
    inputValidities: {
      firstName: false,
      lastName: false,
      /* phone: false,
      email: false, */
    },
    formIsValid: false,
  });

  const [editProfileLoading, setEditProfileLoading] = useState(false);
  const [pickedImage, setPickedImage] = useState();

  useEffect(() => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: userProfile ? userProfile.firstName : '',
      isValid: true,
      inputLabel: 'firstName',
    });
    /* dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: userProfile ? userProfile.phone : '',
      isValid: true,
      inputLabel: 'phone',
    }); */
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: userProfile ? userProfile.lastName : '',
      isValid: true,
      inputLabel: 'lastName',
    });
    /*  dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: userProfile ? userProfile.email : '',
      isValid: true,
      inputLabel: 'email',
    }); */
  }, [userProfile]);

  const inputChangeHandler = useCallback(
    (inputLabel, value, validity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value,
        isValid: validity,
        inputLabel,
      });
    },
    [dispatchFormState],
  );

  const editProfileHandler = async () => {
    //console.log(formState.formIsValid, formState.inputValues);
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    setEditProfileLoading(true);
    try {
      let userData: {
        firstName: string;
        lastName: string;
        imageUri: string | undefined;
      } = {
        firstName: formState.inputValues.firstName,
        lastName: formState.inputValues.lastName,
        imageUri: '',
      };
      if (pickedImage) {
        userData.imageUri = pickedImage;
      }
      await dispatch(profileActions.editProfile(userId, userData));
      navigation.navigate('MyAccount');
    } catch (err) {
      Alert.alert('Something went wrong.', err.message, [{text: 'Okay'}]);
    }
    setEditProfileLoading(false);
  };

  const launchCameraActionSheet = () => {
    let buttons = [
      'Take Picture',
      'Choose from Gallery',
      'Delete Profile Picture',
      'Cancel',
    ];
    const DESTRUCTIVE_INDEX = 2;
    const CANCEL_INDEX = 3;
    if (!userProfile.imageUri) {
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
          if (!userProfile.imageUri) {
            return;
          }
          try {
            await dispatch(
              profileActions.deleteProfilePic(userId, userProfile.imageUri),
            );
            setPickedImage(undefined);
          } catch (err) {
            Alert.alert('An error occurred!', err.message, [{text: 'Okay'}]);
          }
          return;
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

  const verifyPermissions = async () => {
    const cameraResult = await ImgPicker.requestCameraPermissionsAsync();
    const mediaLibResult = await ImgPicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraResult.status !== 'granted' ||
      mediaLibResult.status !== 'granted'
    ) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to take a picture',
        [{text: 'Okay'}],
      );
      return false;
    }
    return true;
  };

  const editPictureHandler = async (config: string) => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    let image;
    if (config === 'launch-camera') {
      image = await ImgPicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
    } else {
      image = await ImgPicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
    }
    if (image.uri) {
      setPickedImage(image.uri);
    }
  };

  //console.log(formState.inputValues, formState.formIsValid);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        scrollEnabled={true}>
        <View style={styles.firstView}>
          <View style={styles.profileView}>
            <View style={styles.imgView}>
              {pickedImage ? (
                <Image source={{uri: pickedImage}} style={styles.img} />
              ) : userProfile.imageUri ? (
                <Image
                  source={{uri: userProfile.imageUri}}
                  style={styles.img}
                />
              ) : (
                <Image source={pic} style={styles.img} resizeMode="contain" />
              )}
            </View>
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => launchCameraActionSheet()}>
              <MaterialCommunityIcons
                size={28}
                color={constant.primaryTextColor}
                name="image-plus"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.secondView}>
          <View style={styles.thirdView}>
            <TextInput
              placeholder="First Name"
              selectionColor={constant.thirdTextColor}
              placeholderTextColor={constant.thirdTextColor}
              autoCorrect={false}
              style={styles.textInput}
              value={formState.inputValues.firstName}
              onChangeText={(text) => {
                inputChangeHandler('firstName', text, text.length > 0);
              }}
            />
          </View>
          {!formState.inputValidities.firstName && (
            <View style={{marginTop: 5, marginLeft: 20}}>
              <Text style={styles.errorText}>
                Please enter a valid First Name.
              </Text>
            </View>
          )}
          <View style={styles.thirdView}>
            <TextInput
              placeholder="Last Name"
              selectionColor={constant.thirdTextColor}
              placeholderTextColor={constant.thirdTextColor}
              autoCorrect={false}
              style={styles.textInput}
              value={formState.inputValues.lastName}
              onChangeText={(text) => {
                inputChangeHandler('lastName', text, text.length > 0);
              }}
            />
          </View>
          {!formState.inputValidities.lastName && (
            <View style={{marginTop: 5, marginLeft: 20}}>
              <Text style={styles.errorText}>
                Please enter a valid Last Name.
              </Text>
            </View>
          )}
          {/* <View style={styles.thirdView}>
            <TextInput
              placeholder="Phone No"
              keyboardType="number-pad"
              selectionColor={constant.thirdTextColor}
              placeholderTextColor={constant.thirdTextColor}
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.thirdView}>
            <TextInput
              placeholder="Email"
              selectionColor={constant.thirdTextColor}
              placeholderTextColor={constant.thirdTextColor}
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.thirdView}>
            <TextInput
              placeholder="Password"
              selectionColor={constant.thirdTextColor}
              placeholderTextColor={constant.thirdTextColor}
              autoCorrect={false}
              style={styles.textInput}
            /> 
          </View> */}
          {editProfileLoading ? (
            <View style={{marginTop: 50}}>
              <Spinner />
            </View>
          ) : (
            <Button style={styles.button} onPress={() => editProfileHandler()}>
              <Text style={styles.buttonText}>Save</Text>
            </Button>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
