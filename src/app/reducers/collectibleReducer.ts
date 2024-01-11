import { SET_CARD_CATEGORIES } from 'app/types';

const INITIAL_STATE = {
    categories: null,
};

const collectibleReducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
  switch (action.type) {
    case SET_CARD_CATEGORIES:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default collectibleReducer;
