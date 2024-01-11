import { FC } from 'react';
import { Gemcard } from './GemCard';
import { Container, Grid } from '@mui/material';

interface TierCardProp {
  cards: {
    id: number;
    name: string;
    amount: number;
    image: string;
    owned: boolean;
    tier: string;
    description?: Array<{
      key: string
      value: string
    }>;
    category: {
      name: string;
      firebaseName: string
    };
  }[];
}


export const TierCards: FC<TierCardProp> = ({ cards }) => {

  return (
    <Container sx={{ minHeight: 100, marginTop: 3 }}>
      <Grid container justifyContent='center' spacing={3}>
        {cards.map(card => {
          return (
            <Grid item
              key={card.id}
            >
              <Gemcard
                category={card.category.name}
                firebaseName={card.category.firebaseName}
                imgUrl={card.image}
                purchased={card.owned}
                amount={card.amount}
                name={card.name}
                id={card.id}
                description={card.description}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
