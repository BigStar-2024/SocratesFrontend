import * as TYPE from '../types';

const INITIAL_STATE = {
  reLoadImgs: false,
  selectedImg: ''
};
const certificateReducer = (state = INITIAL_STATE, action: { type: string, payload: any }) => {

  switch (action.type) {
    case TYPE.TEACHER_RELOAD_IMAGES:
      return {
        ...state,
        reLoadImgs: !state.reLoadImgs,
      };
    case TYPE.CERTIFICATE_SELECT_IMAGE:
      return {
        ...state,
        selectedImg: action.payload,
      };
    default:
      return state;
  }
};

export default certificateReducer;
