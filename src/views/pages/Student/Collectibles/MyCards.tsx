import { FC, useEffect, useContext, useState } from 'react';
import {
  CardCollectibleContainer,
  Wrapper,
} from './Style';
import { useHistory } from 'react-router-dom';
import { PageTitle } from 'views/molecules/PageTitle';
import { StudentMenu } from 'views/pages/Student/Menus/StudentMenu';
import { BtnContainer } from './Style';
import { Button } from './Style';
import { LoadingContext } from 'react-router-loading';
import { useSelector } from 'react-redux';
import {
  getCardPacksInfo,
} from 'app/actions/collectibleActions';
import { MyCardPacks } from 'views/molecules/StudentCard/MyCards/MyCardPacks'
import { dictionary } from './dictionary;';
import { Container, Grid } from '@mui/material';

export const MyCardCollection: FC = () => {
  const history = useHistory();
  const loadingContext = useContext(LoadingContext);
  const user = useSelector((state: any) => state.user);
  const [categories, setCategories] = useState([]);
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      const packs = await getCardPacksInfo(user.token);
      loadingContext.done()

      if (!ignore) {
        if (packs.msg) {
          setCategories([]);
        } else {
          setCategories(packs);
        }
      }
    };

    fetch();

    return () => {
      ignore = true;
    };
  }, [])

  return (
    <Wrapper>
      <StudentMenu>
        <Container sx={{
          display: 'flex',
          justifyContent:'center',
          padding: 0,
          marginBottom: 2
        }}>
          <Grid container alignItems={'end'}>
            <Grid item xs={12} md={2} />
            <Grid item xs={12} md={8}>
              <PageTitle title={dictionary[language]?.myCards} />
            </Grid>
            <Grid item xs={12} md={2}>
              <BtnContainer>
                <Button onClick={() => history.push('/collectibles/cards')}>
                  {dictionary[language]?.buyCards}
                </Button>
              </BtnContainer>
            </Grid>
          </Grid>
        </Container>
        <CardCollectibleContainer>
          <MyCardPacks packs={categories} />
        </CardCollectibleContainer>
      </StudentMenu>
    </Wrapper>
  );
};
