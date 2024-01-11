import { FC, JSXElementConstructor, Key, ReactElement, useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { BasicColor } from 'views/Color';
import { LSLabel, LSButtonContainer } from 'views/molecules/Setting/utils/Style';
import { LSFormControl } from 'views/molecules/Setting/utils/Style';
// import { doCancelMembership }                         from 'app/actions/guardianActions'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import { LoadingSpinner } from 'views/atoms/Spinner';
import { CANCEL_REASONS } from 'constants/parent'
import { dictionary } from './dictionary'
import { Button, FormControlLabel, Radio } from '@mui/material';
interface ICancelFormProps {
  open: () => void
  refresh: () => void
}


export const TeacherCancelMembershipForm: FC<ICancelFormProps> = ({ open, refresh }) => {

  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  const [value, setValue] = useState(CANCEL_REASONS[language][0].value);
  const [loading, setLoading] = useState(false)
  const guardian = useSelector((state: any) => state.guardian);
  const user = useSelector((state: any) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = () => {
    setLoading(true)
    // const reason = CANCEL_REASONS[language].find((element: { value: any; }) => element.value === value)?.label
    // // TODO: send cancel membership mutation
    // const res: any = doCancelMembership(guardian.id, reason ? reason : '', user.token)
    // if (res.status) {
    //   enqueueSnackbar(dictionary[language]?.membershipCanceledSuccessfully, { variant: 'success' })
    // } else
    // enqueueSnackbar(dictionary[language]?.membershipCancelationsFailed, { variant: 'error' })

    // TODO: Remove this when the backend is done.
    setTimeout(() => { open(), setLoading(false) }, 2000)
    // setLoading(false)
    // open()
    // refresh()
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  };

  return (
    loading ?
      <LoadingSpinner />
      :
      <LSFormControl variant='standard'>
        <FormLabel id='canceling-reason-label'>
          <LSLabel>{dictionary[language]?.pleaseTellUsWhyAreYouCanceling}</LSLabel>
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
              // return <LSFormControlLabel key={row.id} value={row.value} control={<LSRadio />} label={row.label} />
              return <FormControlLabel key={row.id} value={row.value} control={<Radio />} label={row.label} />
            })
          }
        </RadioGroup>
        <LSButtonContainer>
          <Button
            variant='contained'
            onClick={onSubmit}
          >
            {dictionary[language]?.submit}
          </Button>
        </LSButtonContainer>
      </LSFormControl>
  );
}

