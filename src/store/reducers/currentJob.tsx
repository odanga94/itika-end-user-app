import {SET_CURRENT_JOB, DELETE_CURRENT_JOB} from '../actions/currentJob';

const initialState: {
  currentJobs: any[];
} = {
  currentJobs: [],
};

const currentJobReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_JOB:
      if (
        !state.currentJobs.find(
          (job: any) => job.id === action.currentJobOrderId,
        )
      ) {
        return {
          currentJobs: state.currentJobs.concat({id: action.currentJobOrderId}),
        };
      } else {
        return state;
      }
    case DELETE_CURRENT_JOB:
      return {
        currentJobs: state.currentJobs.filter(
          (currentJob: any) => currentJob.id !== action.currentJobOrderId,
        ),
      };
    default:
      return state;
  }
};

export default currentJobReducer;
