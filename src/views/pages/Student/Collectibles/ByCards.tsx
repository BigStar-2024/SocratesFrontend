import { useHistory } from 'react-router-dom';
import { Wrapper } from './Style';
import { PageTitle } from 'views/molecules/PageTitle';
import { StudentMenu } from 'views/pages/Student/Menus/StudentMenu';
import { BtnContainer, Button } from './Style';
import { FC, useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  getCardPacksInfo,
} from 'app/actions/collectibleActions';
import { CardPacks } from 'views/molecules/StudentCard/ByCardsPage/CardPacks';
import { LoadingSpinner } from 'views/atoms/Spinner';
import { LoadingContext } from 'react-router-loading';
import { useSnackbar } from 'notistack';
import { dictionary } from './dictionary;'
import { Container, Grid } from '@mui/material';

export const Cards: FC = () => {
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true)
  const loadingContext = useContext(LoadingContext);
  const { enqueueSnackbar } = useSnackbar();

  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  const fetchCategories = async (mounted: boolean) => {
    try {
      const res = await getCardPacksInfo(user.token);
      if (mounted) {
        if (res.msg) {
          setPacks([]);
          enqueueSnackbar('Server error:' + res.msg, { variant: 'error' })
        } else {
          setPacks(res);
          setLoading(false)
        }
      }
    } catch (e) {
      enqueueSnackbar('Network Error' + e, { variant: 'error' })
    }
    loadingContext.done();

  };

  useEffect(() => {
    // make sure to update state when component is mounted.
    let mounted = true;

    fetchCategories(mounted)

    return () => {
      mounted = false
    }
  }, []);

  return (
    <Wrapper>
      <StudentMenu>
        {/* <div> */}
        <Container sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 0,
          marginBottom: 2
        }}>
          <Grid container alignItems={'end'}>
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={8}>
              <PageTitle title={dictionary[language]?.collectibleCards} />
            </Grid>
            <Grid item xs={12} md={2}>
              <BtnContainer>
                <Button onClick={() => history.push('/collectibles/mycards')}>
                  {dictionary[language]?.myCollection}
                </Button>
              </BtnContainer>
            </Grid>
          </Grid>
        </Container>
        {
          loading ?
            <LoadingSpinner />
            :
            <CardPacks cards={packs} />
        }
        {/* </div> */}
      </StudentMenu>
    </Wrapper>
  );
};

