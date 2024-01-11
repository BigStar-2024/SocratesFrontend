import { STUDENT }          from '../fragments/studentFragments';
import { BANK_MOVEMENT }    from '../fragments/bankFragments'

export const WITHDRAW = (
    amount: number
) => `
BankAccountWithdraw( amount: ${amount}) {
    student {
        ${STUDENT}
    }
    bankMovement {
        ${BANK_MOVEMENT}
    }
}
`;

export const DEPOSIT = (
    amount: number
) => `
BankAccountDeposit( amount: ${amount}) {
    student {
        ${STUDENT}
    }
    bankMovement {
        ${BANK_MOVEMENT}
    }
}
`;
