import { AUDIENCES }               from '../fragments/peopleFragments';
import { AREA_OF_KNOWLEDGE_QUERY } from './questions';
import { GRADES }                  from '../fragments/peopleFragments';

export const AUDIENCES_QUERY = `
    ${AUDIENCES}
    areaofknowledgeSet
    ${AREA_OF_KNOWLEDGE_QUERY}
`;

export const AUDIENCES_WITH_GRADE_QUERY = `{
    ${AUDIENCES}
    gradeSet {
        ${GRADES}
    }
}
`
export const AUDIENCES_WITH_GRADE_QUERY_OLD = `{
    ${AUDIENCES}
    gradeSet {
        ${GRADES}
    }
    areaofknowledgeSet
    ${AREA_OF_KNOWLEDGE_QUERY}
}
`

export const GRADES_QUERY = `{
    ${GRADES}
}
`
