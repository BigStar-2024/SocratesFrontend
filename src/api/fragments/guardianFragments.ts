import { STUDENT_RAW } from './studentFragments'
import { PAYMENT_METHOD, GUARDIAN_STUDENT_PLAN_RAW, PLAN } from '../fragments/paymentFragments'
import { COUPON_COODE, } from '../fragments/paymentFragments';
import { GRADES } from '../fragments/peopleFragments'
import {
    // AVATAR,
    AVATAR_RAW
} from './avatarFragments'
export const GUARDIAN_STUDENT = `
    id
    identifier
    randomSlug
`;

export const GUARDIAN_RAW = `
    id
    isActive
    firstName
    lastName
    gender
`;
export const GUARDIAN_RAW_OLD = `
    id
    identifier
    isActive
    deletedTimestamp
    randomSlug
    createTimestamp
    updateTimestamp
    firstName
    lastName
    gender
`;

export const GUARDIAN = `
    ${GUARDIAN_RAW}
    couponCode {
        ${COUPON_COODE}
    }
    paymentMethod {
        ${PAYMENT_METHOD}
    }
    guardianstudentplanSet {
        plan {
            id
        }
    }
`
export const GUARDIAN_OLD = `
    ${GUARDIAN_RAW}
    couponCode {
        ${COUPON_COODE}
    }
    guardianstudentSet {
        ${GUARDIAN_STUDENT}
        student {
            ${STUDENT_RAW}
            currentAvatarHead{
                ${AVATAR_RAW}
            }
            currentAvatarAccessories{
                ${AVATAR_RAW}
            }
            currentAvatarClothes{
                ${AVATAR_RAW}
            }
            currentAvatarPants{
                ${AVATAR_RAW}
            }
            audience {
                gradeSet {
                    ${GRADES}
                }
            }
            grade {
                grade{
                    ${GRADES}
                }
            }
            user{
                id
                username
                language
            }
        }
    }
    guardianstudentplanSet {
        plan {
            ${PLAN}
        }
        ${GUARDIAN_STUDENT}
        student {
            ${STUDENT_RAW}
            currentAvatarHead{
                ${AVATAR_RAW}
            }
            currentAvatarAccessories{
                ${AVATAR_RAW}
            }
            currentAvatarClothes{
                ${AVATAR_RAW}
            }
            currentAvatarPants{
                ${AVATAR_RAW}
            }
            audience {
                gradeSet {
                    ${GRADES}
                }
            }
            grade {
                grade{
                    ${GRADES}
                }
            }
            user{
                id
                username
                language
            }
        }
    }
    paymentMethod {
        ${PAYMENT_METHOD}
    }
    availableGuardianstudentplan{
        id
        plan{
            ${PLAN}
        }
      }
`
