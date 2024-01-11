import {
    GAME,
    GAME_CATEGORY
} from '../fragments/gameFragments';

export const GAMES_QUERY = `
    {
        ${GAME}
    }
`;

export const GAMES_CATEGORY_QUERY = `
    {
        ${GAME_CATEGORY}
    }
`;

export const GAMES_BY_CATEGORY_NAME_QUERY = `
    {
        ${GAME}
    }
`;
