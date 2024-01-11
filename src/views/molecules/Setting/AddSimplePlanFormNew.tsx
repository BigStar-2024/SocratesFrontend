import * as React from 'react';
import { FC, useState } from 'react';
import { Box, FormControlLabel, Grid, Switch, Typography } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import { LSRadio, LSFormControlLabel, LSInputBase } from './utils/Style';
import { dictionary } from 'views/pages/Parent/Settings/dictionary';
import commonDictionary from 'constants/commonDictionary'
import { confirmPaymentOrder, doAddStudentPlan, doFetchPlanTypes } from 'app/actions/guardianActions';
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import { LoadingSpinner } from 'views/atoms/Spinner';
import { useMutation, useQuery } from 'react-query'
import { getMessage } from 'views/utils';
import LoadingButton from '@mui/lab/LoadingButton';
import { useHistory } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';


export const AddSimplePlanForm: FC = () => {

  const history = useHistory();
  const [yearly, setYearly] = useState(true)
  const token = useSelector((state: any) => state.user.token);
  const guardianId = useSelector((state: any) => state.guardian.id);
  const paymentCardNum = useSelector((state: any) => state.guardian.paymentMethod.cardNumber);
  const { enqueueSnackbar } = useSnackbar();
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  const [parentState, setParentState] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const { data: plans, isLoading, error } = useQuery(['purchased-plans-list', token], () => doFetchPlanTypes(token))

  const createPlan = useMutation((planId: any) => doAddStudentPlan(guardianId, planId, yearly ? 'Yearly' : 'Monthly', token), {
    onSuccess: async data => {
      if (data.message) {
        enqueueSnackbar(data.message, { variant: 'error' })
      }
      else {
        // Send confirm mutation on createPayment order succeed.
        const confirm = await confirmPaymentOrder(+data.order.id, token)
        if (confirm.msg) {
          enqueueSnackbar(confirm.msg, { variant: 'error' })
        }
        // Redirect to new kid page on success
        else if (confirm.status === 'success') {
          enqueueSnackbar(commonDictionary[language]?.success+', discounted ' + confirm.order.total + 'USD' + commonDictionary[language]?.from_your_account, { variant: 'success' })
          setLoading(false)
          history.push('/kids/new')
        }
        else {
          enqueueSnackbar(commonDictionary[language]?.failed_to_confirm_a_new_plan, { variant: 'error' })
        }
      }
    },
    onError: async (error: any) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
    onSettled: async () => {
      setLoading(false)
    }
  })
  const onSubmit = async () => {

    setLoading(true)
    createPlan.mutate(plans.find((element: any) => element.name === parentState).id)
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    setParentState(value)
  };

  if (isLoading) return <LoadingSpinner />
  if (error) return <Typography variant='h6' textAlign={'center'} color='red'>{getMessage(error)}</Typography>
  if (plans.message) return <Typography variant='caption'> {plans.message}</Typography>
  return (
    plans &&
    <Box>
      <Box display='flex' justifyContent={'space-between'} alignItems='center'>
        <Typography>{commonDictionary[language]?.select_one_of_the_following_plans}</Typography>
        <FormControlLabel control={<Switch checked={yearly} onChange={() => setYearly(!yearly)} />} label={'Yearly'} />
      </Box>
      <RadioGroup
        aria-labelledby="canceling-reason-label"
        name="radio-buttons-group"
        color='success'
        value={parentState}
        onChange={handleRadioChange}
      >{
          plans.map((plan: any) => {
            return <Grid container alignItems='center' >
              <Grid item xs={6}>
                <LSFormControlLabel value={plan.name} control={<LSRadio />} label={dictionary[language]?.[plan.slug as keyof Object]} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1' textAlign='center'>{yearly ? plan.priceYear : plan.priceMonth}<span style={{ fontSize: '0.8rem' }}>{plan.currency}/{yearly ? commonDictionary[language]?.annually : commonDictionary[language]?.monthly}</span></Typography>
              </Grid>
            </Grid>
          })
        }
      </RadioGroup>
      <Typography mt={5}>{dictionary[language]?.paymentCardMessage}</Typography>
      <LSInputBase
        fullWidth
        disabled
        border='solid 2px darkblue'
        border_radius={10}
        pl={10}
        value={paymentCardNum}
      // endAdornment={<img src={masterCard} style={{ marginRight: '40px', height: '40px' }} />}
      />
      <Box display='flex' justifyContent={'center'} padding={2}>
        <LoadingButton
          disabled={parentState === ''}
          loading={loading}
          onClick={onSubmit}
          variant='contained'
          loadingPosition='end'
          endIcon={<SendIcon />}
        >
          {commonDictionary[language]?.submit}
        </LoadingButton>
      </Box>
    </Box>
  );
}
