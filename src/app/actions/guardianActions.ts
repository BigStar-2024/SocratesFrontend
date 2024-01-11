import mutationFetch from 'api/mutations/get';
import {
    CREATE_GUARDIAN,
    UPDATE_EMAIL_PASSWORD,
    FETCH_GUARDIAN_AVAILABLE_BOUGHT_PLANS,
    UPDATE_GUARDIAN_AVAILABLE_BOUGHT_PLAN,
    CANCEL_GUARDIAN_BOUGHT_PLAN,
    FETCH_PLANS,
    ADD_STUDENT_PLAN_PACKAGE,
    CANCEL_MEMBERSHIP,
    CONFIRM_UPDATE_GUARDIAN_PLAN,
    FETCH_GUARDIAN_STUDENTS,
    FETCH_AVAILABLE_PLANS,
    FETCH_STUDENT_BY_ID,
    FETCH_GUARDIAN_PLANS,
    CONFIRM_PAYMENT_ORDER
} from 'api/mutations/guardians';
import {
    CREATE_STUDENT_PLAN,
} from 'api/mutations/students'
import { fetchQuery, sendRawQuery } from 'api/queries/get';
import * as TYPES from 'app/types'

export const createGuardian = async (email: string, firstName: string, lastName: string, userName: string, password: string, couponCode: string, dispatch: any, language: string) => {
    const res: any = await mutationFetch(
        CREATE_GUARDIAN(email, firstName, lastName, userName, password, couponCode, language)
    ).catch(() => ({ success: false }));

    if (res.success === false) {
        return { success: false, msg: 'Network Error!' };
    }

    const result: any = await res.json();

    if (result.errors) {
        return { success: false, msg: result.errors[0].message };
    }

    const { guardian, user, token, refreshToken } = result.data.createGuardian;

    dispatch({
        type: TYPES.GUARDIAN_SET_DATA,
        payload: guardian,
    });
    dispatch({
        type: TYPES.USER_SET_DATA,
        payload: { ...user, token: token, refreshToken: refreshToken },
    });

    return { success: true, msg: 'Success', data: result.data }
}

export const doUpdateGuardianEmailPassword = async (email: string, username: string, password: string, token: string) => {
    const res: any = await sendRawQuery(
        UPDATE_EMAIL_PASSWORD(email, username, password),
        token
    );

    return res.msg ? null : res.data.changeGuardianEmailPassword.user;
}

export const doFetchAvailableBroughtPlans = async (guardianId: number, token: string) => {
    const res: any = await sendRawQuery(
        FETCH_GUARDIAN_AVAILABLE_BOUGHT_PLANS(guardianId),
        token
    );
    return res.msg ? null : res.data.guardianAvailableBroughtPlan;
}

export const doUpdateBroughtPlan = async (guardianId: number, orderDetailId: number, token: string) => {
    try {
        const res: any = await sendRawQuery(
            UPDATE_GUARDIAN_AVAILABLE_BOUGHT_PLAN(guardianId, orderDetailId),
            token
        );
        return res.msg ? { status: false, message: res.msg } : res.data.updateGuardianPlan;
    }
    catch (e: any) {
        console.log(e)
        return { status: false, message: e.message }
    }
}

export const doConfirmUpdate = async (orderId: number, token: string) => {
    try {
        const res: any = await sendRawQuery(
            CONFIRM_UPDATE_GUARDIAN_PLAN(orderId),
            token
        );
        return res.msg ? { status: false } : res.data.confirmUpdateGuardianPlan;
    }
    catch {
        return { status: false }
    }
}

// export const doFetchPlanTypes = async (token: string) => {
//     try {
//         const res: any = await sendRawQuery(
//             FETCH_PLANS,
//             token
//         );
//         return res.msg ? { status: false } : res.data.plans;
//     }
//     catch {
//         return { status: false }
//     }
// }


export const doFetchPlanTypes = async (token: string) => {
    const res: any = await fetchQuery(
        FETCH_PLANS,
        token
    );
    return res.data.plans ?? res.errors[0]
}

export const doCancelBroughtPlan = async (orderDetailId: number, reason: string, token: string) => {
    try {
        const res: any = await sendRawQuery(
            CANCEL_GUARDIAN_BOUGHT_PLAN(orderDetailId, reason),
            token
        );
        return res.msg ? { status: false } : res.data.cancelGuardianPlan;
    }
    catch {
        return { status: false }
    }
}


// For React-query
export const doAddStudentPlan = async (
    guardianId: number, planId: number, period: string, token: string
) => {
    const res: any = await fetchQuery(
        ADD_STUDENT_PLAN_PACKAGE(guardianId, planId, period),
            token
    );
    return res.data?.addGuardianPlan ?? res.errors[0] // when django returns error message on fail
}

// Resend confirm mutation when add new plan succeed.
export const confirmPaymentOrder = async (
    orderId: number, token: string
) => {
    try {
        const res: any = await sendRawQuery(
            CONFIRM_PAYMENT_ORDER(orderId),
            token
        );
        return res.msg ? { msg: res.msg } : res.data.confirmPaymentOrder;
    }
    catch (e: any) {
        return { msg: e.message }
    }
}

export const doCancelMembership = async (guardianId: number, reason: string, token: string) => {
    try {
        const res: any = await sendRawQuery(
            CANCEL_MEMBERSHIP(guardianId, reason),
            token
        );
        return res.msg ? { status: false } : res.data.cancelMemberShip;
    }
    catch {
        return { status: false }
    }
}

export const doFetchGuardianStudents = async (guardianId: number, token: string) => {
    const res: any = await fetchQuery(
        FETCH_GUARDIAN_STUDENTS(guardianId),
        token
    );
    return res.data.guardianById?.guardianstudentplanSet ?? res.errors[0]
}

export const doFetchGuardianPlans = async (guardianId: number, token: string) => {
    const res: any = await fetchQuery(
        FETCH_GUARDIAN_PLANS(guardianId),
        token
    );
    return res.data?.guardianStudentPlanByGuardianId ?? res.errors[0]
}

export const doFetchStudentById = async (studentId: number, token: string) => {
    const res: any = await fetchQuery(
        FETCH_STUDENT_BY_ID(studentId),
        token
    );
    return res.data.studentById
}

export const doFetchGuardianAvailablePlans = async (guardianId: number, token: string) => {
    const res: any = await fetchQuery(
        FETCH_AVAILABLE_PLANS(guardianId),
        token
    );
    return res.data.guardianById.availableGuardianstudentplan
}

export const doCreateStudentPlan = async (
    audience: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    guardianStudentPlanId: number,
    listSubjectId: number[],
    studentPlan: number,
    gradeId: number,
    token: string,
) => {
    const res: any = await fetchQuery(
        CREATE_STUDENT_PLAN(
            audience,
            firstName,
            lastName,
            username,
            password,
            guardianStudentPlanId,
            listSubjectId,
            studentPlan,
            gradeId,
        ),
        token
    );
    return res.data?.createStudent?.guardian.availableGuardianstudentplan ?? res.errors[0] // when django returns error message on fail
}


