import {
  COLLECTIBLE_CATEGORY, CARD
} from '../fragments/collectibleFragments';

export const COLLECTIBLE_CATEGORY_QUERY = `{
  collectiblesCategory {
      ${COLLECTIBLE_CATEGORY}
    }
}
`;

export const COLLECTIBLE_PACK_COUNT = (category: number) => `
query CollectibleCount {
  collectibleCountByCategory(categoryId: ${category})
}
`;

export const COLLECTIBLE_PURCHASED_COUNT = (category: number) => `
query CollectiblePurchasedCount {
  purchasedCollectibleCountByCategory(categoryId: ${category})
}
`;

export const COLLECTIBLES_BY_CATEGORY_ID = (category: number) => `
query {
  collectiblesByCategory(categoryId: ${category}) {
    ${CARD}
  }
}
`;
