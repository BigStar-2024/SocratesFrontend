import { FC, useContext, useEffect, useState }  from 'react';
import { LoadingContext }                       from 'react-router-loading';
import { useParams }                            from 'react-router-dom';
import { useSelector, useDispatch }             from 'react-redux'

import { GameCardPresentation } from 'views/molecules/GameCardPresentation';
import { GameMenuButton }       from 'views/molecules/GameMenuButton';
import { Spinner }              from 'views/atoms/Spinner';
import { StudentMenu }          from 'views/pages/Student/Menus/StudentMenu';
import { BasicColor }           from 'views/Color';
import arcade                   from 'views/assets/arcade.svg';
import learning                 from 'views/assets/learn.svg';
import adventure                from 'views/assets/adventure.svg';
import sport                    from 'views/assets/sports.svg';
import skill                    from 'views/assets/skills.svg';
import strategy                 from 'views/assets/strategy.svg'
import { getGameByCategory }    from 'app/actions/gameActions'
import { setCoinWallet }        from 'app/actions/studentActions'
import { dictionary }           from './dictionary';
import { GamesMenuContainer, GamesMenuTitleContainer, Wrapper } from './Styles';

interface GameCategoryParams {
  category: 'arcade' | 'learning' | 'adventure' | 'sport' | 'skill' | 'strategy';
}

interface GameCardParam {
  id         : number,
  randomSlug : string
  image      : string
  cost       : number,
  playStats  : number,
  name       : string,
  path       : string
}
export const GamesMenu: FC = () => {

  const loadingContext  = useContext(LoadingContext);
  const {category}      = useParams<GameCategoryParams>();
  const user            = useSelector((state: any) => state.user)
  const student         = useSelector((state: any) => state.student)
  let language:string   = useSelector((state: any) => state.user.language);
  language              = language? language : 'en-us'
  const dispatch        = useDispatch()

  const [loading,   setLoading]   = useState(false)
  const [gameCards, setGameCards] = useState<GameCardParam[]>([])

  const gameMenuImgs = {
    arcade    : arcade,
    learning  : learning,
    adventure : adventure,
    sport     : sport,
    skill     : skill,
    strategy  : strategy,
  }

  const gameMenuColor = {
    arcade     : BasicColor.red,
    learning   : BasicColor.green,
    adventure  : BasicColor.aqua,
    sport      : BasicColor.blue,
    skill      : BasicColor.purple,
    strategy   : BasicColor.yellow,
  }

  useEffect(() => {

    onComponentLoad();

  }, []);

  const onComponentLoad = async() => {

    await setCoinWallet(student.id, user.token, dispatch)
    await getGamesList();
    loadingContext.done();

  }

  const getGamesList = async () => {

    const result = await getGameByCategory(dictionary[language][category], user.token, null)
    setGameCards(result.data)

  }

  if(loading) return (<Spinner />)
  return (
    <>
      <Wrapper>
        <StudentMenu>
          <GamesMenuTitleContainer>
            <GameMenuButton
              gameMode      = {dictionary[language][category]}
              gameModeImage = {gameMenuImgs[category]}
              color         = {gameMenuColor[category]}
              isButton      = {false}
            />
          </GamesMenuTitleContainer>
          <GamesMenuContainer>
            {gameCards.map((item, i) => (
              <GameCardPresentation
                gameName  = {item.name}
                gameImage = {item.image}
                gamePath  = {item.path}
                price     = {item.cost}
                token     = {user.token}
                setLoading= {setLoading}
                key       = {i}
              />
            ))}
          </GamesMenuContainer>
        </StudentMenu>
      </Wrapper>
    </>
  );
};
