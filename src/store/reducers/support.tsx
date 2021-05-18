import Chat from '../../models/chat';
import {
  ADD_CHAT_AND_FIRST_MESSAGE,
  SET_CHATS,
  UPDATE_CHAT,
  SET_CHAT_ID_BEING_PROCESSED,
  RESET_CHATS,
  RESET_CHAT_ID_BEING_PROCESSED,
  UPDATE_CHAT_STATUS,
} from '../actions/support';

const initialState: {chats: Chat[] /*chatIdBeingProcessed: any*/} = {
  chats: [],
  chatIdBeingProcessed: null,
};

const supportReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_CHAT_AND_FIRST_MESSAGE:
      let newChats = state.chats.concat(action.chat);
      /* if (!state.chats.find((chat: Chat) => chat.id === action.chatId)) {
        newChats = state.chats.concat(
          new Chat(action.chatId, action.chatDetails),
        );
      } */
      return {
        ...state,
        chats: newChats,
      };
    case UPDATE_CHAT:
      let indexOfChatToUpdate: number;
      const chatToUpdate: any = state.chats.find((chat: Chat, index) => {
        if (chat.id === action.chatId) {
          indexOfChatToUpdate = index;
          return true;
        }
        return false;
      });
      //console.log(chatToUpdate);
      //if (indexOfChatToUpdate) {
      const updatedChat = new Chat(action.chatId, {
        ...chatToUpdate.chatDetails,
        [action.messageId]: action.value,
      });
      //console.log(updatedChat);
      const updatedChats = [...state.chats];
      updatedChats.splice(indexOfChatToUpdate, 1, updatedChat);
      return {
        ...state,
        chats: updatedChats,
      };
    case UPDATE_CHAT_STATUS:
      let indexOfChatToUpdateStatus: number;
      const chatToUpdateStatus: any = state.chats.find((chat: Chat, index) => {
        if (chat.id === action.chatId) {
          indexOfChatToUpdateStatus = index;
          return true;
        }
        return false;
      });
      //console.log(chatToUpdate);
      //if (indexOfChatToUpdate) {
      const updatedChatStatus = new Chat(action.chatId, {
        ...chatToUpdateStatus.chatDetails,
        status: action.value,
      });
      //console.log(updatedChat);
      const updatedChatsStatus = [...state.chats];
      updatedChatsStatus.splice(
        indexOfChatToUpdateStatus,
        1,
        updatedChatStatus,
      );
      return {
        ...state,
        chats: updatedChatsStatus,
      };

    case SET_CHATS:
      return {
        ...state,
        chats: action.chats,
      };
    /* case SORT_ORDERS: {
      return {
        ...state,
        chats: [...state.chats].sort((a, b) =>
          a.chatDetails.dateRequested > b.chatDetails.dateRequested ? -1 : 1,
        ),
      };
    } */
    case SET_CHAT_ID_BEING_PROCESSED:
      return {
        ...state,
        chatIdBeingProcessed: action.chatId,
      };
    case RESET_CHAT_ID_BEING_PROCESSED:
      return {
        ...state,
        chatIdBeingProcessed: null,
      };
    case RESET_CHATS:
      return initialState;
    default:
      return state;
  }
};

export default supportReducer;
