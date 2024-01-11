import {
  FINISH_BLOCK_PRESENTATION,
  CREATE_AI_BLOCK_PRESENTATION,
  CREATE_PATH_BLOCK_PRESENTATION,
  CREATE_NEW_AI_BLOCK,
  FINISH_BLK_PT,
  GET_QUESIONS,
  CREATE_NEW_PATH_BLOCK,
  FETCH_STUDENT_ANSWER_HISTORY,
} from 'api/mutations/block';
import mutation from 'api/mutations/get';
import query, {fetchQuery} from 'api/queries/get';
import {BLOCK_PRESENTATION_QUERY} from 'api/queries/questions';
import {sendRawQuery} from 'api/queries/get';

import * as TYPES from '../types';

/**
 * This is previous mutation for finishBlock
 * @param block_presentation_id
 * @param batteryLevel
 * @param hits
 * @param errors
 * @param bonusCoins
 * @param earning
 * @param questionResults
 * @param token
 * @param dispatch
 * @returns
 */
export const finishBlock = async (
  block_presentation_id: string,
  batteryLevel: number,
  hits: number,
  errors: number,
  bonusCoins: number,
  earning: object,
  questionResults: any,
  token: string,
  dispatch: any
) => {
  const res: any = await mutation(
    FINISH_BLOCK_PRESENTATION(
      block_presentation_id,
      batteryLevel,
      hits,
      errors,
      bonusCoins,
      questionResults
    ),
    token
  ).catch(() => ({success: false}));
  if (res.success === false) {
    return {success: false, msg: 'Network Error'};
  }

  const result: any = await res.json();

  if (result.errors) {
    return {success: false, msg: result.errors[0].message};
  }

  const {student} = result.data.finishBlockPresentation;
  dispatch({type: TYPES.STUDENT_SET_DATA, payload: student});
  dispatch({
    type: TYPES.EARNING_SET_DATA,
    payload: {
      ...earning,
      level_name: student.level.name,
      level: student.level.amount,
      exp: parseInt(student.points),
      expMax: student.level.pointsRequired,
      balance: student.coinWallet.balance,
    },
  });
  return {success: true, msg: 'Success!'};
};

export const createAiBlockPresentation = async (
  aokId: number,
  token: string
) => {
  // export const createAiBlockPresentation = async (aokId: number, token: string) => {
  const res: any = await mutation(
    CREATE_AI_BLOCK_PRESENTATION(aokId),
    token
  ).catch(() => ({success: false}));
  if (res.success === false) {
    return {success: false, msg: 'Network Error'};
  }

  const result: any = await res.json();

  if (result.errors) {
    return {success: false, msg: result.errors[0].message};
  }

  const {blockPresentation} = result.data.createAiBlockPresentation;
  // dispatch({ type: TYPES.STUDENT_SET_DATA, payload: student })
  // dispatch({ type: TYPES.EARNING_SET_DATA, payload: {
  //     ...earning,
  //     level_name: student.level.name,
  //     level: student.level.amount,
  //     exp: parseInt(student.points),
  //     expMax: student.level.pointsRequired,
  //     balance: student.coinWallet.balance,
  // }})
  return {success: true, msg: 'Success!', data: blockPresentation};
};

export const createPathBlockPresentation = async (
  studentId: number,
  topicId: number,
  token: string
) => {
  // export const createPathBlockPresentation = async (studentId: number, topicId: number, token: string) => {
  const res: any = await mutation(
    CREATE_PATH_BLOCK_PRESENTATION(studentId, topicId),
    token
  ).catch(() => ({success: false}));
  if (res.success === false) {
    return {success: false, msg: 'Network Error'};
  }

  const result: any = await res.json();

  if (result.errors) {
    return {success: false, msg: result.errors[0].message};
  }

  const {blockPresentation} = result.data.createPathBlockPresentation;
  // dispatch({ type: TYPES.STUDENT_SET_DATA, payload: student })
  // dispatch({ type: TYPES.EARNING_SET_DATA, payload: {
  //     ...earning,
  //     level_name: student.level.name,
  //     level: student.level.amount,
  //     exp: parseInt(student.points),
  //     expMax: student.level.pointsRequired,
  //     balance: student.coinWallet.balance,
  // }})
  return {success: true, msg: 'Success!', data: blockPresentation};
};

export const getBlockPresentationById = async (
  blockPresentationId: number,
  token: string
) => {
  // export const createAiBlockPresentation = async (aokId: number, token: string) => {
  const res: any = await query(
    `blockPresentationById(id:${blockPresentationId})`,
    BLOCK_PRESENTATION_QUERY,
    token
  ).catch(() => ({success: false}));
  if (res.success === false) {
    return {success: false, msg: 'Network Error'};
  }

  const result: any = await res.json();

  if (result.errors) {
    return {success: false, msg: result.errors[0].message};
  }

  const {blockPresentationById} = result.data;
  // dispatch({ type: TYPES.STUDENT_SET_DATA, payload: student })
  // dispatch({ type: TYPES.EARNING_SET_DATA, payload: {
  //     ...earning,
  //     level_name: student.level.name,
  //     level: student.level.amount,
  //     exp: parseInt(student.points),
  //     expMax: student.level.pointsRequired,
  //     balance: student.coinWallet.balance,
  // }})
  return {success: true, msg: 'Success!', data: blockPresentationById};
};

export const createNewAiBlock = async (
  aokId: number,
  studentId: number,
  token: string
) => {
  try {
    const res: any = await sendRawQuery(
      CREATE_NEW_AI_BLOCK(aokId, studentId),
      token
    );
    return res.msg
      ? {msg: res.msg, success: false}
      : {
          ...res.data.createAiBlockPresentation.blockPresentation,
          success: true,
        };
  } catch (e) {
    console.log(e);
    return {msg: 'Network error!', success: false};
  }
};

export const createNewPathBlock = async (
  topicId: number,
  studentId: number,
  token: string
) => {
  console.log({topicId, studentId});
  try {
    const res: any = await sendRawQuery(
      CREATE_NEW_PATH_BLOCK(topicId, studentId),
      token
    );
    console.log({res});
    return res.msg
      ? {msg: res.msg, success: false}
      : {
          ...res.data.createPathBlockPresentation.blockPresentation,
          success: true,
        };
  } catch (e) {
    console.log(e);
    return {msg: 'Network error!', success: false};
  }
};

export const newFinishBlock = async (
  blkPTId: string,
  batteryLevel: number,
  hits: number,
  errors: number,
  bonusCoins: number,
  questions: string,
  earning: any,
  token: string
) => {
  const res: any = await mutation(
    FINISH_BLK_PT(blkPTId, batteryLevel, hits, errors, bonusCoins, questions),
    token
  ).catch(() => ({success: false}));
  if (res.success === false) {
    return {success: false, msg: 'Network Error'};
  }

  const result: any = await res.json();

  if (result.errors) {
    return {success: false, msg: result.errors[0].message};
  }
  return {success: true, msg: 'Success!', res: result};
};

// Get Question Block By Id, this is for test
export const doGetQuestionBlockById = async (blkId: number, token: string) => {
  try {
    const res: any = await sendRawQuery(GET_QUESIONS(blkId), token);
    return res.msg
      ? {msg: res.msg, success: false}
      : {...res.data.blockPresentationById, success: true};
  } catch (e) {
    console.log(e);
    return {msg: 'Network error!', success: false};
  }
};

export const doFetchStudentAnswerHistory = async (
  studentId: number,
  period: number,
  answerStatus: string,
  token: string
) => {
  const res: any = await fetchQuery(
    FETCH_STUDENT_ANSWER_HISTORY(studentId, period, answerStatus),
    token
  );
  return res.data?.blockQuestionPresentationHistoryByStudentIdAndPeriodAndAnswerstate ?? res.errors[0];
};
