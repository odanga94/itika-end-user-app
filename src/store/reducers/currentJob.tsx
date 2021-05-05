import {SET_CURRENT_JOB, DELETE_CURRENT_JOB} from '../actions/currentJob';

const initialState = {
  currentJobOrderId: null,
};

const currentJobReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_JOB:
      return {
        ...state,
        currentJobOrderId: action.currentJobOrderId,
      };
    case DELETE_CURRENT_JOB:
      return initialState;
    default:
      return state;
  }
};

export default currentJobReducer;
