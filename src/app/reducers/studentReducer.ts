import * as TYPE from '../types';

const INITIAL_STATE = {
  createTimestamp: null,
  updateTimestamp: null,
  firstName: null,
  lastName: null,
  fullName: null,
  dob: null,
  gender: null,
  activeGroupId: null,
  levelId: null,
  guardianId: null,
  schoolId: null,
  isNew: null,
};
const studentReducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
// const studentReducer = (state = INITIAL_STATE, action: {type: string, payload: IStudent}) => {
  switch (action.type) {
    case TYPE.STUDENT_SET_DATA:
      return {
        ...state,
        ...action.payload
      };
    // case TYPE.STUDENT_GET_COLLECTIBLE:
    //   return {
    //     ...state,
    //       collectibles: [...state.collectibles, action.payload],
    //   };
    case TYPE.STUDENT_ANSWERS_BLOCK:
      return {
        ...state,
      };
    case TYPE.STUDENT_ANSWERS_QUESTION:
      return {
        ...state,
      };
    // case TYPE.STUDENT_ADD_AVATAR:
    //   return {
    //     ...state,
    //     student: {
    //       avatars: [...state.avatars, action.payload],
    //     },
    //   };
    // case TYPE.STUDENT_REMOVE_AVATAR:
    //   return {
    //     ...state,
    //     student: {
    //       avatars: state.avatars.filter(
    //         (avatar: {id: string}) => avatar.id !== action.payload
    //       ),
    //     },
    //   };
    case TYPE.STUDENT_AUTH:
      return {
        ...state,
        token: action.payload,
      };
    case TYPE.STUDENT_SELECT_CARD:
      return {
        ...state,
        cardView: action.payload,
      };
    case TYPE.STUDENT_CLOSE_CARD:
      return {
        ...state,
        cardView: null,
      };
    case TYPE.STUDENT_SELECT_TYPE_GAME:
      return {
        ...state,
        gameType: action.payload,
      };
    case TYPE.STUDENT_SELECT_GAME:
      return {
        ...state,
        game: action.payload,
      };
    case TYPE.STUDENT_CLOSE_GAME:
      return {
        ...state,
        game: null,
      };
    case TYPE.STUDENT_SELECT_TOPIC:
      return {
        ...state,
        student: {
          topic: action.payload,
        },
      };
    case TYPE.STUDENT_CONFIG:
      return {
        ...state,
        student: {
          config: action.payload,
        },
      };
    case TYPE.STUDENT_RESET:
      return INITIAL_STATE;
    case TYPE.SET_COLLECTIBLE:
      return {
        ...state,
        collectibles: action.payload
      };
    case TYPE.SET_AOK:
      return {
        ...state,
        areasOfKnowledge: action.payload
      };
    case TYPE.SET_BLOCK_PRESENTATION:
      return {
        ...state,
        blockPresentation: action.payload
      };
    case TYPE.STUDENT_SET_NEXT_LEVEL:
      return {
        ...state,
        nextLevel: action.payload
      }
    case TYPE.SET_OLD_USER:
      return {
        ...state,
        isNew: false
      }
    default:
      return state;
  }
};

export default studentReducer;
