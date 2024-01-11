import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import license from 'views/assets/student-license.svg';
import TextField from 'views/molecules/MuiTextField';
import Button from 'views/molecules/MuiButton';
import { LSDialog } from 'views/molecules/Setting/LSDialog';
import { BasicColor } from 'views/Color';
import { changeStudentGrade } from 'app/actions/studentActions';
import { changeStudentPassword } from 'app/actions/studentActions';
import { ImageAvatar } from 'views/molecules/Avatar/DefaultAvatar';
import { dictionary } from './dictionary';

import {
  LicenseButton,
  useStyles,
  KidContainer,
  GridContainer,
  GridItem,
} from './Style';
import { KidsListProps } from 'app/entities/student';
import LicenseDgContent from './LicenseDgContent';

const KidsListItem: FC<KidsListProps> = ({
  audience,
  currentAvatarAccessories,
  currentAvatarClothes,
  currentAvatarHead,
  firstName,
  language,
  user,
  id,
  grade,
  dateJoined,
  parentName,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const langs = [{
    name: 'English',
    value: 'en-us'
  }]
  const userName = user?.username;
  const kidLanguage = user?.language;
  const studentId = id;
  const grades = audience?.gradeSet;
  const [_grade, setGrade] = useState(grade?.grade);
  const [newPwd, setNewPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [openLicense, setOpenLicense] = useState(false);
  const [openChangePwd, setOpenChangePwd] = useState(false);

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

  return (
    <KidContainer>
      <LSDialog
        isOpen={openLicense}
        open={() => setOpenLicense(!openLicense)}
        title={dictionary[language]?.yourChildLicense}
        fullWidth='true'
        dialogContent={
          <LicenseDgContent
            close={() => setOpenLicense(false)}
            kidName={userName}
            dateJoined={dateJoined}
            language={language}
            parentName={parentName}
          />
        }
      />
      <LSDialog
        isOpen={openChangePwd}
        open={() => setOpenChangePwd(!openChangePwd)}
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
                  onClick={() => setOpenChangePwd(false)}
                  value={dictionary[language]?.return}
                />
              </GridItem>
            </GridContainer>
          </>
        }
      />

      <GridContainer container className='align-center' columnSpacing={2}>
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
            name={firstName || 'So'}
            accessory={currentAvatarAccessories ? currentAvatarAccessories : null}
            head={currentAvatarHead ? currentAvatarHead : null}
            clothes={currentAvatarClothes ? currentAvatarClothes : null}
            // skinTone={null}
            size={70}
          />
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
              value={grades?.length > 0 ? grades[grades?.findIndex((item: any) => item?.id === _grade?.id)] : ''}
              label={dictionary[language]?.selectYourGrade}
              className={`${classes?.select} err-border`}
              onChange={async (e) => {
                setGrade(e?.target?.value);
                const res = await changeStudentGrade(e?.target?.value?.id, id, user?.token, dispatch)
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

export default KidsListItem;
