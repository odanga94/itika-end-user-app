import database from '@react-native-firebase/database';

import Chat from '../../models/chat';

export const SET_CHATS = 'SET_CHATS';
export const ADD_CHAT_AND_FIRST_MESSAGE = 'ADD_CHAT';
export const UPDATE_CHAT = 'UPDATE_CHAT';
export const SET_CHAT_ID_BEING_PROCESSED = 'SET_CHAT_ID_BEING_PROCESSED';
export const RESET_CHATS = 'RESET_CHATS';
export const RESET_CHAT_ID_BEING_PROCESSED = 'RESET_CHAT_ID_BEING_PROCESSED';

export const fetchChats = (userId: string) => {
  return async (dispatch: any) => {
    try {
      const dataSnapShot = await database()
        .ref(`support_chats/${userId}`)
        .once('value');
      const chats = dataSnapShot.val();

      if (chats) {
        let chatsArr: Chat[] = [];
        Object.keys(chats).forEach((chatId: string) => {
          const newChat = new Chat(chatId, chats[chatId]);
          chatsArr.push(newChat);
        });
        dispatch({
          type: SET_CHATS,
          chats: chatsArr,
        });
      }
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong 😞');
    }
  };
};

export const addChatAndFirstMessage = (userId: string, chatDetails: any) => {
  return async (dispatch: any) => {
    try {
      const newChatIdRef = await database()
        .ref(`support_chats/${userId}/`)
        .push();
      const firstMessageIdRef = await newChatIdRef.push({
        ...chatDetails,
      });
      const newChat = new Chat(newChatIdRef.key, {
        [firstMessageIdRef.key]: {...chatDetails},
      });
      dispatch({
        type: ADD_CHAT_AND_FIRST_MESSAGE,
        chat: newChat,
      });
      dispatch({
        type: SET_CHAT_ID_BEING_PROCESSED,
        chatId: newChatIdRef.key,
      });
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong 😞');
    }
  };
};
