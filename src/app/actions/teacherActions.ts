import { CREATE_SCHOOL, CREATE_TEACHER } from "api/mutations/teacher";
import { fetchQuery } from 'api/queries/get';

export const doCreateSchool = async (
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
) => {
  const res: any = await fetchQuery(
      CREATE_SCHOOL(
        country,
        district,
        firstName,
        lastName,
        email,
        name,
        password,
        type,
        userName,
        zip,
      )
  );
  return res.data?.createSchool ?? res.errors[0] // when django returns error message on fail
}

export const doCreateTeacher = async (
  country: string,
  couponCode: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  schoolId: string,
  userName: string,
  zip: string,
) => {
  const res: any = await fetchQuery(
      CREATE_TEACHER(
        country,
        couponCode,
        email,
        firstName,
        lastName,
        password,
        schoolId,
        userName,
        zip,
      )
  );
  return res.data?.createTeacher?.user ?? res.errors[0] // when django returns error message on fail
}

export const teacherCreatesStudent = (payload: string) => ({
  type: 'TEACHER_CREATE_STUDENT',
  payload,
});

export const teacherAuthStudent = (payload: string) => ({
  type: 'TEACHER_AUTH_STUDENT',
  payload,
});

export const teacherCreateGroup = (payload: string) => ({
  type: 'TEACHER_CREATE_GROUP',
  payload,
});

export const teacherRemoveGroup = (payload: string) => ({
  type: 'TEACHER_REMOVE_GROUP',
  payload,
});

export const teacherAddStudent = (payload: string) => ({
  type: 'TEACHER_ADD_STUDENT',
  payload,
});

export const teacherRemoveStudent = (payload: string) => ({
  type: 'TEACHER_REMOVE_STUDENT',
  payload,
});
