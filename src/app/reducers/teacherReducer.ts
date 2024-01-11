import * as TYPE from '../types';

const INITIAL_STATE = {
};
const TEACHERReducer = (state = INITIAL_STATE, action: { type: string, payload: any }) => {
  // const TEACHERReducer = (state = INITIAL_STATE, action: {type: string, payload: ITEACHER}) => {
  switch (action.type) {
    case TYPE.TEACHER_SET_DATA:
      return {
        ...state,
        ...action.payload
      };
    case TYPE.TEACHER_AUTH:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default TEACHERReducer;
