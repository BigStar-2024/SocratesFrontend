import { FC, useState, useEffect } from 'react';
import styled                      from 'styled-components';
import coin                        from 'views/assets/coin.svg';
import ReactLoading                from 'react-loading';
import { getDownUrlByFilename }    from 'app/firebase';
import { BasicColor }              from 'views/Color';
import { ScreenSize }              from 'constants/screenSize';
import { dictionary }              from '../dictionary'
import { useSelector }             from 'react-redux';

type CardProps = {
  category: string;
  id: number;
  price: number;
  firebaseName: string;
  buy: (id: number, price: number) => void;
};

export const Card: FC<CardProps> = ({id, buy, price, category, firebaseName}) => {
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  const onCardClick = () => {
    // This is prop from parent component, when card is clicked, this calls function of parent.
    buy(id, price);
  };

  const [imgurl, setImgurl] = useState('');

  const fetchFirebaseUrls = async () => {
    const link = await getDownUrlByFilename(
      'Categories',
      firebaseName ? firebaseName + '.png' : ''
    );
    setImgurl(link?link:'')
  };

  useEffect(() => {
    fetchFirebaseUrls();
  }, []);
  return (
    <CardContainer >
      <h2>{category}</h2>
      <StyledCard>
        {imgurl ? (
          <img src={imgurl} alt={'Category Image'} />
        ) : (
          <ReactLoading type="spinningBubbles" color={BasicColor.green} />
        )}
        <PriceBadge price={price} />
        <StyledBg>
          <p>{dictionary[language]?.buyCardDescription}</p>
          <p className="dollars">${price}</p>
          <button onClick={() => onCardClick()}>{dictionary[language]?.buy}</button>
        </StyledBg>
      </StyledCard>
    </CardContainer>
  );
};

interface PriceBadgeProps {
  price: number;
}

const PriceBadge: FC<PriceBadgeProps> = ({price}) => (
  <StyledPrice>
    <p>{price}</p>
    <img src={coin} alt={'coin'} />
  </StyledPrice>
);

const StyledCard = styled.div`
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
`;
const CardContainer = styled.div`
  width: 160px;
  min-height: 220px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 1rem -4px #000;
  background: #fff;
  margin-top: 0;
  overflow: hidden;
  transition: all 250ms ease-in-out;

  h2 {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0px;
    color: white;
    background-color: ${BasicColor.green};
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 5px 5px rgba(82, 119, 192, 0.4),
      10px 10px rgba(82, 119, 192, 0.3), 15px 15px rgba(82, 119, 192, 0.2),
      20px 20px rgba(82, 119, 192, 0.1), 25px 25px rgba(82, 119, 192, 0.05);
  }

  @media screen and (max-width: ${ScreenSize.tablet}) {
    width: 35vw;
    min-height: 120px;
    h2 {
      font-size: 14px;
      height: 20px;
    }
    margin: 3vw;
  }
`;

const StyledBg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  background: white;
  inset: 0;
  opacity: 0;
  transition: opacity 0.5s;
  &:hover {
    opacity: 1;
  }
  .dollars {
    font-size: 20px;
    @media screen and (max-width: ${ScreenSize.tablet}) {
      font-size: 15px;
    }
  }
  p {
    text-align: center;
    font-weight: 700;
    margin: 0;
    font-size: 15px;
    @media screen and (max-width: ${ScreenSize.tablet}) {
      font-size: 11px;
    }
  }

  button {
    color: white;
    background-color: ${BasicColor.green};
    height: 40px;
    width: 100px;
    border: 0;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      box-shadow: 0 1px 1rem -3px orange;
      cursor: pointer;
      right: auto;
      transition: all 150ms ease-in-out;
      transform: translateY(-5px);
    }
    @media screen and (max-width: ${ScreenSize.tablet}) {
      font-size: 11px;
      width: 60px;
      height: 30px;
    }
  }
`;

const StyledPrice = styled.div`
  background-color: ${BasicColor.blue};
  height: 40px;
  width: 100px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  object-fit: center;
  box-shadow: 0 1px 1rem -3px orange;
  position: absolute;
  bottom: 0;
  right: 0;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    width: 60px;
    height: 20px;
  }

  p {
    color: white;
    @media screen and (max-width: ${ScreenSize.tablet}) {
      font-size: 11px;
    }
    padding: 0;
  }
  img {
    height: 60px;
    width: 60px;
    @media screen and (max-width: ${ScreenSize.tablet}) {
      height: 30px;
      width: 30px;
    }
  }
`;
