import React, {useEffect, Fragment, useState} from 'react';
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
import database from '@react-native-firebase/database';

import {HomeStackParamList} from '../TabNavigation';
import {
  UPDATE_ORDER,
  RESET_SHOULD_NAVIGATE_TO_CHAT,
} from '../../store/actions/orders';
import * as profileActions from '../../store/actions/user/profile';
import Spinner from '../../Components/UI/Spinner';
import styles from './styles';
import constants from '../../utils/constant';
import {
  verifyCameraPermissions,
  uploadImage,
  getImageExtension,
} from '../../utils';

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
  route: any;
}

const AddChatRoom: React.FC<Props> = (props) => {
  const {navigation, route} = props;
  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.auth.userId);
  const currentJobOrderId = route.params.orderId;
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
  const [sendImageLoading, setSendImageLoading] = useState(false);

  useEffect(() => {
    dispatch({
      type: RESET_SHOULD_NAVIGATE_TO_CHAT,
    });
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      title: `Order ${currentJobOrderId}`,
    });
  }, [currentJobOrderId, navigation]);

  const editPictureHandler = async (config: string) => {
    setSendImageLoading(true);
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
      const message: any = {
        _id: '',
        createdAt: '',
        user: null,
        image: '',
        messageType: '',
        // Mark the message as sent, using one tick
        sent: true,
        // Mark the message as received, using two tick
        received: false,
        // Mark the message as pending with a clock loader
        pending: false,
      };
      message._id = Date.now();
      message.createdAt = new Date().toString();
      message.user = {
        _id: userId,
        name: userProfile.firstName
          ? `${userProfile.firstName} ${userProfile.lastName}`
          : 'Loading...',
        avatar: userProfile.imageUri ? userProfile.imageUri : '',
      };
      message.image = image.uri;
      message.messageType = 'image';
      try {
        const imgExt = getImageExtension(image.uri);
        const imgUrl = await uploadImage(
          image.uri,
          `users/${userId}/orders/${currentOrder.id}/${Date.now()}${imgExt}`,
        );
        const chatIdRef = await database()
          .ref(`orders/${userId}/${currentOrder.id}/chat`)
          .push({...message, image: imgUrl});
        dispatch({
          type: UPDATE_ORDER,
          orderId: currentOrder.id,
          valueToUpdate: 'chat',
          value: {
            ...currentOrder.orderDetails.chat,
            [chatIdRef.key]: {...message, image: imgUrl},
          },
        });
        setMessages(GiftedChat.append(messages, message));
      } catch (err) {
        console.log(err);
        Alert.alert('Something went wrong 😔', err.message, [{text: 'Okay'}]);
      }
    }
    setSendImageLoading(false);
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
      if (currentOrder.orderDetails.status === 'delivered') {
        Alert.alert(
          "Can't Send",
          'You can no longer send messages in this chat because the order was completed.',
          [{text: 'Okay'}],
        );
        return;
      }
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
    if (currentOrder.orderDetails.status === 'delivered') {
      Alert.alert(
        "Can't Send",
        'You can no longer send messages in this chat because the order was completed.',
        [{text: 'Okay'}],
      );
      return;
    }
    try {
      const newMessageObj = {
        ...newMessage[0],
        createdAt: new Date().toString(),
        // Mark the message as sent, using one tick
        sent: true,
        // Mark the message as received, using two tick
        received: false,
        // Mark the message as pending with a clock loader
        pending: false,
      };
      const chatIdRef = await database()
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
      setMessages(GiftedChat.append(messages, newMessageObj));
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
          {currentOrder.orderDetails.status === 'delivered' ? (
            <MaterialIcons
              name="cancel"
              size={32}
              color={constants.primaryColor}
            />
          ) : (
            <MaterialIcons
              name="send"
              size={32}
              color={constants.primaryTextColor}
            />
          )}
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
          ['Send Image']: () => launchCameraActionSheet(),
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
        const chatIdRef = await database()
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
    } else if (messages.length === 0) {
      const chatsArr: any = [];
      const chatKeysArr = Object.keys(
        currentOrder.orderDetails.chat,
      ).sort((a, b) => (a < b ? -1 : 1));
      //for(let i = chatKeysArr.length - 5; i <)
      //console.log('keys', chatKeysArr);
      for (let i = chatKeysArr.length - 1; i >= 0; i--) {
        if (
          !messages.find(
            (message: any) =>
              message._id ===
              currentOrder.orderDetails.chat[chatKeysArr[i]]._id,
          )
        ) {
          chatsArr.push(currentOrder.orderDetails.chat[chatKeysArr[i]]);
        }
      }
      //console.log(chatsArr);
      setMessages((prevState: any) => GiftedChat.append(prevState, chatsArr));
    }
  }, [dispatch, currentJobOrderId]);

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

  useEffect(() => {
    const currentChatRef = database().ref(
      `orders/${userId}/${currentJobOrderId}/chat`,
    );
    const handleMessageAdded = async (dataSnapShot: any) => {
      const messageId = dataSnapShot.key;
      const messageDetails = dataSnapShot.val();
      if (messageDetails.user && messageDetails.user._id !== userId) {
        const messageIdsArr = Object.keys(currentOrder.orderDetails.chat);
        if (!messageIdsArr.find((id) => id === messageId)) {
          const newMessageDetails = {
            ...messageDetails,
            received: true,
          };
          await currentChatRef.update({[messageId]: newMessageDetails});
          dispatch({
            type: UPDATE_ORDER,
            orderId: currentJobOrderId,
            valueToUpdate: 'chat',
            value: {
              ...currentOrder.orderDetails.chat,
              [messageId]: newMessageDetails,
            },
          });
          setMessages((prevState: any) =>
            GiftedChat.append(prevState, newMessageDetails),
          );
        }
      }
    };

    if (currentJobOrderId && currentOrder) {
      currentChatRef.on('child_added', handleMessageAdded);
    }

    return () => {
      currentChatRef.off('child_added', handleMessageAdded);
    };
  }, [currentOrder, currentJobOrderId, userId, dispatch]);

  useEffect(() => {
    const currentChatRef = database().ref(
      `orders/${userId}/${currentJobOrderId}/chat`,
    );
    const handleMessageUpdated = async (dataSnapShot: any) => {
      const messageId = dataSnapShot.key;
      const messageDetails = dataSnapShot.val();
      if (messageDetails.user && messageDetails.user._id === userId) {
        if (messageDetails.received === true) {
          dispatch({
            type: UPDATE_ORDER,
            orderId: currentJobOrderId,
            valueToUpdate: 'chat',
            value: {
              ...currentOrder.orderDetails.chat,
              [messageId]: {
                ...messageDetails,
                received: true,
              },
            },
          });
          //console.log('mgs', messages);
          const indexOfMessageToUpdate = messages.findIndex((message: any) => {
            //console.log(typeof message._id, message._id);
            //console.log(typeof messageDetails._id, messageDetails._id);
            return message._id === messageDetails._id;
          });
          //console.log(indexOfMessageToUpdate, messageDetails);
          const updatedMessages = [...messages];
          //console.log('new', updatedMessages);
          updatedMessages.splice(indexOfMessageToUpdate, 1, messageDetails);
          setMessages(updatedMessages);
        }
      }
    };

    if (currentJobOrderId && currentOrder) {
      currentChatRef.on('child_changed', handleMessageUpdated);
    }

    return () => {
      currentChatRef.off('child_changed', handleMessageUpdated);
    };
  }, [currentOrder, messages, currentJobOrderId, userId, dispatch]);

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
    <Fragment>
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
        placeholder={
          currentOrder.orderDetails.status === 'delivered'
            ? 'You can no longer send messages.'
            : 'Type a message...'
        }
      />
      {sendImageLoading ? (
        <View style={styles.spinnerContainer}>
          <Spinner style={undefined} size={undefined} />
        </View>
      ) : null}
    </Fragment>
  );
};

export default AddChatRoom;
