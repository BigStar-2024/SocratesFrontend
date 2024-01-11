import { FC, useEffect, useState } from 'react';
import { LoadingSpinner } from 'views/atoms/Spinner';
import { Gems } from './Gems';
import { TierCards } from './TierCards';

interface CardPropArray {
  packcards: {
    tier: string;
    owned: boolean
    category: {
      name: string,
      id: number,
      firebaseName: string
    }
    id: number;
  }[];
}

export const MyPackcards: FC<CardPropArray> = ({ packcards }) => {

  // state to store all packs of given gem
  const [gemcards, setGemcards] = useState<Array<any>>([]);
  const [gemActives, setGemActives] = useState<Array<boolean>>([]);
  const [loading, setLoading] = useState(false)

  // set gem state when user clicks one of 4 gems
  const callbackGem = (gem: string) => {
    setLoading(true)
    const tiers = packcards.filter(
      (gemcard: { tier: string }) => {
        // return gemcard.tier === gem && gemcard.category.name === card;
        return gemcard.tier === gem
      }
    );
    setGemcards(tiers);
    setLoading(false)
  };

  const getGemActiveStatus = () => {
    const gemTitles = ['LEGENDARY', 'EPIC', 'RARE', 'COMMON'];
    const tempActives = [];
    for (const gemtitle of gemTitles) {
      const res = packcards.filter((acard) => acard.tier === gemtitle)
      res.length ? tempActives.push(true) : tempActives.push(false)
    }
    setGemActives(tempActives);
  };

  useEffect(() => {
    getGemActiveStatus()
  }, [packcards])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
      }}
    >
      <Gems select={callbackGem} actives={gemActives} />
      {
        loading ?
          <div>
            <LoadingSpinner />
            <p>loading...</p>
          </div>
          :
          <TierCards cards={gemcards} />
      }
    </div>
  );
};
