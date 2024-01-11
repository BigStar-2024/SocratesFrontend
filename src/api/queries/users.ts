import { USER, USER_PROFILE, }                          from '../fragments/userFragments';
import { STUDENT, STUDENT_RAW }                                      from '../fragments/studentFragments'
import { COIN_WALLET }                                  from '../fragments/coinWalletFragments'
import { PAYMENT_METHOD, GUARDIAN_STUDENT_PLAN, ORDER, GUARDIAN_STUDENT_PLAN_RAW, PLAN } from '../fragments/paymentFragments'
import { COUPON_COODE, }                                from '../fragments/paymentFragments';
import { GRADES }                                       from '../fragments/peopleFragments'

import {
    GUARDIAN_STUDENT,
    GUARDIAN,
} from '../fragments/guardianFragments';
export const USERS_QUERY = `
    {
        ${USER}
        profile {
            ${USER_PROFILE}
        }

    }
`;

export const WHOAMI_QUERY = `
    {
        ${USER}
        student {
            ${STUDENT}
        }
        guardian {
            ${GUARDIAN}
        }
        profile {
            ${USER_PROFILE}
        }
    }
`;

export const STUDENT_WALLET_QUERY = `
    {
        coinWallet {
            ${COIN_WALLET}
        }
    }
`;
