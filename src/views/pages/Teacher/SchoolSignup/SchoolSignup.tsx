import { FC, useEffect, useState, useContext } from 'react';
import { LoadingContext } from 'react-router-loading';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from 'views/molecules/MuiTextField';
import { BasicColor } from 'views/Color';
import { TeacherPgContainer } from 'views/molecules/TeacherPgContainer/TeacherPgContainer';
import { dictionary } from './dictionary';
import { Country } from 'country-state-city';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {
  useStyles,
} from './Style';
import commonDictionary from 'constants/commonDictionary'
import { Box, Typography } from '@mui/material';
import ContactBox from 'views/organisms/ContactBox';
import FormContainer from 'views/atoms/FormContainer';
import { useSocratesMediaQuery } from 'hooks/useSocratesMediaQuery';
import LoadingButton from '@mui/lab/LoadingButton';
import FormBottomDescription from 'views/organisms/FormBottomDescription';
import {
  useMutation,
} from 'react-query'
import { doCreateSchool } from 'app/actions';
import { SCHOOL_TYPES } from 'constants/common';
import { USER_SET_DATA } from 'app/types';

const SchoolSignup: FC = () => {
  const isTablet = useSocratesMediaQuery('xs')
  const countries = Country.getAllCountries()
  const classes = useStyles();

  const loadingContext = useContext(LoadingContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [schoolType, setSchoolType] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState(countries[232])
  const [district, setDistrict] = useState('')
  const [loading, setLoading] = useState(false);

  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'
  const createSchool = useMutation(() => doCreateSchool(
    country.name, district, firstName, lastName, email, schoolName, password, schoolType, userName, zip
  ), {
    onSuccess: async data => {
      if (data.message) {
        enqueueSnackbar(data.message, { variant: 'error' })
      } else {
        enqueueSnackbar('School Create Succeed!', { variant: 'success' })
        dispatch({
          type: USER_SET_DATA,
          payload: { ...data.user, token: data.token, refreshToken: data.refreshToken },
        });
        history.push('/teacher/payment/School')
      }
    },
    onError: async (error: any) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
    onSettled: async () => {
      setLoading(false)
    }
  })


  // const [confPassword, setConfPassword] = useState('');
  const [validateMsg, setValidateMsg] = useState<{ [key: string]: any }>({
    email: null,
    schoolName: null,
    lastName: null,
    firstName: null,
    district: null,
    schoolType: null,
    zip: null,
    Country: '',
    userName: null,
    password: null,
    confPassword: null
  });


  useEffect(() => {
    onPageInit();
  }, [])

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const onPageInit = async () => {

    if (window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();
    loadingContext.done();

  }

  const handleFormChange = (field: string, errMsg: string) => {
    setValidateMsg({ ...validateMsg, [field]: errMsg });
  };

  const handleCreate = async () => {
    setLoading(true)
    if (!formValidation()) return;
    createSchool.mutate()
  };

  const formValidation = () => {
    const validateMsgTemp = { ...validateMsg };
    let valiResult = true;
    for (const key in validateMsg) {
      if (validateMsg[key] === null) {
        validateMsgTemp[key] = commonDictionary[language]?.fieldIsRequired;
      }
      if (validateMsgTemp[key]) valiResult = false;
    }
    setValidateMsg(validateMsgTemp);
    return valiResult;
  };

  return (
    <TeacherPgContainer onlyLogoImgNav={true}>
      <Box
        display='flex'
        justifyContent={'center'}
      >
        <FormContainer isMobile={isTablet}>
          <Typography variant='h4'>{dictionary[language]?.schoolSignup}</Typography>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12}>
              <TextField
                label={dictionary[language]?.schoolName}
                onChange={e => {
                  setSchoolName(e.target.value);
                  handleFormChange(
                    'schoolName',
                    e.target.value?.length === 0 ? dictionary[language]?.fieldIsRequired : ''
                  );

                }}
                error={!!validateMsg.schoolName}
                helperText={validateMsg.schoolName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={dictionary[language]?.firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                  handleFormChange(
                    'firstName',
                    e.target.value?.length === 0 ? dictionary[language]?.fieldIsRequired : ''
                  );

                }}
                error={!!validateMsg.firstName}
                helperText={validateMsg.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={dictionary[language]?.lastName}
                onChange={e => {
                  setLastName(e.target.value);
                  handleFormChange(
                    'lastName',
                    e.target.value?.length === 0 ? dictionary[language]?.fieldIsRequired : ''
                  );

                }}
                error={!!validateMsg.lastName}
                helperText={validateMsg.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={dictionary[language]?.district}
                onChange={e => {
                  setDistrict(e.target.value);
                  handleFormChange(
                    'district',
                    e.target.value?.length === 0 ? dictionary[language]?.fieldIsRequired : ''
                  );

                }}
                error={!!validateMsg.district}
                helperText={validateMsg.district}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="select-schoolType-label">
                  {dictionary[language]?.schoolType}
                </InputLabel>
                <Select
                  labelId="select-schoolType-label"
                  id="select-schoolType"
                  // value={countries[countries.findIndex((item: any) => item.name === schoolType.name)]}
                  label={dictionary[language]?.schoolType}
                  className={`${classes.select} err-border`}
                  // className={`${classes.select} err-border`}
                  onChange={async (e: any) => {
                    setSchoolType(e.target.value);
                    handleFormChange('schoolType', e.target.value?.length === 0 ? commonDictionary[language]?.fieldIsRequired : '');
                  }}
                  value={schoolType || ''}
                  sx={
                    validateMsg.schoolType
                      ? {
                        '& fieldset': {
                          borderColor: `${BasicColor.red} !important`,
                        },
                      }
                      : {}
                  }
                  displayEmpty={true}
                >
                  {SCHOOL_TYPES.map((value: any) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                <div className="err-text">{validateMsg.schoolType}</div>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={dictionary[language]?.zip}
                onChange={e => {
                  setZip(e.target.value);
                  handleFormChange(
                    'zip',
                    e.target.value.length === 0 ? dictionary[language]?.fieldIsRequired : ''
                  );
                }}
                error={!!validateMsg.zip}
                helperText={validateMsg.zip}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="select-country-label">
                  {dictionary[language]?.selectYourCountry}
                </InputLabel>
                <Select
                  labelId="select-country-label"
                  id="select-country"
                  value={countries[countries.findIndex((item: any) => item.name === country.name)]}
                  label={dictionary[language]?.selectYourCountry}
                  className={`${classes.select} err-border`}
                  // className={`${classes.select} err-border`}
                  onChange={async (e: any) => {
                    handleFormChange('country', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '');
                    setCountry(e.target.value)
                  }}
                  sx={
                    validateMsg.country
                      ? {
                        '& fieldset': {
                          borderColor: `${BasicColor.red} !important`,
                        },
                      }
                      : {}
                  }
                  displayEmpty={true}
                >
                  {countries.map((value: any, index: number) => (
                    <MenuItem value={value} key={index}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
                <div className="err-text">{validateMsg.country}</div>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={dictionary[language]?.email}
                onChange={e => {
                  setEmail(e.target.value);
                  // handleFormChange(
                  //   'email',
                  //   e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : !validateEmail(e.target.value) ? 'This is not email address' : ''
                  // );
                  /*------------- set username to email -S--------------------------*/
                  setUserName(e.target.value);
                  setValidateMsg({
                    ...validateMsg,
                    email: e.target.value.length === 0 ? dictionary[language]?.fieldIsRequired : !validateEmail(e.target.value) ? dictionary[language]?.thisIsNotEmailAddress : '',
                    userName: ''
                  });
                  /*------------- set username to email -E--------------------------*/

                }}
                error={!!validateMsg.email}
                helperText={validateMsg.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={dictionary[language]?.password}
                type="password"
                onChange={e => {
                  setPassword(e.target.value);
                  handleFormChange(
                    'password',
                    e.target.value.length === 0 ? dictionary[language]?.fieldIsRequired : ''
                  );
                }}
                error={!!validateMsg.password}
                helperText={validateMsg.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={dictionary[language]?.confirmPassword}
                type="password"
                onChange={e => {
                  // setConfPassword(e.target.value);
                  handleFormChange(
                    'confPassword',
                    e.target.value.length === 0
                      ? dictionary[language]?.fieldIsRequired
                      : password !== e.target.value
                        ? dictionary[language]?.passwordIsNotMatchedWithConfirmPassword
                        : ''
                  );
                }}
                error={!!validateMsg.confPassword}
                helperText={validateMsg.confPassword}
              />
            </Grid>
          </Grid>
          <LoadingButton
            sx={{ marginTop: 5 }}
            variant='contained'
            color='aqua'
            onClick={handleCreate}
            loading={loading}
          > {dictionary[language]?.submit}</LoadingButton>
          <FormBottomDescription language={language} />
        </FormContainer>
        <ContactBox language={language} />
      </Box>
    </TeacherPgContainer>
  );
};
export default SchoolSignup;
