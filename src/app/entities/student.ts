import { Gender } from './gender';

export interface IStudent {
  deletedTimestamp: Date;
  randomSlug: string;
  createTimestamp: Date;
  updateTimestamp: Date;
  firstName: string;
  lastName: string;
  fullName: string;
  dob: Date;
  gender: Gender;
  activeGroupId: string;
  levelId: string;
  guardianId: string;
  schoolId: string;
  balance: number;
  studentPlan: IStudentPlan[];
  activeStudentPlan: IStudentPlan;
  avatarAccessories: []
}
export interface IStudentPlan {
  deletedTimestamp: Date;
  randomgSlug: string;
  createTimestamp: Date;
  updateTimestamp:Date;
  name: string;
  slug: string;
  audience: object;
  topicGrade: [];
  organizationSet: [];
  schoolSet: [];
}

export interface KidsListProps {
  username: string
  password: string
  // grade: string
  avatar: string
  language: string
  user: any
  student: any
  id: any
  audience: any
  grade: any
  guardianstudentplanSet: any
  currentAvatarAccessories: any
  currentAvatarHead: any
  currentAvatarClothes: any
  firstName: string
  parentName: string
  dateJoined: string
}
