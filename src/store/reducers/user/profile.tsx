import {
  FETCH_PROFILE,
  EDIT_PROFILE,
  UPDATE_IMAGE,
  DELETE_IMAGE,
  HAS_ORDERS,
  RESET_PROFILE,
  CREATE_PROFILE,
} from '../../actions/user/profile';

const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  imageUri: '',
  averageRating: -1,
  //hasOrders: true,
};

const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PROFILE:
      if (action.profileData) {
        return {
          ...state,
          firstName: action.profileData.firstName,
          lastName: action.profileData.lastName,
          phone: action.profileData.phone,
          email: action.profileData.email,
          imageUri: action.profileData.profilePic,
          averageRating: action.profileData.averageRating
            ? action.profileData.averageRating
            : -1,
        };
      }
      return state;
    case CREATE_PROFILE:
      return {
        ...state,
        firstName: action.userData.firstName,
        lastName: action.userData.lastName,
        phone: action.userData.phone,
        email: action.userData.email,
      };
    case EDIT_PROFILE: {
      return {
        ...state,
        firstName: action.userData.firstName,
        lastName: action.userData.lastName,
      };
    }
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
