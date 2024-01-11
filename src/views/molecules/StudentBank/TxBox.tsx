import { FC, useEffect, useState } from 'react';
import styled                      from 'styled-components';
import { ScreenSize }              from 'constants/screenSize';
import { Grid }                    from '@mui/material';
import { GridItem, Input }         from './Style';
import { BasicColor }              from 'views/Color';
import { withDraw, deposit }       from 'app/actions/bankActions'
import { useDispatch }             from 'react-redux'
import { useSelector }             from 'react-redux';
import { useSnackbar }             from 'notistack';
import Button                      from 'views/molecules/MuiButton';
import { dictionary }              from 'views/pages/Student/Bank/dictionary'

export const TxBox: FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'
  const user = useSelector((state: any) => state.user);

  const [depositAmount, setDepositAmount] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const onDepositChange = (x: string) => {

    // to make sure only number is input
    if (isNaN(+x))
      setDepositAmount(depositAmount)
    else setDepositAmount(+x)
  }

  const onWithdrawChange = (x: string) => {

    // to make sure only number is input
    if (isNaN(+x))
      setWithdrawAmount(withdrawAmount)
    else setWithdrawAmount(+x)
  }

  const onDepositBtnClicked = async() => {
    if(depositAmount === 0) return enqueueSnackbar(dictionary[language]?.amountIsEmpty, { variant: 'error' });
    setLoading(true)
    const result = await deposit(depositAmount, user.token, dispatch)
    setLoading(false)
    if(result.success) return enqueueSnackbar(result.msg, { variant: 'success' });
    return enqueueSnackbar(result.msg, { variant: 'error' });
  }

  const onWithdrawBtnClicked = async() => {
    if(withdrawAmount === 0) return enqueueSnackbar(dictionary[language]?.amountIsEmpty, { variant: 'error' });
    setLoading(true)
    const result = await withDraw(withdrawAmount, user.token, dispatch)
    setLoading(false)
    if(result.success) return enqueueSnackbar(result.msg, { variant: 'success' });
    return enqueueSnackbar(result.msg, { variant: 'error' });
  }

  useEffect(() => {
  }, []);

  return (
    <BankPaper >
      <Grid container >
        <GridItem item md={8} xs={8}>
          <Input
            onChange={(e) => onDepositChange(e.target.value)}
            value={depositAmount}
          />
        </GridItem>
        <GridItem item md={4} xs={4} align='start'>
          <Button
            bgColor={BasicColor.green}
            onClick={onDepositBtnClicked}
            value={dictionary[language]?.deposit}
            fullWidth={true}
            loading={loading}
          />
        </GridItem>
      </Grid>
      <Grid container >
        <GridItem item md={8} xs={8}>
          <Input
            onChange={(e) => onWithdrawChange(e.target.value)}
            value={withdrawAmount}
          />
        </GridItem>
        <GridItem item md={4} xs={4} align='start'>
          <Button
            bgColor={BasicColor.green}
            onClick={onWithdrawBtnClicked}
            value={dictionary[language]?.withdrawal}
            fullWidth={true}
            loading={loading}
          />
        </GridItem>
      </Grid>
    </BankPaper>
  );
};

const BankPaper = styled.div`
  margin-top: 0;
  padding: 30px 20px 30px 20px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  background-color: ${BasicColor.green};
  border-radius: 20px;
  max-width: 415px;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    width: 80vw;
    padding: 15px;
  }

  @media screen and (min-width: ${ScreenSize.tablet}) (max-width: ${ScreenSize.desktop}) {
    padding: 20px 35px 20px 35px;
  }
`;
