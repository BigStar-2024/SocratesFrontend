import { CARD } from 'api/fragments/collectibleFragments';

export const PURCHASE_CARD_PACK = (
  collectibleCategory: number,
  packSize: number,
  student_id: number
) => `
mutation {
  purchaseCollectiblePack(
  collectibleCategory: ${collectibleCategory}, packSize: ${packSize}, student: ${student_id}
  ) {
    collectiblePackPurchaseTransaction{
      collectibles {
          ${CARD}
      }
    }
  }
}
`;

export const PURCHASE_AN_AVATAR_ITEM = (
  avatarId: number,
  studentId: number
) => `
mutation {
  purchaseAvatar(avatar:${avatarId}, student: ${studentId}){
    avatarPurchaseTransaction{
      id
      amount
    }
  }
}
`;

export const SET_FAVORITE = (
  accessoryId: number,
  headId:number,
  clothesId: number,
  footerId: number,
  skinTone: string,
  studentId: number
) => `
mutation {
  setFavoriteAvatarCollection(
    ${accessoryId ? 'avatarAccessorie: '+accessoryId:''}
    avatarHead: ${headId}
    avatarClothes: ${clothesId}
    avatarPants:${footerId}
    ${skinTone ? 'skinTone: '+'"' + skinTone + '"':''}
    studentId: ${studentId}
  ){
    favoriteAvatarCollection{
      avatarAccessorie{
        id
      }
      avatarHead{
        id
      }
      avatarClothes{
        id
      }
      avatarPants{
        id
      }
    }
  }
}
`;
