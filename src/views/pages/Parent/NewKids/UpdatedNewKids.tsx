import { FC, useEffect, useState, useContext } from 'react';
import { ParentPgContainer } from 'views/molecules/ParentPgContainer/ParentPgContainer';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Tooltip,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import {
  useStyles, Subjects,
  Subject, SubjectIcon, SubjectTitle
} from './Style';
import {
  Title, Tip, Container, Welcome, PaperContainer,
} from './Style';
import welcome from 'views/assets/welcome-kid-new.svg';
import Button from 'views/molecules/MuiButton';
import TextField from 'views/molecules/MuiTextField';
import { ButtonColor, BasicColor } from 'views/Color';
import math_gold from 'views/assets/packageIcons/math_gold.svg';
import ela_gold from 'views/assets/packageIcons/ela_gold.svg';
import science_gold from 'views/assets/packageIcons/science_gold.svg';
import financial_gold from 'views/assets/packageIcons/financial_gold.svg';
import health_gold from 'views/assets/packageIcons/health_gold.svg';
import math_combo from 'views/assets/packageIcons/math_combo.svg';
import ela_combo from 'views/assets/packageIcons/ela_combo.svg';
import science_combo from 'views/assets/packageIcons/science_combo.svg';
import financial_combo from 'views/assets/packageIcons/financial_combo.svg';
import health_combo from 'views/assets/packageIcons/health_combo.svg';
import math_sole from 'views/assets/packageIcons/math_sole.svg';
import ela_sole from 'views/assets/packageIcons/ela_sole.svg';
import science_sole from 'views/assets/packageIcons/science_sole.svg';
import financial_sole from 'views/assets/packageIcons/financial_sole.svg';
import health_sole from 'views/assets/packageIcons/health_sole.svg';
import { LoadingContext } from 'react-router-loading';
import { getAudiencesWithGrades } from 'app/actions/audienceActions'
import InfoIcon from '@mui/icons-material/Info';
import { useSnackbar } from 'notistack';
import {
  CURRICULUM_TOOLTIP,
  GRADE_TOOLTIP
} from 'constants/parent';
import { LSGridRow } from 'views/molecules/Setting/utils/Style';
import { dictionary } from './dictionary';
import commonDictionary from 'constants/commonDictionary'
import {
  useQuery,
  useQueryClient,
  useMutation,
} from 'react-query'
import { doCreateStudentPlan, doFetchGuardianAvailablePlans } from 'app/actions/guardianActions';

const NewKids: FC = () => {
  const queryClient = useQueryClient()
  const loadingContext = useContext(LoadingContext);
  const history = useHistory();
  const classes = useStyles();
  const token = useSelector((state: any) => state.user.token)
  const guardianId = useSelector((state: any) => state.guardian.id)

  const { status, data: availablePlans } = useQuery(['fetch-plans-list', guardianId, token], () => doFetchGuardianAvailablePlans(guardianId, token))
  const { enqueueSnackbar } = useSnackbar();
  const [audiences, setAudiences] = useState([]);
  const [grades, setGrades] = useState([]);
  const [currentPackage, setCurrentPackage] = useState<any>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [audience, setAudience] = useState<any>();
  const [grade, setGrade] = useState<any>();
  const [paths, setPaths] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipGrade, setShowTooltipGrade] = useState(false);
  const create = useMutation((value: any) => doCreateStudentPlan(
    value.audience,
    value.firstName,
    value.lastName,
    value.userId,
    value.password,
    value.currentPackageId,
    value.listSubjectIds,
    value.studentPlan,
    value.gradeId,
    value.token
  ), {
    onSuccess: async data => {
      if (data.message) {
        enqueueSnackbar(data.message, { variant: 'error' })
      }
      else {
        queryClient.setQueryData(['fetch-plans-list', guardianId, token], data)
        console.log({
          data,
          availablePlans
        })
        data.length === 0 && history.push('/kids/list');
        enqueueSnackbar('Student Create Succeed!', { variant: 'success' })
        setCurrentPackage(null)
        setAudience(null)
        // setUserId('');
        setPassword('');
        setConfPassword('');
        setGrade(null);
        setValidateMsg({
          firstName: '',
          lastName: '',
          userId: '',
          password: null,
          confPassword: null,
          grade: null,
        });
      }
    },
    onError: async (error: any) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
    onSettled: async () => {
      setLoading(false)
      console.log({ availablePlans })
    }
  })
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  const subjectIconsById: any = {
    Gold: {
      'Mat': math_gold,
      'Fin': financial_gold,
      'Sci': science_gold,
      'ELA': ela_gold,
      'Hea': health_gold,
      'Sig': ela_gold,
    },
    Combo: {
      'Mat': math_combo,
      'Fin': financial_combo,
      'Sci': science_combo,
      'ELA': ela_combo,
      'Hea': health_combo,
      'Sig': ela_combo,
    },
    Sole: {
      'Mat': math_sole,
      'Fin': financial_sole,
      'Sci': science_sole,
      'ELA': ela_sole,
      'Hea': health_sole,
      'Sig': ela_sole,
    }
  }

  const handleCheckPath = (path: string, isChecked: boolean) => {
    let temp: any = [];
    temp = [...paths];
    if (isChecked) {
      temp.push(path);
      if (temp.length > 2) temp.shift();
    } else temp.splice(temp.indexOf(path), 1);
    setPaths(temp);
  };

  const [validateMsg, setValidateMsg] = useState<{ [key: string]: any }>({
    packageName: null,
    firstName: '',
    lastName: '',
    userId: null,
    password: null,
    confPassword: null,
    audience: null,
    grade: null,
  });

  const handleFormChange = (field: string, errMsg: string) => {
    setValidateMsg({ ...validateMsg, [field]: errMsg });
  };


  const handleNext = async () => {
    if (!formValidation()) return;

    setLoading(true)
    saveChild()
  };

  const saveChild = async () => {
    const listSubjectId: number[] = [];
    const studentPlan = 1;
    for (const path of paths)
      listSubjectId.push(parseInt(path.id));
    create.mutate({
      audience: audience?.id,
      firstName: firstName,
      lastName: lastName,
      userId: userId,
      password: password,
      currentPackageId: currentPackage.id,
      listSubjectIds: listSubjectId,
      studentPlan: studentPlan,
      gradeId: grade.id,
      token: token
    })
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

  const setAudienceData = async () => {
    const result: any = await getAudiencesWithGrades()
    if (!result.success) {
      enqueueSnackbar(result.msg, { variant: 'error' })
      return false;
    }
    if (result.data.length < 1) return false
    setAudiences(result.data)
    // setAudience(result.data[1]) // sets default curriculum as US
    // setGrades(result.data[1].gradeSet) // set US curriculum Grades
    return true;
  }

  // const goldCount: number = guardianStudentPlans.reduce((counter: number, { plan }: any) => { return plan.name === 'Gold' ? counter + 1 : counter }, 0)
  const onPageInit = async () => {

    if (window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget()

    await setAudienceData()
    // loadingContext.done()
  }
  useEffect(() => {
    onPageInit();
  }, []);

  if (status === 'success') {
    loadingContext.done()
  }

  return (
    <ParentPgContainer onlyLogoImgNav={false}>
      {availablePlans && <Container>
        <PaperContainer>
          <Paper elevation={3} className={classes.paper}>
            <Title>{dictionary[language]?.addingANewChild}</Title>
            <Tip>{dictionary[language]?.pleaseCompleteTheFollowingToGetYourChildStarted}</Tip>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='select-audience-label'>
                    {dictionary[language]?.selectYourCurriculum}
                  </InputLabel>
                  <Select
                    labelId='select-audience-label'
                    id='select-audience'
                    value={audience?.standardCode || ''}
                    label={dictionary[language]?.selectYourCurriculum}
                    className={`${classes.select} err-border`}
                    onChange={(e: any) => {
                      const _audience: any = audiences.find((item: any) => item.standardCode === e.target.value)
                      setAudience(_audience);
                      setGrades(_audience?.gradeSet)
                      setGrade({})
                      validateMsg.grade = null
                      validateMsg.audience = '';
                      setValidateMsg({ ...validateMsg });
                    }}
                    sx={
                      validateMsg.audience
                        ? {
                          '& fieldset': {
                            borderColor: `${BasicColor.red} !important`,
                          },
                        }
                        : {}
                    }
                    displayEmpty={true}
                  >
                    {audiences?.length > 0 && audiences.map((_audience: any, index: number) => (
                      <MenuItem value={_audience.standardCode} key={index}>
                        {_audience.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Tooltip title={CURRICULUM_TOOLTIP[language]} arrow placement='left-start'
                    open={showTooltip}
                    onOpen={() => setShowTooltip(true)}
                    onClose={() => setShowTooltip(false)}
                    sx={{
                      '&.MuiTooltip-tooltip': {
                        fontSize: 12,
                      }
                    }} >
                    <InfoIcon
                      onClick={() => setShowTooltip(!showTooltip)}
                      fontSize='small' sx={{ zIndex: 1, position: 'absolute', right: -15, top: 0, color: BasicColor.green }}
                    />
                  </Tooltip>
                  <div className='err-text'>{validateMsg.audience}</div>
                </FormControl>
              </Grid>

              {/* Select Available Packages */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='select-package-label'>
                    {dictionary[language]?.selectYourPackage}
                  </InputLabel>
                  <Select
                    labelId='select-package-label'
                    id='select-package'
                    value={currentPackage?.plan?.id || ''}
                    label={dictionary[language]?.selectYourPackage}
                    className={`${classes.select} ${currentPackage?.plan?.name === 'Gold'
                      ? classes.goldInput
                      : currentPackage?.plan?.name === 'Combo'
                        ? classes.comboInput
                        : classes.soleInput
                      } err-border`}
                    onChange={e => {
                      const selected: any = availablePlans.find(({ plan }: any) => plan.id === e.target.value)
                      setCurrentPackage(selected);

                      if (selected.plan?.name === 'Gold') setPaths(selected.plan?.subjects.
                        filter((sub: any) => sub.audience.standardCode === audience?.standardCode || sub.audience.standardCode === 'US')
                      )
                      else setPaths([]);
                      handleFormChange(
                        'packageName',
                        selected.length === 0 ? `${dictionary[language]?.fieldIsRequired}` : ''
                      );
                    }}
                    sx={
                      validateMsg.packageName
                        ? {
                          '& fieldset': {
                            borderColor: `${BasicColor.red} !important`,
                          },
                        }
                        : {}
                    }
                    displayEmpty={true}
                  >
                    {availablePlans.map((plan: any) => (
                      <MenuItem value={plan.plan.id} key={plan.id}>
                        {plan?.plan?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className='err-text'>{validateMsg.packageName}</div>
                </FormControl>
              </Grid>

              <Grid item xs={12} className='font-s-20'>
                {currentPackage?.plan?.name === 'Gold' && ''}
                {currentPackage?.plan?.name === 'Combo' && 'Pick Two'}
                {currentPackage?.plan?.name === 'Sole' && 'Pick One'}
              </Grid>

              {currentPackage && (
                <Grid item xs={12}>
                  <Subjects color={currentPackage?.plan?.name}>
                    {currentPackage?.plan?.subjects.
                      filter((sub: any) => sub.audience.standardCode === audience?.standardCode || sub.audience.standardCode === 'US').
                      map((subject: any, index: number) => (
                        <Subject key={index}>
                          {currentPackage?.plan?.name === 'Gold' && (
                            <SubjectIcon src={subjectIconsById.Gold[subject?.universalAreaKnowledge.name.slice(0, 3)]} />
                          )}
                          {currentPackage?.plan?.name === 'Combo' && (
                            <>
                              <Checkbox
                                sx={{
                                  color: BasicColor.aqua,
                                  '&.Mui-checked': { color: BasicColor.aqua },
                                  padding: '0px',
                                  paddingLeft: '9px',
                                  paddingRight: '9px',
                                }}
                                onChange={e =>
                                  handleCheckPath(subject, e.target.checked)
                                }
                                checked={paths.indexOf(subject) !== -1}
                              />
                              <SubjectIcon src={subjectIconsById.Combo[subject?.universalAreaKnowledge.name.slice(0, 3)]} />
                            </>
                          )}
                          {currentPackage?.plan?.name === 'Sole' && (
                            <>
                              <Radio
                                value={subject}
                                onClick={() => setPaths([subject])}
                                checked={paths[0] === subject}
                                sx={{
                                  color: BasicColor.greenSoft,
                                  '&.Mui-checked': { color: BasicColor.greenSoft },
                                  padding: '0px',
                                  paddingLeft: '9px',
                                  paddingRight: '9px',
                                }}
                              />
                              <SubjectIcon src={subjectIconsById.Sole[subject?.universalAreaKnowledge.name.slice(0, 3)]} />
                            </>
                          )}
                          <SubjectTitle>{subject.name}</SubjectTitle>
                        </Subject>
                      ))}
                  </Subjects>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label={dictionary[language]?.childFirstName}
                  onChange={e => {
                    setFirstName(e.target.value);
                    handleFormChange(
                      'firstName',
                      e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : ''
                    );
                  }}
                  error={!!validateMsg.firstName}
                  helperText={validateMsg.firstName}
                  value={firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={dictionary[language]?.firstLetterofChildLastName}
                  onChange={e => {
                    setLastName(e.target.value);
                    handleFormChange(
                      'lastName',
                      e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : ''
                    );
                  }}
                  error={!!validateMsg.lastName}
                  helperText={validateMsg.lastName}
                  value={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={dictionary[language]?.childUsernameDoNotUseYourRealName}
                  onChange={e => {
                    setUserId(e.target.value);
                    handleFormChange(
                      'userId',
                      e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : ''
                    );
                  }}
                  error={!!validateMsg.userId}
                  helperText={validateMsg.userId}
                  value={userId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={dictionary[language]?.password}
                  onChange={e => {
                    setPassword(e.target.value);
                    handleFormChange(
                      'password',
                      e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : ''
                    );
                  }}
                  error={!!validateMsg.password}
                  helperText={validateMsg.password}
                  value={password}
                  type='password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={dictionary[language]?.confirmPassword}
                  onChange={e => {
                    setConfPassword(e.target.value);
                    handleFormChange(
                      'confPassword',
                      e.target.value.length === 0
                        ? commonDictionary[language]?.fieldIsRequired
                        : e.target.value !== password
                          ? 'Confirm password in not matched with password'
                          : ''
                    );
                  }}
                  error={!!validateMsg.confPassword}
                  helperText={validateMsg.confPassword}
                  value={confPassword}
                  type='password'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='select-grade-label'>
                    {dictionary[language]?.selectYourGrade}
                  </InputLabel>
                  <Select
                    labelId='select-grade-label'
                    id='select-grade'
                    value={grade?.id || ''}
                    label={dictionary[language]?.selectYourGrade}
                    className={`${classes.select} err-border`}
                    onChange={e => {
                      const selectedGrade: any = grades.find((item: any) => item.id === e.target.value)
                      setGrade(selectedGrade);
                      handleFormChange(
                        'grade',
                        ''
                      );
                    }}
                    sx={
                      validateMsg.grade
                        ? {
                          '& fieldset': {
                            borderColor: `${BasicColor.red} !important`,
                          },
                        }
                        : {}
                    }
                    displayEmpty={true}
                  >
                    {grades?.length > 0 && grades.map((value: any) => (
                      <MenuItem value={value.id} key={value.id}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Tooltip title={GRADE_TOOLTIP[language]} arrow placement='left-start'
                    open={showTooltipGrade}
                    onOpen={() => setShowTooltipGrade(true)}
                    onClose={() => setShowTooltipGrade(false)}
                    sx={{
                      fontSize: 20,
                      '& .MuiTooltip-tooltip': {
                        fontSize: 12,
                      }
                    }} >
                    <InfoIcon
                      onClick={() => setShowTooltipGrade(!showTooltipGrade)}
                      fontSize='small' sx={{ zIndex: 1, position: 'absolute', right: -15, top: 0, color: BasicColor.green }} />
                  </Tooltip>
                  <div className='err-text'>{validateMsg.grade}</div>
                </FormControl>
              </Grid>
              <LSGridRow item xs={12} md={12} lg={6}>
                <Button
                  value={availablePlans.length > 1 ? dictionary[language]?.nextKid : dictionary[language]?.finish}
                  bgColor={
                    availablePlans.length > 1
                      ? ButtonColor.nextKid
                      : ButtonColor.create
                  }
                  onClick={handleNext}
                  disabled={availablePlans.length < 1 ? true : false}
                  align='right'
                  loading={loading}
                />
              </LSGridRow>
            </Grid>
          </Paper>
        </PaperContainer>
        <Welcome>
          <img src={welcome} />
        </Welcome>
      </Container>}
    </ParentPgContainer>
  );
};

export default NewKids;
