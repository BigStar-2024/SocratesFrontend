import {
  teacherAddStudent,
  teacherAuthStudent,
  teacherCreateGroup,
  teacherCreatesStudent,
  teacherRemoveGroup,
  teacherRemoveStudent,
} from '../actions/teacherActions';

test('Teacher invokes add student action', () => {
  const {type, payload} = teacherAddStudent('test');
  expect(type).toBe('TEACHER_ADD_STUDENT');
  expect(payload).toBe('test');
});

test('Teacher invokes authenticate student action', () => {
  const {type, payload} = teacherAuthStudent('test');
  expect(type).toBe('TEACHER_AUTH_STUDENT');
  expect(payload).toBe('test');
});

test('Teacher invokes create group action', () => {
  const {type, payload} = teacherCreateGroup('test');
  expect(type).toBe('TEACHER_CREATE_GROUP');
  expect(payload).toBe('test');
});

test('Teacher invokes create student action', () => {
  const {type, payload} = teacherCreatesStudent('test');
  expect(type).toBe('TEACHER_CREATE_STUDENT');
  expect(payload).toBe('test');
});

test('Teacher invokes remove group action', () => {
  const {type, payload} = teacherRemoveGroup('test');
  expect(type).toBe('TEACHER_REMOVE_GROUP');
  expect(payload).toBe('test');
});

test('Teacher invokes remove student action', () => {
  const {type, payload} = teacherRemoveStudent('test');
  expect(type).toBe('TEACHER_REMOVE_STUDENT');
  expect(payload).toBe('test');
});
