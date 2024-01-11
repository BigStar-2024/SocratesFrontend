import { FC, useEffect, useState }  from 'react';
import styled                       from 'styled-components';
import { BasicColor }               from 'views/Color';
import priceflag                    from 'views/assets/avatars/price-flag.png';
import ReactLoading                 from 'react-loading';
import { IAvatar }                  from 'app/entities/avatar';
import { ScreenSize }               from 'constants/screenSize';
import { doPurchaseAvatarItem }     from 'app/actions/avatarActions';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar }              from 'notistack';
import * as TYPES                   from 'app/types'
import { dictionary }               from 'views/pages/Student/Avatar/dictionary'

interface AtomsProps {
  items: Array<IAvatar>
  onItemClick: (id: number) => (void)
  reload: () => (void)
  owned: Array<{ avatar: { id: number } }>
}

export const AtomsSelector: FC<AtomsProps> = ({
  items, onItemClick, owned, reload
}) => {
  const [id, setId] = useState(0)
  const [isloading, setLoading] = useState(false)

  const dispatch      = useDispatch();
  const user          = useSelector((state: any) => state.user);
  const student       = useSelector((state: any) => state.student)
  const earning       = useSelector((state: any) => state.earning);
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  const { enqueueSnackbar } = useSnackbar();
  const purchaseAvatarItem = async (id: number, price: number) => {
    setLoading(true)
    const res: any = await doPurchaseAvatarItem(id, student.id, user.token)
    if (res) {
      reload()
      dispatch({ type: TYPES.PURCHASE_CARDS, payload: { price: price } });
      enqueueSnackbar(dictionary[language]?.youBoughtAnAvatarItemFor$ + price, { variant: 'success' });
    }
    else
      enqueueSnackbar(dictionary[language]?.failedPurchasing, { variant: 'error' });
    setLoading(false)
  }

  useEffect(() => {
  }, [owned])

  return (
    <>
      {items && !isloading &&
        <WardrobeScroll>
          {items.map((item: any) => (
            <WardrobeAtom
              key={item.id}
              isSelected={id === item.id ? true : false}
            >
              {
                !owned.some(owneditem => owneditem.avatar.id === item.id) &&
                <>
                  <OverLay >
                    <p>{dictionary[language]?.buyFor}</p>
                    <p className="dollars">${parseInt(item.price)}</p>
                    <button onClick={() => { purchaseAvatarItem(item.id, item.price) }}>{dictionary[language]?.buy}</button>
                  </OverLay>
                  <Disabled style={+earning.balance > +item.price ? {display:'none'}:{}}/>
                  <PriceContainer>
                    <PriceFlag src={priceflag} />
                    <Price>{parseInt(item.price)}</Price>
                  </PriceContainer>
                </>
              }
              <AtomImg
                src={item.image}
                onClick={() => {
                  onItemClick(item.id)
                  setId(item.id)
                }} />
            </WardrobeAtom>
          ))}
        </WardrobeScroll>}
      {isloading &&
        <LoadingContainer>
          <ReactLoading type="spinningBubbles" color={BasicColor.green} />
        </LoadingContainer>}
    </>
  );
};

const WardrobeScroll = styled.div`
  width: 450px;
  height: 400px;
  margin: 10px;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  overflow-y: auto;
  @media (min-width:${ScreenSize.tablet}) and (max-width:${ScreenSize.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    width: 280px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: ${ScreenSize.phone}) {
    width: 90vw;
    height: 45vh;
    grid-gap: 10px;
  }
`;

const WardrobeAtom = styled.div<{
  isSelected?: boolean;
}>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 110px;
  overflow: hidden;
  height: 110px;
  background-color: ${props =>
    props.isSelected ? BasicColor.gray40 : BasicColor.white};
  border: solid 8px
    ${props => (props.isSelected ? BasicColor.greenSoft : BasicColor.white)};

  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: ${ScreenSize.phone}) {
    font-size: 15px;
    width: calc( 80vw / 4 );
    height: calc( 50vh / 4 ) ;
  }
`;

const AtomImg = styled.img`
  width: 100%;
  margin-bottom: 30px;
`;

const PriceContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 8px;
  bottom: 0;
  height: 25px;
`;
const PriceFlag = styled.img`
  width: 80px;
  height: 25px;
  position: absolute;
  left: -8px;
`;

const Price = styled.p`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  font-family: QuickSand;
  font-size: 20px;
  font-weight: 400;
`;

const OverLay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  background: rgba(255,255,255,0.2);
  inset: 0;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.5s;
  &:hover {
    opacity: 1;
    cursor: pointer;
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
    height: 30px;
    width: 60px;
    border: 0;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      box-shadow: 0 1px 1rem -3px orange;
      cursor: pointer;
      right: auto;
    }
    &:disabled {
      box-shadow: none;
      cursor: not-allowed;
      background-color: ${BasicColor.gray40};
    }
    &:active {
      transform: translateY(2px);
    }
    @media screen and (max-width: ${ScreenSize.tablet}) {
      font-size: 11px;
      width: 60px;
      height: 30px;
    }
  }
`;
const Disabled = styled.div`
  position: absolute;
  background: black;
  inset: 0;
  opacity: 0.7;
  transition: opacity 0.5s;
  z-index: 10;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  grid-row-start: 2;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 4;
  alignItems: center;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    height: 80vh;
  }
`;
