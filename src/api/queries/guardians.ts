import { GUARDIAN, GUARDIAN_STUDENT }                   from '../fragments/guardianFragments';
import { USER, USER_PROFILE }                           from '../fragments/userFragments'
export const GUARDIANS_QUERY = `
    {
        ${GUARDIAN}
    }
`;

export const WHOAMI_QUERY = `
    {
        ${USER}
        profile {
            ${USER_PROFILE}
        }
    }
`;
