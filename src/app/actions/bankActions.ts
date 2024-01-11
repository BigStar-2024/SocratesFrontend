import mutation              from 'api/mutations/get';
import { WITHDRAW, DEPOSIT } from 'api/mutations/bank';
import * as TYPES            from 'app/types'

export const withDraw = async (amount: number,token: string, dispatch: any) => {
    const res:any = await mutation(WITHDRAW( amount ), token).catch(() => ({success: false}));
    if(res.success === false) {
        return {success: false, msg: 'Network Error'};
    }

    const result:any = await res.json();

    if(result.errors) {
        return {success: false, msg: result.errors[0].message};
    }

    const { student } = result.data.BankAccountWithdraw
    dispatch({ type: TYPES.STUDENT_SET_DATA, payload: student })
    dispatch({ type: TYPES.EARNING_SET_DATA, payload: {
        rank: 1,
        level_name: student.level.name,
        level: student.level.amount,
        exp: parseInt(student.points),
        expMax: student.level.pointsRequired,
        progress: 0,
        energyCharge: 0,
        balance: student.coinWallet.balance,
    }})
    return {success: true, msg: 'Success!'}
}

export const deposit = async (amount: number,token: string, dispatch: any) => {
    const res:any = await mutation(DEPOSIT( amount ), token).catch(() => ({success: false}));
    if(res.success === false) {
        return {success: false, msg: 'Network Error'};
    }

    const result:any = await res.json();

    if(result.errors) {
        return {success: false, msg: result.errors[0].message};
    }

    const { student } = result.data.BankAccountDeposit

    dispatch({ type: TYPES.STUDENT_SET_DATA, payload: student })
    dispatch({ type: TYPES.EARNING_SET_DATA, payload: {
        rank: 1,
        level_name: student.level.name,
        level: student.level.amount,
        exp: parseInt(student.points),
        expMax: student.level.pointsRequired,
        progress: 0,
        energyCharge: 0,
        balance: student.coinWallet.balance,
    }})
    return {success: true, msg: 'Success!'}
}
