import { FC }         from 'react';
import styled         from 'styled-components';
import { Title }      from 'views/atoms/Text/Title';
import { ScreenSize } from 'constants/screenSize';

type GameButtonProps = {
  gameMode: string;
  gameModeImage: string;
  color: string;
  onClick?: () => void;
  isButton: boolean;
};

export const GameMenuButton: FC<GameButtonProps> = ({
  gameMode,
  gameModeImage,
  color,
  onClick,
  isButton,
}) => {
  return (
    <>
      <CardGame color={color} onClick={onClick} isButton={isButton}>
        <Title>{gameMode}</Title>
        <CardGameImage src={gameModeImage} />
      </CardGame>
    </>
  );
};

type CardGameProps = {
  color: string;
  isButton: boolean;
};

const CardGame = styled.div<CardGameProps>`
  width: 65%;
  max-width: 280px;
  height: 70px;
  background-color: ${p => p.color};
  margin: 0 auto;
  border-radius: 9px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  cursor: ${p => (p.isButton ? 'pointer' : 'default')};

  &: hover {
    transform: scale(${p => (p.isButton ? 1.1 : 1)});
  }
  @media screen and (min-width: ${ScreenSize.tablet}) {
    padding: 10px;
    padding-right: 30px;
    padding-left: 30px;
    margin: 20px;
  }
`;

const CardGameImage = styled.img`
  widht: 70%;
  height: 40px;
`;
