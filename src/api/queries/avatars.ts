import { SIMPLE_AVATAR } from 'api/fragments/avatarFragments';

export const FETCH_USER_OWNED_AVATAR_ITEMS = (studentId: number) => `
  query {
    avatarsByStudentId(studentId: ${studentId}){
      avatar {
        id
      }
    }
  }
`;

export const FETCH_USER_FAVORITE_AVATARS = (studentId: number) => `
  query {
    studentById(id: ${studentId}){
      favoriteavatarcollectionSet{
        id
        avatarAccessorie {
          ${SIMPLE_AVATAR}
        }
        avatarHead {
          ${SIMPLE_AVATAR}
        }
        avatarClothes {
          ${SIMPLE_AVATAR}
        }
        avatarPants {
          ${SIMPLE_AVATAR}
        }
        skinTone
      }
    }
  }
`;

export const SET_CURRENT_USER_AVATAR_SET = (
  studentId: number,
  favoriteId: number
  ) => `
  mutation {
    setCurrentFavoriteAvatarCollection(favoriteAvatarCollectionId: ${favoriteId}, studentId: ${studentId}) {
      favoriteAvatarCollection {
        id
        avatarAccessorie{
          ${SIMPLE_AVATAR}
        }
        avatarHead{
          ${SIMPLE_AVATAR}
        }
        avatarClothes{
          ${SIMPLE_AVATAR}
        }
        avatarPants{
          ${SIMPLE_AVATAR}
        }
        skinTone
      }
    }
  }
`;
