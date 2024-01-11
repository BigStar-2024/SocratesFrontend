import mutation from 'api/mutations/get'
import { TOKEN_AUTH } from 'api/mutations/users'
import query, { sendRawQuery } from 'api/queries/get'
import { WHOAMI_QUERY } from 'api/queries/users'
import { INTEREST_QUERY } from 'api/queries/interests'
import { NEXT_LEVEL_QUERY } from 'api/queries/questions'
// import { getGrades }           from 'views/../app/actions/gradeActions'


import * as TYPES from 'app/types'
import { doUpdateUserLanguage } from './studentActions'
import { USER_TYPE } from 'constants/common'

export const login = async (username: string, password: string, dispatch: any, language: string) => {
  const res: any = await mutation(TOKEN_AUTH(username, password)).catch(() => ({ success: false }));
  if (res.success === false) {
    return { success: false, msg: 'Network Error' };
  }

  const result: any = await res.json();

  if (result.errors) {
    return { success: false, msg: result.errors[0].message };
  }

  const { token } = result.data.tokenAuth
  // dispatch({ type: TYPES.USER_SET_TOKEN, payload: { token: token } })


  // Update user language from welcome page
  await doUpdateUserLanguage(language, token)

  const res_who: any = await query('whoami', WHOAMI_QUERY, token).catch(() => ({ success: false }));

  if (res_who.success === false) {
    return { success: false, msg: 'Network Error!' };
  }

  const result_who: any = await res_who.json();

  if (result_who.errors && !result_who.data) {
    return { success: false, msg: result_who.errors[0].message };
  }
  const { guardian, student } = result_who.data.whoami;



  const res_interests: any = await query('interests', INTEREST_QUERY, token).catch(() => ({ success: false }));
  if (res_interests.success === false) {
    return { success: false, msg: 'Network Error!' };
  }

  const result_interests: any = await res_interests.json();

  if (result_interests.errors && !result_interests.data) {
    return { success: false, msg: result_interests.errors[0].message };
  }
  const interests = result_interests.data.interests
  const user = result_who.data.whoami;
  const user_redux: any = (({ lastLogin, isSuperuser, username, firstName, lastName, email, isStaff, isActive, dateJoined, language, profile }) => ({ lastLogin, isSuperuser, username, firstName, lastName, email, isStaff, isActive, dateJoined, language, profile }))(user)

  // dispatch({ type: TYPES.USER_SET_DATA, payload: { ...user_redux } })
  dispatch({ type: TYPES.USER_SET_DATA, payload: { ...user_redux, token: token } })

  if (student) {
    dispatch({ type: TYPES.USER_SET_DATA, payload: { ...user_redux, token: token } })
    dispatch({ type: TYPES.STUDENT_SET_DATA, payload: student })
    dispatch({
      type: TYPES.EARNING_SET_DATA, payload: {
        rank: 1,
        level_name: student.level.name,
        level: student.level.amount,
        exp: parseInt(student.points),
        expMax: student.level.pointsRequired,
        progress: 0,
        energyCharge: student.battery.level,
        balance: student.coinWallet.balance,
      }
    })
    dispatch({ type: TYPES.AVATAR_SET_DEFAULT_LOGIN, payload: student })
    dispatch({ type: TYPES.INTEREST_SET_DATA, payload: interests })
    return { success: true, msg: 'Successfully Logined!', userType: USER_TYPE.student }
  }
  else if (guardian) {
    dispatch({ type: TYPES.GUARDIAN_SET_DATA, payload: guardian })
    if (guardian.guardianstudentplanSet?.length === 0)
      return { success: true, msg: 'Successfully Logged in!', userType: USER_TYPE.noPlans }
    return { success: true, msg: 'Successfully Logined!', userType: USER_TYPE.guardian }
  }
  else {
    // dispatch({ type: TYPES.TEACHER_SET_DATA, payload: teacher })
    return { success: true, msg: 'Successfully Logined!', userType: USER_TYPE.teacher }
  }
}

export const getNextLevel = async (currentLevelAmount: number, token: string, dispatch: any) => {
  const res: any = await sendRawQuery(NEXT_LEVEL_QUERY(currentLevelAmount), token)
  if (!res.msg) {
    dispatch({ type: TYPES.STUDENT_SET_NEXT_LEVEL, payload: res.data.nextLevelByAmount });
    return res.data.nextLevelByAmount;
  }
  else return { msg: res.msg }
}

export const resetReducer = async (dispatch: any) => {
  dispatch({ type: TYPES.AVATAR_RESET });
  dispatch({ type: TYPES.EARNING_RESET });
  dispatch({ type: TYPES.GRADE_RESET });
  dispatch({ type: TYPES.GUARDIAN_RESET });
  dispatch({ type: TYPES.INTEREST_RESET })
  dispatch({ type: TYPES.STUDENT_RESET });
  dispatch({ type: TYPES.USER_RESET });
}
