import * as TYPE from '../types';
const INITIAL_STATE = {
    id: null,
    isActive: null,
    name: null,
    lastName: null,
    gender: null,
    cardExpMonth: null,
    cardExpYear: null,
    paymentMethod: {},
    availableGuardianstudentplan: []
};
// const studentReducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
const guardianReducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
  switch (action.type) {
    case TYPE.GUARDIAN_SET_DATA:
      return {
        ...state,
        ...action.payload,
        availableGuardianstudentplan: action.payload.availableGuardianstudentplan
      };
    case TYPE.GUARDIAN_SET_ACCESORY:
      return {
        ...state,
        accessories: action.payload
      };
    case TYPE.GUARDIAN_SET_AVAILABLE_PLANS:
      return{
        ...state,
        availablePlans: action.payload
      }
    case TYPE.GUARDIAN_PAYMENT_METHOD_INFO:
      return{
        ...state,
        paymentMethod: {...state.paymentMethod, ...action.payload}
      }
    case TYPE.GUARDIAN_SET_GUEARDIAN_STUDENT_PLAN:
      return{
        ...state,
        guardianstudentplanSet: action.payload
      }
    case TYPE.GUARDIAN_SET_STUDENT:
      return{
        ...state,
        student: action.payload
      }
    case TYPE.GUARDIAN_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default guardianReducer;
