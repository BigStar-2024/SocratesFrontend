import { FC, useState } from 'react';
import * as React from 'react';
// import { doUpdateGuardianEmailPassword } from 'app/actions/guardianActions';
// import { validate } from 'email-validator';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import validator from 'validator'
// import { GUARDIAN_UPDATE_EMAIL_PWD } from 'app/types'
import {
  LSShadowContainer,
  LSButtonContainer,
  LSGridRow,
  LSTitle,
  LSText,
  LSLabel,
} from 'views/molecules/Setting/utils/Style';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { LSDialog } from 'views/molecules/Setting/LSDialog';
import { TeacherPwdResetForm } from './Forms/PwdResetFrom';
import { useSnackbar } from 'notistack';
import { dictionary } from './dictionary'

export const TeacherSettingProfile: FC = () => {
  const user = useSelector((state: any) => state.user);
  const [openPwdRstDg, setOpenPwdRstDg] = useState(false)
  // const { enqueueSnackbar } = useSnackbar();
  // const dispatch = useDispatch();
  let language: string = useSelector((state: any) => state.user.language);
  // language = language ? language : 'en-us'
  language = 'en-us'

  const toggleOpenPwdRstDg = () => {
    setOpenPwdRstDg(!openPwdRstDg)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const email = data.get('email')?.toString()
    // const newEmail = email ? email : ''
    // if (validator.isEmail(newEmail)) {
    //   const res: any = await doUpdateGuardianEmailPassword(newEmail, user.username, 'pwd.password', user.token)
    //   if (res === null)
    //     enqueueSnackbar(dictionary[language]?.emailIsNotValid, { variant: 'error' })
    //   else {
    //     dispatch({
    //       type: GUARDIAN_UPDATE_EMAIL_PWD,
    //       payload: { email: newEmail }
    //     });
    //     enqueueSnackbar(dictionary[language]?.emailUpdatedSuccessfully, { variant: 'success' })
    //   }
    // }
    // else
    //   enqueueSnackbar(dictionary[language]?.emailIsNotValid, { variant: 'error' })
  };

  return (
    <Box>
      <LSShadowContainer >
        <LSTitle>
          {dictionary[language]?.profileAndSettings}
        </LSTitle>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ flexGrow: 1 }}>
          <LSGridRow container>
            <Grid item lg={4} xs={12}>
              <LSLabel>
                {dictionary[language]?.name}
              </LSLabel>
            </Grid>
            <Grid item lg={8} xs={12}>
              <LSText pl={20} >
                {user.username}
              </LSText>
            </Grid>
          </LSGridRow>
          <LSGridRow container>
            <Grid item lg={4} xs={12}>
              <LSLabel>
                {dictionary[language]?.currentEmail}
              </LSLabel>
            </Grid>
            <Grid item lg={8} xs={12}>
              <LSText pl={20}>
                {user.email}
              </LSText>
            </Grid>
          </LSGridRow>
          <LSGridRow container>
            <Grid item lg={4} xs={12}>
              <LSLabel >
                {dictionary[language]?.changeEMail}
              </LSLabel>
            </Grid>
            <Grid item lg={8} xs={12}>
              <TextField
                margin='normal'
                required
                size='small'
                id='email'
                label={'e-mail address'}
                name='email'
                autoComplete='email'
              />
            </Grid>
          </LSGridRow>
          <LSGridRow container>
            <Grid item lg={4} xs={12}>
              <LSLabel >
                {dictionary[language]?.password}
              </LSLabel>
            </Grid>
            <Grid item lg={8} xs={12}>
              <LSDialog
                isOpen={openPwdRstDg}
                open={toggleOpenPwdRstDg}
                title={dictionary[language]?.changePassword}
                dialogContent={
                  <TeacherPwdResetForm open={toggleOpenPwdRstDg} />
                }
              />
              <Button onClick={toggleOpenPwdRstDg}>
                {dictionary[language]?.changePassword}
              </Button>
            </Grid>
          </LSGridRow>
          <LSButtonContainer>
            <Button
              type={dictionary[language]?.submit}
              variant='contained'
            >
              {dictionary[language]?.submit}
            </Button>
          </LSButtonContainer>
        </Box>
      </LSShadowContainer>
    </Box>
  );
}

