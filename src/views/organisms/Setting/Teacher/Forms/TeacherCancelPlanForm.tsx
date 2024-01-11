import { FC, JSXElementConstructor, Key, ReactElement, useState }                               from 'react';
import FormLabel                                      from '@mui/material/FormLabel';
import RadioGroup                                     from '@mui/material/RadioGroup';
import { BasicColor }                                 from 'views/Color';
import { LSLabel, LSButtonContainer }       from 'views/molecules/Setting/utils/Style';
import { LSFormControl, } from 'views/molecules/Setting/utils/Style';
// import { doCancelBroughtPlan } from 'app/actions/guardianActions';
import { useSelector }         from 'react-redux'
import { useSnackbar }         from 'notistack';
import { LoadingSpinner }      from 'views/atoms/Spinner';
import { CANCEL_REASONS }      from 'constants/parent'
import { Button, FormControl, FormControlLabel, Radio } from '@mui/material';

interface ICancelFormProps {
  // onConfirm: (arg: string) => void
  open: () => void
  tag?: Number
  plan: any
  refresh: () => void
}


export const TeacherCancelPlanForm: FC<ICancelFormProps> = ({ open, plan, refresh }) => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  const [value, setValue] = useState(CANCEL_REASONS[language][0].value);
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async () => {
    const reason = CANCEL_REASONS[language].find((element: { value: any; }) => element.value === value)?.label
    setLoading(true)
    // const res:any = await doCancelBroughtPlan(plan.id, reason?reason:'', user.token)
    // if(res.status){
    //   enqueueSnackbar('Cancel children plan successfully', { variant: 'success' })
    //   refresh()
    // } else{
    //   enqueueSnackbar('Cancel children plan failed', { variant: 'error' })
    // }
    setLoading(false)
    open()
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  };

  return (
    loading ?
    <LoadingSpinner />
     :
    <FormControl variant='standard'>
      <FormLabel id='canceling-reason-label'>
        <LSLabel>{'Please tell us why are you canceling.'}</LSLabel>
      </FormLabel>
      <RadioGroup
        aria-labelledby='canceling-reason-label'
        name='radio-buttons-group'
        color={BasicColor.green}
        value={value}
        onChange={handleRadioChange}
      >
        {
          CANCEL_REASONS[language].map((row: { id: Key | null | undefined; value: unknown; label: string | number | ReactElement<any, string | JSXElementConstructor<any>>; }) => {
            return <FormControlLabel key={row.id} value={row.value} control={<Radio />} label={row.label} />
          })
        }
      </RadioGroup>
      <LSButtonContainer>
        <Button
          variant='contained'
          onClick={onSubmit}
        >
          {'Submit'}
        </Button>
      </LSButtonContainer>
    </FormControl>
  );
}

