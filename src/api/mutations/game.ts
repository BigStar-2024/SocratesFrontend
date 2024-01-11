import { GAME, PLAY_GAME_TRANSACTION} from '../fragments/gameFragments';
import { STUDENT }                    from '../fragments/studentFragments'

export const PLAY_GAME = (
  gameId: number,
) => `
mutation {
  playGame( game: ${gameId} ) {
    playGameTransaction {
        ${PLAY_GAME_TRANSACTION}
    }
    student {
        ${STUDENT}
    }
    game {
        ${GAME}
    }
    gameContent
  }
}
`;
