import { FC, useEffect, useContext } from 'react';
import { useSelector }               from 'react-redux';
import { Grid }                      from '@mui/material';
import { LoadingContext }            from 'react-router-loading';
import { StudentMenu }               from 'views/pages/Student/Menus/StudentMenu';
import Cartera                       from 'views/assets/Cartera.svg';
import { AccountBalance }            from 'views/molecules/StudentBank/AccountBalance';
import { TxBox }                     from 'views/molecules/StudentBank/TxBox';
import { TxHistoryTable }            from 'views/molecules/StudentBank/TxHistoryTable';
import { Interest }                  from 'views/molecules/StudentBank/Interest';
import { PageTitle }                 from 'views/molecules/PageTitle';
import { dictionary }                from './dictionary'
import { Wrapper, GridItem, Img }    from './Styles';

export const Bank: FC = () => {

  const student        = useSelector((state: any) => state.student)
  const interests      = useSelector((state: any) => state.interests.interests)
  let language:string  = useSelector((state: any) => state.user.language);
  language             = language? language : 'en-us'
  const loadingContext = useContext(LoadingContext);
  const bankMovement   = student.bankWallet.bankmovementSet

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <Wrapper>
      <StudentMenu>
        <PageTitle title={dictionary[language]?.bank} />
        <div >
          <Grid container >
            <Grid container item xs={12} md={6}
            sx={{
              '&.MuiGrid-root': {
                justifyContent: 'center',
                alignContent  : 'start',
                padding       : '40px',
                '@media screen and (max-width: 720px)' : { padding: '1vw'}
              },
              }}>
              <GridItem item md={12} xs={4} align='center'>
                <Img src={Cartera} />
              </GridItem>
              <GridItem item md={12} xs={8} align='center'>
                <AccountBalance balance={student.bankWallet.balance} />
              </GridItem>
              <GridItem item md={12} xs={12} align='center'>
                <TxBox />
              </GridItem>
            </Grid>
            <GridItem container item xs={12} md={6} align="start">
              <Grid item>
                <TxHistoryTable movement={bankMovement} />
              </Grid>
              <Grid item>
                <Interest interests={interests} />
              </Grid>
            </GridItem>
          </Grid>
        </div>
      </StudentMenu>
    </Wrapper>
  );
};


