import { FC }             from 'react';
import styled             from 'styled-components';
import { ScreenSize }     from 'constants/screenSize';
import { GameMenuButton } from 'views/molecules/GameMenuButton';
import { BasicColor }     from 'views/Color';
import arcade             from 'views/assets/arcade.svg';
import learning           from 'views/assets/learn.svg';
import adventure          from 'views/assets/adventure.svg';
import sport              from 'views/assets/sports.svg';
import skill              from 'views/assets/skills.svg';
import strategy           from 'views/assets/strategy.svg'
import { dictionary }     from 'views/pages/Student/Games/dictionary';
import { useHistory }     from 'react-router-dom';
import { useSelector }    from 'react-redux';

export const GameMainMenu: FC = () => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'
  const history = useHistory();

  return (
    <>
      <GameMainMenuStyle>
        <GameMenuButton
          gameMode={dictionary[language]?.arcade}
          gameModeImage={arcade}
          color={BasicColor.red}
          onClick={() => history.push('/games/arcade')}
          isButton={true}
        />
        <GameMenuButton
          gameMode={dictionary[language]?.sport}
          gameModeImage={sport}
          color={BasicColor.blue}
          onClick={() => history.push('/games/sport')}
          isButton={true}
        />
        <GameMenuButton
          gameMode={dictionary[language]?.learning}
          gameModeImage={learning}
          color={BasicColor.green}
          onClick={() => history.push('/games/learning')}
          isButton={true}
        />
        <GameMenuButton
          gameMode={dictionary[language]?.skill}
          gameModeImage={skill}
          color={BasicColor.purple}
          onClick={() => history.push('/games/skill')}
          isButton={true}
        />
        <GameMenuButton
          gameMode={dictionary[language]?.adventure}
          gameModeImage={adventure}
          color={BasicColor.aqua}
          onClick={() => history.push('/games/adventure')}
          isButton={true}
        />
        <GameMenuButton
          gameMode={dictionary[language]?.strategy}
          gameModeImage={strategy}
          color={BasicColor.yellow}
          onClick={() => history.push('/games/strategy')}
          isButton={true}
        />
      </GameMainMenuStyle>
    </>
  );
};

const GameMainMenuStyle = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  margin-top: 20px;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    width: 70%;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0;
  }
`;
