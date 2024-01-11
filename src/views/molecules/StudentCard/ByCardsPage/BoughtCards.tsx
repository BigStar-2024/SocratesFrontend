import { FC } from 'react';
import { BoughtCard } from './BoughtCard';
import { Container, Grid } from '@mui/material';

interface PurchaseCardProps {
  cards: {
    id: number
    name: string
    image: string
    category: {
      id: number
      firebaseName: string
      name: string
    }
    description: {
      key: string
      value: string
    }[]
  }[]
}

export const PurchasedCards: FC<PurchaseCardProps> = ({ cards }) => {

  return (
    <Container sx={{minHeight: 100}}>
      <Grid container spacing={2} justifyContent='center'>
        {
          cards.map((card: any) => (
            <Grid item key={card.id} >
              <BoughtCard imgUrl={card.image} firebaseName={card.category.firebaseName} description={card.description} name={card.name} id={card.id} />
            </Grid>
          ))
        }

      </Grid>
    </Container>
  );
};
