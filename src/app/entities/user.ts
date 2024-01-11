import { IAreasOfKnowledge } from './areasOfKnowledge';

export interface IUser {
  lastLogin: Date;
  isSuperuser: boolean;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  isActive: boolean;
  dateJoined: Date;
  language: string
  // student: IStudent;
  // guardian: IStudent;
  profile: {
    role: string,
  }
  token: string;
  // gender: Gender;
  // avatar: string;
  // avatarFavorites: string[];
  // activeGroupId: string;
  // DoB: Date;
}

export interface IAudience {
  id: string;
  identifier: string;
  isActive: boolean;
  randomSlug: string;
  slug: string;
  name: string;
  areaofknowledgeSet: IAreasOfKnowledge[];
}
