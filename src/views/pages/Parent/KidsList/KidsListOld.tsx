import { FC, useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingContext } from 'react-router-loading';
import { useSnackbar } from 'notistack';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import license from 'views/assets/student-license.svg';
import License from 'views/molecules/KidLicense/KidLicense';
import TextField from 'views/molecules/MuiTextField';
import Button from 'views/molecules/MuiButton';
import { ParentPgContainer } from 'views/molecules/ParentPgContainer/ParentPgContainer';
import { LSDialog } from 'views/molecules/Setting/LSDialog';
import { BasicColor } from 'views/Color';
import { Store } from 'app/configureStore';
import { changeStudentGrade } from 'app/actions/studentActions';
import { changeStudentPassword } from 'app/actions/studentActions';
import { ImageAvatar } from 'views/molecules/Avatar/DefaultAvatar';
// import { getAudiencesWithGrades } from 'app/actions/audienceActions'
import { dictionary } from './dictionary';

import {
  Title,
  LicenseButton,
  useStyles,
  Container,
  KidContainer,
  GridContainer,
  GridItem,
} from './Style';
import { Link, Typography } from '@mui/material';
import KidsListItem from 'views/organisms/Parent/KidsList/KidsListItem';

// interface kid {
//   username: string;
//   password: string;
//   grade: string;
//   avatar: string;
// }

const KidsList: FC = () => {
  const loadingContext = useContext(LoadingContext);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const user = useSelector((state: Store) => state?.user);
  const guardian = useSelector((state: any) => state?.guardian)
  const student = useSelector((state: any) => state?.student)

  const history = useHistory();
  const dispatch = useDispatch()

  // const [children, setChildren] = useState<kid[]>([]);
  // const [audiences, setAudiences] = useState<any>();
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  const langs = [{
    name: 'English',
    value: 'en-us'
  }]

  const Kid = (props: any) => {

    const userName = props?.user?.username;
    const kidLanguage = props?.user?.language;
    // const parentName  = user?.username;
    // const fullName    = props?.fullName;
    const studentId = props?.id;
    const grades = props?.audience?.gradeSet;
    const [grade, setGrade] = useState(props?.grade?.grade);
    const [newPwd, setNewPwd] = useState('');
    const [loading, setLoading] = useState(false);
    const [openLicense, setOpenLicense] = useState(false);
    const [openChangePwd, setOpenChangePwd] = useState(false);

    const openLicenseDlg = () => {

      setOpenLicense(!openLicense);

    };

    const openChangePwdDlg = () => {

      setOpenChangePwd(!openChangePwd);

    };

    const handleDownloadBtnClicked = () => {

      setLoading(true)
      const licenseElm: any = document.querySelector('#license');
      toPng(licenseElm).then(function (dataUrl) {
        saveAs(dataUrl, `${userName}-license`);
        setLoading(false)
      });

    };

    const handleChangePwdBtnClicked = async () => {

      if (newPwd?.length < 1) return;

      setLoading(true);
      const result: any = await changeStudentPassword(newPwd, studentId, user?.token, dispatch)
      setLoading(false);

      if (!result?.success) {
        enqueueSnackbar(result?.msg, { variant: 'error' });
        return;
      }

    };

    const handleCancelBtnClicked = () => {

      setOpenLicense(false);
      setOpenChangePwd(false);

    };

    // useEffect(() => {

    //   loadingContext?.done();

    // }, []);

    return (
      <KidContainer>
        <LSDialog
          isOpen={openLicense}
          open={openLicenseDlg}
          title={dictionary[language]?.yourChildLicense}
          fullWidth='true'
          dialogContent={
            <>
              <License
                parentName={user?.username}
                kidName={userName}
                // membership={props?.guardianstudentplanSet?.legnth > 0 ? new Date(props?.guardianstudentplanSet[0]?.expiredAt) : ''}
                membership={''}
              />
              <GridContainer container>
                <GridItem item md={6} xs={12}>
                  <Button
                    bgColor={BasicColor.green}
                    onClick={handleDownloadBtnClicked}
                    loading={loading}
                    value={dictionary[language]?.download}
                  />
                </GridItem>
                <GridItem item md={6} xs={12}>
                  <Button
                    bgColor={BasicColor.gray60}
                    onClick={() => handleCancelBtnClicked()}
                    value={dictionary[language]?.return}
                  />
                </GridItem>
              </GridContainer>
            </>
          }
        />
        <LSDialog
          isOpen={openChangePwd}
          open={openChangePwdDlg}
          title={dictionary[language]?.changeYourPassword}
          fullWidth='true'
          dialogContent={
            <>
              <GridContainer container>
                <GridItem item md={12} xs={12}>
                  <TextField
                    label={dictionary[language]?.password}
                    onChange={e => {
                      setNewPwd(e?.target?.value);
                    }}
                    error={newPwd?.length > 0 ? false : true}
                    helperText={dictionary[language]?.passwordFieldIsRequired}
                  />
                </GridItem>
                <GridItem item md={6} xs={12}>
                  <Button
                    bgColor={BasicColor.green}
                    onClick={handleChangePwdBtnClicked}
                    loading={loading}
                    value={dictionary[language]?.change}
                  />
                </GridItem>
                <GridItem item md={6} xs={12}>
                  <Button
                    bgColor={BasicColor.gray60}
                    onClick={() => handleCancelBtnClicked()}
                    value={dictionary[language]?.return}
                  />
                </GridItem>
              </GridContainer>
            </>
          }
        />

        <GridContainer container className='align-center'>
          <GridItem item xs={6} md={0.7}
            onClick={() => history.push('/parent/reporting/' + studentId)}
            sx={{
              marginRight: 2,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          >
            <ImageAvatar
              name={student?.fullName ? student?.fullName : 'F'}
              accessory={props?.currentAvatarAccessories ? props?.currentAvatarAccessories : null}
              head={props?.currentAvatarHead ? props?.currentAvatarHead : null}
              clothes={props?.currentAvatarClothes ? props?.currentAvatarClothes : null}
              // skinTone={null}
              size={70}
            />
            {/* <Avatar src={props?.avatar} onClick={() => history?.push('/parent/reporting')} /> */}
          </GridItem>
          <GridItem item xs={6} md={1.3}>
            <LicenseButton src={license} onClick={() => setOpenLicense(true)} />
          </GridItem>
          <GridItem item xs={12} md={2}>
            <TextField
              label={dictionary[language]?.userName}
              value={userName}
            />
          </GridItem>
          <GridItem item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id='select-grade-label'>
                {dictionary[language]?.selectYourGrade}
              </InputLabel>
              <Select
                labelId='select-grade-label'
                id='select-grade'
                value={grades?.length > 0 ? grades[grades?.findIndex((item: any) => item?.id === grade?.id)] : ''}
                label={dictionary[language]?.selectYourGrade}
                className={`${classes?.select} err-border`}
                onChange={async (e) => {
                  setGrade(e?.target?.value);
                  const res = await changeStudentGrade(e?.target?.value?.id, props?.id, user?.token, dispatch)
                  if (!res?.success) {
                    enqueueSnackbar(res?.msg, { variant: 'error' });
                  }
                }}
                displayEmpty={true}
              >
                {grades?.length > 0 && grades?.map((value: any, index: number) => (
                  <MenuItem value={value} key={index}>
                    {value?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id='select-lang-label'>
                {dictionary[language]?.selectYourLanguage}
              </InputLabel>
              <Select
                labelId='select-lang-label'
                id='select-lang'
                value={langs[langs?.findIndex((item: any) => item?.value === kidLanguage)]}
                label={dictionary[language]?.selectYourLanguage}
                className={`${classes.select} err-border`}
                onChange={async () => {
                  // setGrade(e.target.value);
                  // console.log(props)
                  // const res = await changeStudentGrade(e.target.value.id, props.id, user.token, dispatch)
                  // if(!res.success) {
                  //   enqueueSnackbar(res.msg, { variant: 'error' });
                  // }
                }}
                displayEmpty={true}
              >
                {langs?.length && langs?.length > 0 && langs?.map((value: any, index: number) => (
                  <MenuItem value={value} key={index}>
                    {value?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem item xs={12} md={1.5}>
            <Button
              bgColor={BasicColor.shadeBrown}
              onClick={() => setOpenChangePwd(true)}
              value={dictionary[language]?.changePassword}
            />
          </GridItem>
          <GridItem item xs={12} md={1.5}>
            <Button
              bgColor={BasicColor.red}
              onClick={() => history.push('/login')}
              value={dictionary[language]?.studentLogin}
            />
          </GridItem>
        </GridContainer>
      </KidContainer>
    );
  };

  useEffect(() => {
    if (window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();
    loadingContext.done();

    // onInit();
  }, []);

  // const onInit = async () => {

  //   if (window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();

  //   // const guardianStudents = guardian?.guardianstudentSet
  //   // const students = [];

  //   // for (const guardianStudent of guardianStudents) {
  //   //   students.push(guardianStudent?.student)
  //   // }
  //   // setChildren(students)
  //   loadingContext.done();
  // }

  return (
    <ParentPgContainer onlyLogoImgNav={false}>
      <Container>
        <Title>{dictionary[language]?.yourChildren}</Title>
        {guardian.guardianstudentSet.map((child: any, index: number) => (
          <KidsListItem {...child.student} index={index} key={child.id} language={language} />
          // <Kid {...child.student} index={index} key={child.id}></Kid>
        ))}
        {
          guardian.availableGuardianstudentplan.length ?
            <Typography variant='h6'>Please finish registration for your children_privacy
              <Link href='/kids/new'> here</Link>.</Typography>
            : null
        }
        {/* {children?.map((child, index) => (
          <Kid {...child} index={index} key={index}></Kid>
        ))} */}
      </Container>
    </ParentPgContainer>
  );
};

export default KidsList;
