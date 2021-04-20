import {
  FETCH_PROFILE,
  EDIT_PROFILE,
  UPDATE_IMAGE,
  DELETE_IMAGE,
  HAS_ORDERS,
  RESET_PROFILE,
} from '../../actions/user/profile';

const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  //imageUri: '',
  //hasOrders: true,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      if (action.profileData) {
        return {
          ...state,
          name: action.profileData.name,
          phone: action.profileData.phone,
          imageUri: action.profileData.profilePic,
        };
      }
      return state;
    case EDIT_PROFILE:
      return {
        ...state,
        firstName: action.userData.firstName,
        lastName: action.userData.lastName,
        phone: action.userData.phone,
        email: action.userData.email,
      };
    case UPDATE_IMAGE:
      return {
        ...state,
        imageUri: action.imageUri,
      };
    case DELETE_IMAGE:
      return {
        ...state,
        imageUri: '',
      };
    case HAS_ORDERS:
      return {
        ...state,
        hasOrders: action.hasOrders,
      };
    case RESET_PROFILE:
      return initialState;
    default:
      return state;
  }
};

export default profileReducer;
