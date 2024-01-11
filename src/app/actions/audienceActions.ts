import query                        from '../../api/queries/get'
import {AUDIENCES_WITH_GRADE_QUERY} from '../../api/queries/people'

export const getAudiencesWithGrades = async() => {
    const res:any = await query('audiences', AUDIENCES_WITH_GRADE_QUERY).catch(() => ({success: false}));

    if(res.success === false) {
      return {success: false, msg: 'Network Error!'};
    }

    const result:any = await res.json();

    if(result.errors && !result.data) {
      return {success: false, msg: result.errors[0].message};
    }

    const audiences = result.data.audiences

    return {success: true, msg: 'Success', data: audiences}
}
