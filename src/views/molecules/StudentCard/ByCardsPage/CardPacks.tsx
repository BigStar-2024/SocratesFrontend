import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { ScreenSize } from 'constants/screenSize';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { purchaseCardPack } from 'app/actions/collectibleActions';
import { LoadingSpinner } from 'views/atoms/Spinner';
import { PurchasedCards } from './BoughtCards';
import { useSnackbar } from 'notistack';
import { Container, Grid } from '@mui/material';

interface CardPropArray {
  cards: {
    name: string;
    id: number;
    price: number;
    firebaseName: string
  }[];
}

export const CardPacks: FC<CardPropArray> = ({ cards }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const user = useSelector((state: any) => state.user);
  const student = useSelector((state: any) => state.student);

  // Toggle state when user clicks buy button to make sure send request again.
  const [buy, setBuy] = useState(false);

  // State to store currently selected card
  const [card, setCard] = useState('');
  const [cardId, setCardId] = useState(0);

  // states used for bought cards
  const [purchasedItems, setPurchasedItems] = useState<Array<any>>([]);

  // loading state for card categories
  const [isLoading, setIsLoading] = useState(false);

  // state to check whether it is mobile or desktop
  const [isMobile, setMobile] = useState(false);

  // This function is called from child, this is passed as prop to child component
  const callback = async (cateId: number, price: number) => {
    setIsLoading(true);
    await purchaseCards(cateId, price)
    setIsLoading(false);
  };

  // Get category images after u click one of category images.
  const purchaseCards = async (cateId: number, price: number) => {
    try {
      const res = await purchaseCardPack(cateId, student.id, user.token, dispatch, price);
      if (res.msg) {
        setPurchasedItems([]);
        enqueueSnackbar(res.msg, { variant: 'error' })
      } else {
        setPurchasedItems(res)
        console.log(res)
        enqueueSnackbar('Card Purchase Success!', { variant: 'success' })
      }
    } catch {
      setPurchasedItems([])
    }
  };

  useEffect(() => {

    // check device is mobile, do mobile view
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setMobile(false);
      } else setMobile(true);
    };
    handleResize();

  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 2
      }}
    >
      <Container >
        <Grid container justifyContent={'center'}>
          {cards.map((card) => (
            <Grid item key={card.id}>
              <Card
                firebaseName={card.firebaseName}
                id={card.id}
                price={card.price}
                buy={callback}
                category={card.name}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      {
        isLoading ?
          <LoadingSpinner />
          :
          <PurchasedCards cards={purchasedItems} />
      }
    </div>
  );
};

