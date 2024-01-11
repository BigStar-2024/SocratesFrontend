import * as TYPE from '../types';

const INITIAL_STATE = {
    accessory: null,
    head: null,
    clothes: null,
    pants: null,
    skin: null
};

const avatarReducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
  switch (action.type) {
    case TYPE.AVATAR_SET_ACCESORY:
      return {
        ...state,
        accessories: action.payload
      };
    case TYPE.AVATAR_SET_DEFAULT:
      return {
        ...state,
        accessory: action.payload.avatarAccessorie,
        head: action.payload.avatarHead,
        clothes: action.payload.avatarClothes,
        pants: action.payload.avatarPants,
        skin: action.payload.skinTone
      };
    case TYPE.AVATAR_SET_DEFAULT_LOGIN:
      return {
        ...state,
        head: action.payload.currentAvatarHead,
        accessory: action.payload.currentAvatarAccessories,
        clothes: action.payload.currentAvatarClothes,
        pants: action.payload.currentAvatarPants,
        skin: action.payload.skinTone
      };
    case TYPE.AVATAR_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default avatarReducer;
