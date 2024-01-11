import * as React                                                  from 'react';
import { FC, useEffect, useState }                                 from 'react';
import Box                                                         from '@mui/material/Box';
import FormControlLabel                                            from '@mui/material/FormControlLabel';
import { Checkbox, Radio, Grid }                                   from '@mui/material';
import RadioGroup                                                  from '@mui/material/RadioGroup';
import { FormGroup }                                               from '@mui/material';
import { BasicColor }                                              from 'views/Color';
import Button                                                      from 'views/molecules/MuiButton';
import { LSButtonContainer, LSRadio, LSFormControlLabel, LSInputBase } from './utils/Style';
import { dictionary }                                              from 'views/pages/Parent/Settings/dictionary';
import { doAddStudentPlan, doFetchPlanTypes }                          from 'app/actions/guardianActions';
import { useSelector }                                             from 'react-redux'
import { useSnackbar }                                             from 'notistack';
import { LoadingSpinner }                                          from 'views/atoms/Spinner';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ScreenSize } from 'constants/screenSize';
import { TypoBtn, TypoDescription } from 'views/atoms/Text';

interface IAddPlanProps {
  open: () => void
  refresh: () => void
}

const combo = [
  {
    label: {
      'en-us': 'Math',
      'th': 'คณิตศาสตร์',
      'es-mx': 'Matemáticas'
    },
    value: 'combo_math'
  },
  {
    label: {
      'en-us': 'ELA + Sight Words',
      'th': 'ELA + คำสายตา',
      'es-mx': 'ELA + Palabras visuales'
    },
    value: 'combo_esw'
  },
  {
    label: {
      'en-us': 'Science',
      'th': 'ศาสตร์',
      'es-mx': 'Ciencia'
    },
    value: 'combo_science'
  },
  {
    label: {
      'en-us': 'Financial Literacy',
      'th': 'ความรู้ทางการเงิน',
      'es-mx': 'Educación financiera'
    },
    value: 'combo_finance'
  },
  {
    label: {
      'en-us': 'Health & Safety',
      'th': 'สุขภาพ & ความปลอดภัย',
      'es-mx': 'Salud & La seguridad'
    },
    value: 'combo_health'
  },
]

export const AddSimplePlanForm: FC<IAddPlanProps> = ({ open, refresh }) => {

  const isMobile = useMediaQuery(`(max-width:${ScreenSize.phone})`);
  const width = isMobile ? 300: 500
  const user = useSelector((state: any) => state.user);
  const guardian = useSelector((state: any) => state.guardian);
  const { enqueueSnackbar } = useSnackbar();
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'
  // const comboChildren = dictionary['en-us'].combo
  const [plans, setPlans] = useState<Array<any>>([])

  const [parentState, setParentState] = useState('')
  const [soloState, setSoloState] = useState('')
  const [checked, setChecked] = useState(new Array(combo.length).fill(false));
  const [loading, setLoading] = useState(false)


  const fetchPlans = async (mounted: boolean) => {

    const res = await doFetchPlanTypes(user.token)
    if (res !== null) {
      if (mounted)
        setPlans(res)
    }
  }

  const onSubmit = async () => {

    setLoading(true)
    const res: any = await doAddStudentPlan(guardian.id, plans.find(element => element.name === parentState).id, 'Monthly', user.token)
    if (res.status) {
      enqueueSnackbar('Student Package added successfully', { variant: 'success' })
      refresh()
    } else
      enqueueSnackbar(res.msg, { variant: 'error' })

    setLoading(false)
    open()
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    if (value !== plans[1].name)
      setChecked(new Array(checked.length).fill(false))

    if (value !== plans[2].name)
      setSoloState('')

    setParentState(value)
  };

  const handleSoloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSoloState((event.target as HTMLInputElement).value)
    setParentState(plans[2].name)

    if ((event.target as HTMLInputElement).value !== plans[1].name)
      setChecked(new Array(checked.length).fill(false))
  };

  // get count of occurences of certain value in an array
  const countOccurrences = (arr: Array<boolean>, val: boolean) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempArray = [...checked]

    // if checked count is bigger than 2, then selecting another one is impossible.
    const counts = countOccurrences(checked, true)
    if (!(event.target.checked === true && counts === 2)) {

      const idx = combo.findIndex((x: { value: string; }) => x.value === event.target.value)
      tempArray[idx] = event.target.checked
      setChecked(tempArray)
      setParentState(plans[1].name)

      setSoloState('')
    }
  };

  useEffect(() => {
    let mounted = true
    fetchPlans(mounted)
    return () => {
      mounted = false
    }
  }, []);
  interface ChildrenProps {
    label: any
    value: string
  }

  const renderSoloChildren = (comboChildren: Array<ChildrenProps>) => {
    return <RadioGroup
      aria-labelledby="canceling-reason-label"
      name="radio-buttons-group"
      color='success'
      value={soloState}
      onChange={handleSoloChange}
      sx={{ marginLeft: 3 }}
    >
      <Grid container alignItems={'center'}>
      {
        comboChildren.map((comboChild, index) => (
          <Grid item md={6} xs={12}>
            <FormControlLabel
              key={index}
              label={comboChild.label[language as keyof Object]}
              value={comboChild.value}
              control={<Radio />}
            />
          </Grid>
        ))
      }
      </Grid>
    </RadioGroup>
  }

  const renderComboChildren = (comboChildren: Array<ChildrenProps>) => {
    return <FormGroup sx={{ marginLeft: 3 }}>
        <Grid container alignItems={'center'}>
          {comboChildren.map((comboChild, index) => (
            <Grid item md={6} xs={12}>
              <FormControlLabel
                key={index}
                label={comboChild.label[language as keyof Object]}
                value={comboChild.value}
                control={<Checkbox checked={checked[index]} onChange={handleCheckChange} />}
              />
            </Grid>
          ))}
        </Grid>
    </FormGroup>
  }

  return (
    !loading && plans.length ?
      <div style={{width: width}}>
        <RadioGroup
          aria-labelledby="canceling-reason-label"
          name="radio-buttons-group"
          color='success'
          value={parentState}
          onChange={handleRadioChange}
        >
          <Grid container alignItems='center'>
            <Grid item xs={6}>
              <LSFormControlLabel value={plans[0]?.name} control={<LSRadio />} label={dictionary[language]?.radioLabelGold} />
            </Grid>
            <Grid item xs={6}>
              <TypoBtn>${plans[0]?.priceMonth}</TypoBtn>
            </Grid>
            <Grid item xs={6}>
              <LSFormControlLabel value={plans[1]?.name} control={<LSRadio checked={checked[0] || checked[1] || checked[2] || checked[3] || checked[4]} />} label={dictionary[language]?.radioLabelCombo} />
            </Grid>
            <Grid item xs={6}>
              <TypoBtn>${plans[1]?.priceMonth}</TypoBtn>
            </Grid>
            <Grid item xs={12}>
              {renderComboChildren(combo)}
            </Grid>
            <Grid item xs={6}>
              <LSFormControlLabel value={plans[2]?.name} control={<LSRadio />} label={dictionary[language]?.radioLabelSolo} />
            </Grid>
            <Grid item xs={6}>
              <TypoBtn>${plans[2]?.priceMonth}</TypoBtn>
            </Grid>
            <Grid item xs={12}>
              {renderSoloChildren(combo)}
            </Grid>
          </Grid>
        </RadioGroup>
        <TypoDescription >{dictionary[language]?.paymentCardMessage}</TypoDescription>
        <LSInputBase
          fullWidth
          disabled
          border='solid 2px darkblue'
          border_radius={10}
          pl={10}
          value={guardian.paymentMethod?.cardNumber}
        // endAdornment={<img src={masterCard} style={{ marginRight: '40px', height: '40px' }} />}
        />
        <LSButtonContainer>
          <Button
            bgColor={BasicColor.green}
            onClick={onSubmit}
            value={dictionary[language]?.submit}
          />
        </LSButtonContainer>
      </div> :
      <LoadingSpinner />
  );
}
