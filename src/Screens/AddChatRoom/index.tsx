import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';

import {HomeStackParamList} from '../TabNavigation';
import {firebaseAppDatabase} from '../../../App';
import {UPDATE_ORDER} from '../../store/actions/orders';
import * as profileActions from '../../store/actions/user/profile';
import Button from '../../Components/Button';
import styles from './styles';

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
    // system message
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date(),
      system: true,
    },
    // chat message
    {
      _id: 1,
      text: 'Hello!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'User Name',
      },
    },
  ]);

  const handleSend = (newMessage: any = []) => {
    setMessages(GiftedChat.append(messages, newMessage));
  };

  useEffect(() => {
    const initializeChatRoom = async () => {
      const dateCreated = new Date().toString();
      try {
        await firebaseAppDatabase
          .ref(`orders/${userId}/${currentJobOrderId}/chat`)
          .update({dateCreated});
        dispatch({
          type: UPDATE_ORDER,
          orderId: currentJobOrderId,
          valueToUpdate: 'chat',
          value: {
            dateCreated,
          },
        });
      } catch (err) {
        console.log(err);
        Alert.alert('Something went wrong 😔', err.message, [{text: 'Okay'}]);
      }
    };
    if (!currentOrder.orderDetails.chat) {
      initializeChatRoom();
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
    />
  );
};

export default AddChatRoom;
