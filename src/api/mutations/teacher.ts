import { USER, USER_PROFILE } from 'api/fragments/userFragments';

export const CREATE_SCHOOL = (
    country: string,
    district: string,
    firstName: string,
    lastName: string,
    email: string,
    name: string,
    password: string,
    type: string,
    userName: string,
    zip: string,
) => `
mutation {
	createSchool (
        country: "${country}",
        district: "${district}",
        firstName: "${firstName}",
        lastName: "${lastName}",
        email: "${email}",
        name: "${name}",
        password: "${password}",
        type: "${type}",
        username: "${userName}",
        zip: "${zip}",
    ) {
        user {
            ${USER}
            profile {
                ${USER_PROFILE}
            }
        }
        token
        refreshToken
	}
}
`;

export const CREATE_TEACHER = (
    country: string,
    couponCode: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    schoolId: string,
    userName: string,
    zip: string,
) => `
mutation {
	createTeacher (
        country: "${country}",
        couponCode: "${couponCode}",
        email: "${email}",
        firstName: "${firstName}",
        lastName: "${lastName}",
        password: "${password}",
        schoolId: "${schoolId}",
        username: "${userName}",
        zip: "${zip}",
    ) {
        user {
            ${USER}
            profile {
                ${USER_PROFILE}
            }
        }
        token
	}
}
`;
