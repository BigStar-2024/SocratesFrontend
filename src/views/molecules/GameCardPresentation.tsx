import { FC } from 'react';
import styled from 'styled-components';
import { UserInfo } from 'views/atoms/Text/UserInfo';
import { BasicColor } from 'views/Color';
import coin from 'views/assets/coin.svg';
import { useHistory } from 'react-router-dom';

type GameCardProps = {
  gameName: string;
  gameImage: string;
  price: number;
  gamePath: string;
  token: string;
  setLoading: any;
};

export const GameCardPresentation: FC<GameCardProps> = ({
  gameName,
  gameImage,
  price,
  gamePath,
  token,
  setLoading
}) => {
  const history = useHistory();
  const handlePlay = () => {
    // setLoading(true)
    // const url = process.env.REACT_APP_SERVER_URL + 'media/games/' + gamePath + '/gamePlay?token=' + token;
    // location.href = url;

    // console.log({ token, gamePath })
    history.push('/games/' + token + '/' + gamePath)
  }

  return (
    <>
      <GameCardStyles onClick={handlePlay}>
        <GameCardTitleContainer>
          <UserInfo isDark={true}>{gameName}</UserInfo>
        </GameCardTitleContainer>
        <GameCardImage src={gameImage} />
        <GameCardPriceContainer>
          <GameCardPrice>
            <UserInfo>{price}</UserInfo>
            <CoinImage src={coin} />
          </GameCardPrice>
        </GameCardPriceContainer>
      </GameCardStyles>
    </>
  );
};

const GameCardStyles = styled.div`
  width: 150px;
  height: 150px;
  box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.25);
  text-align: center;
  font-size: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
  cursor: pointer;
  background-color: ${BasicColor.white};
  &:hover {
    transform: scale(1.1);
  }
`;
const GameCardTitleContainer = styled.div`
  width: 95%;
  height: 30px;
  margin: 0 auto;
`;
const GameCardImage = styled.img`
  width: 70px;
  height: 70px;
  margin-top: 10px;
`;

const GameCardPriceContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const GameCardPrice = styled.div`
  width: fit-content;
  height: 20px;
  border-radius: 20px;
  margin: 5px;
  display: flex;
  align-content: center;
  grid-gap: 2px;
  justify-content: flex-end;
  background-color: ${BasicColor.blue};
  padding-top: 3px;
`;
const CoinImage = styled.img`
  width: 20px;
  border-radius: 100%;
`;
