import * as TYPES from '../types';
import query, {fetchQuery, fetchRawData} from 'api/queries/get';
import {STUDENT_WALLET_QUERY} from 'api/queries/users';
import {
  CREATE_STUDENT,
  CHANGE_STUDENT_GRADE,
  CHANGE_STUDENT_PASSWORD,
  FETCH_USER_BADGES,
} from 'api/mutations/students';
import mutation from 'api/mutations/get';
import {sendRawQuery} from 'api/queries/get';

export const setAreasOfKnowledge = (payload: string) => ({
  type: 'SET_AOK',
  payload,
});

export const setCoinWallet = async (
  studentId: number,
  token: string,
  dispatch: any
) => {
  const res: any = await query(
    `studentById(id: "${studentId}")`,
    STUDENT_WALLET_QUERY,
    token
  ).catch(() => ({success: false}));

  if (res.success === false) {
    return {success: false, msg: 'Network Error'};
  }

  const result: any = await res.json();

  if (result.errors) {
    return {success: false, msg: result.errors[0].message};
  }
  const coinWallet = result.data.studentById.coinWallet;
  dispatch({type: TYPES.EARNING_COIN_SET, payload: coinWallet.balance});
  return {success: true, msg: 'Success!'};
};

export const createStudent = async (
  audience: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  guardianStudentPlanId: number,
  listSubjectId: number[],
  studentPlan: number,
  gradeId: number,
  token: string,
  dispatch: any
) => {
  const res: any = await mutation(
    CREATE_STUDENT(
      audience,
      firstName,
      lastName,
      username,
      password,
      guardianStudentPlanId,
      listSubjectId,
      studentPlan,
      gradeId
    ),
    token
  ).catch(() => ({success: false}));

  if (res.success === false) {
    return {success: false, msg: 'Network Error!'};
  }

  const result: any = await res.json();

  if (result.errors) {
    return {success: false, msg: result.errors[0].message};
  }

  const {guardian} = result.data.createStudent;

  dispatch({
    type: TYPES.GUARDIAN_SET_DATA,
    payload: guardian,
  });
  return {success: true, msg: 'Success', data: result.data.createOrder};
};

export const changeStudentGrade = async (
  gradeId: string,
  studentId: string,
  token: string,
  dispatch: any
) => {
  const res: any = await mutation(
    CHANGE_STUDENT_GRADE(gradeId, studentId),
    token
  ).catch(() => ({success: false}));

  if (res.success === false) {
    return {success: false, msg: 'Network Error!'};
  }

  const result: any = await res.json();

  if (result.errors) {
    return {success: false, msg: result.errors[0].message};
  }

  const {guardian} = result.data.createChangeStudentGrade;

  dispatch({
    type: TYPES.GUARDIAN_SET_DATA,
    payload: guardian,
  });
  // dispatch({
  //     type: TYPES.GUARDIAN_SET_STUDENT,
  //     payload: student || []
  // });
  return {success: true, msg: 'Success', data: result.data.createOrder};
};

export const changeStudentPassword = async (
  password: string,
  studentId: string,
  token: string,
  dispatch: any
) => {
  const res: any = await mutation(
    CHANGE_STUDENT_PASSWORD(password, studentId),
    token
  ).catch(() => ({success: false}));

  if (res.success === false) {
    return {success: false, msg: 'Network Error!'};
  }

  const result: any = await res.json();

  if (result.errors) {
    return {success: false, msg: result.errors[0].message};
  }

  // const { guardian, student} = result.data.changeStudentPassword;
  const {guardian} = result.data.changeStudentPassword;

  dispatch({
    type: TYPES.GUARDIAN_SET_DATA,
    payload: guardian,
  });
  // dispatch({
  //     type: TYPES.GUARDIAN_SET_STUDENT,
  //     payload: student || []
  // });
  return {success: true, msg: 'Success', data: result.data.createOrder};
};

export const doSetOldUser = async (token: string) => {
  try {
    const res: any = await sendRawQuery(
      `mutation IsNew {
            updateIsNew {
              student{
                isNew
              }
            }
          }`,
      token
    );
    return res.msg
      ? {msg: res.msg, status: false}
      : {...res.data.IsNew, status: true};
  } catch (e) {
    console.log(e);
    return {msg: 'Set old user error!', status: false};
  }
};

export const doUpdateUserLanguage = async (language: string, token: string) => {
  try {
    const res: any = await sendRawQuery(
      `mutation {
            updateUserLanguage(language: "${language}"){
              user{
                id
              }
            }
          }`,
      token
    );
    return res.msg
      ? {msg: res.msg, success: false}
      : {...res.data, success: true};
  } catch (e) {
    console.log(e);
    return {
      msg: 'Network error! Updating user language failed',
      success: false,
    };
  }
};

/**
 * Introduce swr
 * @param studentId number
 * @param token string
 * @returns array of tx data if successful, undefined if error
 */
export const doFetchWalletTransactions = async (
  studentId: number,
  token: string
) => {
  const res: any = await fetchRawData(
    `query {
      coinWalletTransactionsById(studentId: ${studentId}){
        id
        date
        comment
        amount
        description
        side
      }
    }`,
    token
  );
  return res.data.coinWalletTransactionsById;
};

/**
 * Fetch current user badges
 * @param studentId
 * @param token
 * @returns
 */
export const doFetchUserBadges = async (studentId: number, token: string) => {
  const res: any = await fetchQuery(FETCH_USER_BADGES(studentId), token);
  return res.data?.studentBadgesByStudentId ?? res.errors[0]
};
