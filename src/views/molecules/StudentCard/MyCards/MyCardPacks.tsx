import { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { MyCardPack } from './MyCardPack';
import {
  doFetchCategoryCollectibles,
  getProgressPurchasedCount,
  getProgressTotalCount,
} from 'app/actions/collectibleActions';
import { GemProgressBar } from './GemProgressBar';
import { MyPackcards } from './MyCardPackcards';
import { LoadingSpinner } from 'views/atoms/Spinner';
import { useSnackbar } from 'notistack';
import { Container, Grid } from '@mui/material';

interface CardPropArray {
  packs: {
    name: string;
    id: number;
    owned: boolean
    firebaseName: string
  }[];
}

export const MyCardPacks: FC<CardPropArray> = ({ packs }) => {
  const user = useSelector((state: any) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  // State to store currently selected card
  const [selected, setSelected] = useState(0)
  const [loading, setLoading] = useState(false)
  const [packcards, setPackcards] = useState<Array<any>>([])

  // states to store progress bar data
  const [gainedCount, setGainedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // get total count and gained count of selected category, this is for progress bar
  const fetchProgressData = async (id: number) => {
    // TODO: fetch category collectibles from backend
    setLoading(true)
    try{

      const res = await doFetchCategoryCollectibles(id, user.token)
      if (res.succeed) {
        setPackcards(res.cards)
        // enqueueSnackbar(dictionary[language]?.youVeSetAnFavoriteAvatar, { variant: 'success' });
        enqueueSnackbar('fetch success', { variant: 'success' });
      } else {
        enqueueSnackbar(res.msg, { variant: 'error' });
      }

      const total = await getProgressTotalCount(
        id,
        user.token
      );
      total.msg ? setTotalCount(0) : setTotalCount(total);


      const purchased = await getProgressPurchasedCount(
        id,
        user.token
      );
      purchased.msg ? setGainedCount(0) : setGainedCount(purchased);
    } catch(e:any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
    setLoading(false)
  };

  // This function is called from child, this is passed as prop to child component
  const callbackCardSelect = useCallback((packId: number) => {
    setSelected(packId)
    fetchProgressData(packId);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '60px',
      }}
    >
      <Container >
        <Grid container justifyContent={'center'}>
          {packs.map((item) => (
            <Grid item key={item.id}>
              <MyCardPack
                id={item.id}
                select={callbackCardSelect}
                category={item.name}
                purchased={item.owned}
                isSelected={item.id === selected}
                firebaseName={item.firebaseName}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <GemProgressBar
        totalCount={totalCount}
        gainedCount={gainedCount}
        firebaseName={packs.find((pack) => pack.id === selected)?.firebaseName}
      />
      {
        loading ?
          <LoadingSpinner /> :
          <MyPackcards packcards={packcards} />
      }
    </div>
  );
};
