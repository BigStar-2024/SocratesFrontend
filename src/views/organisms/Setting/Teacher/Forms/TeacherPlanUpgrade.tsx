import { FC, useEffect, useState } from 'react';
import {Box, Button}                         from '@mui/material';
import { useSelector }             from 'react-redux'
import {
  LSButtonContainer, LSText,
  LSPaperMoney, LSLabel, LSInputBase
}                                  from 'views/molecules/Setting/utils/Style';
// import { doUpdateBroughtPlan }     from 'app/actions/guardianActions';
import { useSnackbar }             from 'notistack';
import { LoadingContainer }        from 'views/atoms/Loading'
import ReactLoading                from 'react-loading';
import { BasicColor }              from 'views/Color';

interface IUpgradeProps {
  onConfirm: () => void
  onCancel: () => void
  plan: any
  refresh: () => void
}

const text = [
  'You are going to upgrade your current subscription to an ',
  'The first payment will be prorated according to your billing cycle.',
  'Your credit card on file will be charged for this upgrade.',
]

export const TeacherPlanUpgrade: FC<IUpgradeProps> = ({ onConfirm, plan, refresh }) => {
  const guardian = useSelector((state: any) => state.guardian);
  // const user = useSelector((state: any) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)

  const onSubmitBtnClicked = async () => {
    setLoading(true)
    // TODO: update query when the backend is done
    // const res: any = await doUpdateBroughtPlan(guardian.id, plan.id, user.token)

    // Remove this when the backend is done;
    const res = {status: false}

    if (res.status) {
      enqueueSnackbar('Student Package updated successfully', { variant: 'success' })
      onConfirm()
      refresh()
    } else {
      onConfirm()
      enqueueSnackbar('Student Package update failed', { variant: 'error' })
    }
    setLoading(false)
  }

  useEffect(() => {
  }, [])

  return (
    loading ?
      <LoadingContainer>
        <ReactLoading type="spinningBubbles" color={BasicColor.green} />
      </LoadingContainer>
      :
      <div >
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <LSText >{text[0]}</LSText>
          <LSLabel mt={0}>{'Annual Plan'}</LSLabel>
          <LSPaperMoney elevation={6}>
            <LSLabel fontSize={24} color='darkblue' >{plan?.plan.priceYear}{plan?.plan.currency}<span style={{ fontSize: '14px', color: 'black' }}>{'/year'}</span></LSLabel>
          </LSPaperMoney>
          <LSText mt={15} mb={20} textAlign='center'>{text[1]}</LSText>
          <LSText fontSize={15} margin={0} textAlign='center'>{text[2]}</LSText>
        </Box>
        <LSLabel >{'Card Number'}</LSLabel>
        <LSInputBase
          fullWidth
          disabled
          border='solid 2px darkblue'
          border_radius={10}
          pl={10}
          value={guardian.paymentMethod?.cardNumber}
        // endAdornment={<img src={masterCard} style={{ marginRight: '40px', height: '40px' }} />}
        />
        <LSButtonContainer style={{ marginTop: '32px' }}>
          <Button
            variant='contained'
            onClick={onSubmitBtnClicked}
          >
            {'Upgrade'}
          </Button>
        </LSButtonContainer>
      </div>
  );
}
