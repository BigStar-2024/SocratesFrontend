import query            from 'api/queries/get'
import { GRADES_QUERY } from 'api/queries/people'
import * as TYPES       from 'app/types'

export const getGrades = async (token: string, dispatch: any) => {
  const res: any = await query('grades', GRADES_QUERY).catch(e => ({ success: false }));

  if (res.success === false) {
    return { success: false, msg: 'Network Error!' };
  }

  const result: any = await res.json();

  if (result.errors && !result.data) {
    return { success: false, msg: result.errors[0].message };
  }

  const grades = result.data.grades
  dispatch({ type: TYPES.GRADE_SET_DATA, payload: grades })

  return { success: true, msg: 'Success', data: result.data }
}
