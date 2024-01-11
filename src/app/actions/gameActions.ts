import mutation                              from 'api/mutations/get'
import { PLAY_GAME }                         from 'api/mutations/game'
import query                                 from 'api/queries/get'
import { GAMES_QUERY, GAMES_CATEGORY_QUERY } from 'api/queries/games'
import * as TYPES                            from 'app/types'

export const getGameCategories = async (token: string, dispatch: any) => {
  const res: any = await query('gamesCategory', GAMES_CATEGORY_QUERY, token).catch(e => ({ success: false }));

  if (res.success === false) {
    return { success: false, msg: 'Network Error!' };
  }

  const result: any = await res.json();

  if (result.errors && !result.data) {
    return { success: false, msg: result.errors[0].message };
  }
  return { success: true, msg: 'Success', data: result.data }
}

export const getGameByCategory = async (categoryName: string, token: string, dispatch: any) => {
  const res: any = await query(`gamesByCategoryName(categoryName: "${categoryName}")`, GAMES_QUERY, token).catch(e => ({ success: false }));

  if (res.success === false) {
    return { success: false, msg: 'Network Error!' };
  }

  const result: any = await res.json();

  if (result.errors && !result.data) {
    return { success: false, msg: result.errors[0].message };
  }
  return { success: true, msg: 'Success', data: result.data.gamesByCategoryName }

}

export const playGame = async (gameId: number, token: string, dispatch: any) => {
  const res: any = await mutation(PLAY_GAME(gameId), token).catch(e => ({ success: false }));
  if (res.success === false) {
    return { success: false, msg: 'Network Error' };
  }

  const result: any = await res.json();

  if (result.errors) {
    return { success: false, msg: result.errors[0].message };
  }

  const { playGameTransaction, student, game, gameContent, } = result.data.playGame
  dispatch({ type: TYPES.STUDENT_SET_DATA, payload: student })
  dispatch({
    type: TYPES.EARNING_SET_DATA, payload: {
      rank: 1,
      level_name: student.level.name,
      level: student.level.amount,
      exp: parseInt(student.points),
      expMax: student.level.pointsRequired,
      progress: 0,
      energyCharge: 0,
      balance: student.coinWallet.balance,
    }
  })
  return { success: true, msg: 'Success!' }
}
