import { GUARDIAN, }          from '../fragments/guardianFragments';
import { USER, USER_PROFILE } from '../fragments/userFragments'
import { token }              from '../fragments/tokenFragments'

export const CREATE_GUARDIAN = (email: string, username: string, password: string) => `
	createGuardian(email: "${email}", username: "${username}", password: "${password}") {
        guardian {
            ${GUARDIAN}
        }
        user {
            ${USER}
        }
        profile {
            ${USER_PROFILE}
        }
        token
        refreshToken
	}
`;

export const TOKEN_AUTH = (username: string, password: string) => `
    tokenAuth(username: "${username}", password: "${password}") {
        ${token}
    }
`
