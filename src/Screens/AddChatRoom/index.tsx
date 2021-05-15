import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, Alert, Platform, ActionSheetIOS} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
  Actions,
  ActionsProps,
} from 'react-native-gifted-chat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImgPicker from 'expo-image-picker';
import {ActionSheet} from 'native-base';

import {HomeStackParamList} from '../TabNavigation';
import {firebaseAppDatabase} from '../../../App';
import {UPDATE_ORDER} from '../../store/actions/orders';
import * as profileActions from '../../store/actions/user/profile';
import Button from '../../Components/Button';
import Spinner from '../../Components/UI/Spinner';
import styles from './styles';
import constants from '../../utils/constant';
import {verifyCameraPermissions} from '../../utils';

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
}

const AddChatRoom: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.auth.userId);
  const currentJobOrderId = useSelector(
    (state: any) => state.currentJob.currentJobOrderId,
  );
  //console.log(currentJobOrderId);
  const currentOrder = useSelector((state: any) =>
    state.orders.orders.find((order: any) => order.id === currentJobOrderId),
  );
  //console.log('currOrder', currentOrder);
  const userProfile = useSelector((state: any) => state.profile);

  const [profileLoading, setProfileLoading] = useState(false);
  const [messages, setMessages]: any = useState([
    // // system message
    // {
    //   _id: 0,
    //   text: 'New room created.',
    //   createdAt: new Date(),
    //   system: true,
    // },
    // // chat message
    // {
    //   _id: 1,
    //   text: 'Hello!',
    //   createdAt: new Date(),
    //   user: {
    //     _id: 2,
    //     name: 'User Name',
    //   },
    // },
  ]);
  const [img, setImg] = useState('');

  const editPictureHandler = async (config: string) => {
    const hasPermissions = await verifyCameraPermissions();
    if (!hasPermissions) {
      return;
    }
    let image: any;
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
      setImg(image.uri);
    }
    return image.uri;
  };

  const launchCameraActionSheet = () => {
    let buttons = [
      'Take Picture',
      'Choose from Gallery',
      //'Delete Photo',
      'Cancel',
    ];
    const DESTRUCTIVE_INDEX = 2;
    const CANCEL_INDEX = 2;
    /* if (!props.imageUri) {
      buttons = ['Take Picture', 'Choose from Gallery', 'Cancel'];
    } */
    const buttonOptions = {
      options: buttons,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      title: 'Choose Image',
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

  const handleSend = async (newMessage: any = []) => {
    //console.log(newMessage);
    try {
      const newMessageObj = {
        ...newMessage[0],
        createdAt: new Date().toString(),
      };
      const chatIdRef = await firebaseAppDatabase
        .ref(`orders/${userId}/${currentJobOrderId}/chat`)
        .push({...newMessageObj});
      dispatch({
        type: UPDATE_ORDER,
        orderId: currentJobOrderId,
        valueToUpdate: 'chat',
        value: {
          ...currentOrder.orderDetails.chat,
          [chatIdRef.key]: newMessageObj,
        },
      });
      setMessages(GiftedChat.append(messages, newMessage));
    } catch (err) {
      console.log(err);
      Alert.alert('Something went wrong 😔', err.message, [{text: 'Okay'}]);
    }
  };

  //console.log(currentOrder.orderDetails.chat);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{right: {backgroundColor: constants.primaryTextColor}}}
        textStyle={{right: {color: '#fff'}}}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <MaterialIcons
            name="send"
            size={32}
            color={constants.primaryTextColor}
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <FontAwesome
          name="chevron-circle-down"
          size={36}
          color={constants.primaryColor}
        />
      </View>
    );
  };

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  };

  const renderActions = (props: Readonly<ActionsProps>) => {
    return (
      <Actions
        {...props}
        options={{
          ['Send Image']: () => editPictureHandler('launch-camera'),
        }}
        icon={() => (
          <MaterialIcons
            name={'attachment'}
            size={28}
            color={constants.primaryTextColor}
          />
        )}
        onSend={(args) => console.log('args', args)}
      />
    );
  };

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size={undefined} style={undefined} />
      </View>
    );
  };

  useEffect(() => {
    const initializeChatRoom = async () => {
      const systemMessage = {
        _id: 0,
        text: 'New room created.',
        createdAt: new Date().toString(),
        system: true,
      };
      try {
        const chatIdRef = await firebaseAppDatabase
          .ref(`orders/${userId}/${currentJobOrderId}/chat`)
          .push({...systemMessage});
        dispatch({
          type: UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'chat',
          value: {
            [chatIdRef.key]: systemMessage,
          },
        });
        setMessages([systemMessage]);
      } catch (err) {
        console.log(err);
        Alert.alert('Something went wrong 😔', err.message, [{text: 'Okay'}]);
      }
    };

    if (!currentOrder.orderDetails.chat) {
      initializeChatRoom();
    } else {
      const chatsArr = [];
      const chatKeysArr = Object.keys(currentOrder.orderDetails.chat);
      //for(let i = chatKeysArr.length - 5; i <)
      console.log('keys', chatKeysArr);
      for (let i = chatKeysArr.length - 1; i >= 0; i--) {
        chatsArr.push(currentOrder.orderDetails.chat[chatKeysArr[i]]);
      }
      console.log(chatsArr);
      setMessages(chatsArr);
    }
  }, [currentOrder, userId, dispatch, currentJobOrderId]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setProfileLoading(true);
      try {
        await dispatch(profileActions.fetchProfile(userId));
      } catch (err) {
        console.log(err);
        Alert.alert('Something went wrong 😔', err.message, [{text: 'Okay'}]);
      }
      setProfileLoading(false);
    };

    if (!userProfile.firstName && userId) {
      fetchUserProfile();
    }
  }, [dispatch, userId, userProfile]);

  //console.log(userProfile);

  return (
    /*     <View style={styles.container}>
      <Button
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.thirdText}>Close Modal</Text>
      </Button>
    </View> */
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{
        _id: userId,
        name: userProfile.firstName
          ? `${userProfile.firstName} ${userProfile.lastName}`
          : 'Loading...',
        avatar: userProfile.imageUri ? userProfile.imageUri : '',
      }}
      isTyping
      keyboardShouldPersistTaps="never"
      renderBubble={renderBubble}
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
      renderSystemMessage={renderSystemMessage}
      renderActions={renderActions}
    />
  );
};

export default AddChatRoom;
