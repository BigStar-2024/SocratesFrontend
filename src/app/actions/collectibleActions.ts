import { sendRawQuery } from 'api/queries/get';
import {
  COLLECTIBLE_CATEGORY_QUERY,
  COLLECTIBLE_PACK_COUNT,
  COLLECTIBLE_PURCHASED_COUNT,
  COLLECTIBLES_BY_CATEGORY_ID
} from 'api/queries/collectibles';
import { PURCHASE_CARD_PACK } from 'api/mutations/collectibles';
import { PURCHASE_CARDS } from '../types';

/**
 * @author Bruce Lee
 * @description get card category infos from graphql server
 */
export const getCardPacksInfo = async (token: string) => {

  const res: any = await sendRawQuery(
    COLLECTIBLE_CATEGORY_QUERY,
    token
  )
  if (!res.msg) {
    return res.data.collectiblesCategory;
  }
  else return { msg: res.msg }
};

/**
 * @author Bruce Lee
 * @description get a pack of 3 card names from graphql server
 */
export const purchaseCardPack = async (pack_id: number, student_id: number, token: string, dispatch: any, price: number) => {

  try {
    const res: any = await sendRawQuery(PURCHASE_CARD_PACK(pack_id, 3, student_id), token)
    if (!res.msg) {
      dispatch({ type: PURCHASE_CARDS, payload: { price: price } })
      return res.data.purchaseCollectiblePack.collectiblePackPurchaseTransaction.collectibles;
    }
    else return { msg: res.msg }
  } catch (e) {
    return { msg: e };
  }
};

/**
 * @author Bruce Lee
 * @description get total collectible count of given category
 */
export const getProgressTotalCount = async (category: number, token: string) => {

  const res: any = await sendRawQuery(
    COLLECTIBLE_PACK_COUNT(category),
    token
  );

  return res.msg ? { msg: res.msg } : res.data.collectibleCountByCategory;
};

/**
 * @author Bruce Lee
 * @description get purchased collectible count of given category
 */
export const getProgressPurchasedCount = async (category: number, token: string) => {

  const res: any = await sendRawQuery(
    COLLECTIBLE_PURCHASED_COUNT(category),
    token
  );

  return res.msg ? { msg: res.msg } : res.data.purchasedCollectibleCountByCategory;
};

/**
 * Fetch cards of given category id
 * @param category category id that user selects
 * @param token
 * @returns {success: true | false} when succeed, it returns array of cards of that category
 */
export const doFetchCategoryCollectibles = async (category: number, token: string) => {
  try {
    const res: any = await sendRawQuery(
      COLLECTIBLES_BY_CATEGORY_ID(category),
      token
    );

    return res.msg ?
      { msg: res.msg, succeed: false } :
      { cards: res.data.collectiblesByCategory, succeed: true };
  } catch (e: any) {
    return { msg: e.message, succeed: false }
  }

};
