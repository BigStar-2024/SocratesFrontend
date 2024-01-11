import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux'
import { login, resetReducer } from 'app/actions/userActions'
import { ButtonColor } from 'views/Color';
import logo from 'views/assets/socrates-logo.svg';
import classroom from 'views/assets/teacher-and-children.svg';
import greeting from 'views/assets/greeting.svg';
import { Actions } from 'views/molecules/Login/Actions';
import { Form } from 'views/molecules/Login/Form';
import { Greet } from 'views/molecules/Login/Greet';
import { dictionary } from './dictionary';
import { useSelector } from 'react-redux';
import {
  Box,
  Link,
  ThemeProvider,
  Typography,
  useMediaQuery
} from '@mui/material';
import { BasicColor } from 'views/Color';
import { USER_TYPE } from 'constants/common';
import background from 'views/assets/colored-shapes-bg.svg';
import { ScreenSize } from 'constants/screenSize';
import { themeTeacher } from 'views/Theme';
import { TermsAndConditions } from 'views/molecules/Login/TermsAndConditions';

export const LogIn: FC = () => {
  const isTablet = useMediaQuery(`(max-width: ${ScreenSize.tablet})`)
  const history = useHistory();
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();

  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginAction = async () => {

    setLoading(true);
    const result: any = await login(username, password, dispatch, language);
    setLoading(false);

    if (!result.success) {
      enqueueSnackbar(result.msg, { variant: 'error' });
      return;
    }
    switch (result.userType) {
      case USER_TYPE.student:
        history.push('/home')
        return;
      case USER_TYPE.guardian:
        history.push('/kids/list')
        return;
      case USER_TYPE.teacher:
        history.push('/kids/list')
        return;
      case USER_TYPE.noPlans:
        history.push('/parent/payment')
        return;
      default:
        history.push('/home')
    }
  }

  useEffect(() => {
    resetReducer(dispatch)
  }, []);

  return (
    <ThemeProvider theme={themeTeacher}>
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
          display: isTablet ? 'flex' : 'grid',
          ...(isTablet && { flexDirection: 'column', }),
          ...(!isTablet && { gridTemplateColumns: '1fr 1fr' }),
        }}>
        <Box
          id='logo-container'
          display={isTablet ? 'flex' : 'none'}
          justifyContent={'start'}
          ml={2}
          mt={1}
        >
          <img src={logo} alt='Learn with Socrates logo' style={{ width: isTablet ? '50%' : 'auto' }} />
        </Box>
        <Greet
          header={dictionary[language]?.welcome}
          // subheader ={dictionary[language]?.instructions}
          logo={logo}
          classroomIllustration={classroom}
          greetingIllustration={greeting}
        />

        <Box
          id='actions-container'
          pl={3}
          pr={isTablet ? 3 : 20}
          pt={isTablet ? 2 : 10}
          display='flex'
          justifyContent='space-between'
          flexDirection='column'
          borderRadius={isTablet ? '30px 30px 0 0' : 0}
          sx={{
            background: BasicColor.blue
          }}
        >
          <Box flexGrow={1} minHeight={30} />
          <Typography
            variant='h4'
            sx={
              isTablet ?
                { display: 'none' } :
                { color: 'white', margin: 5, textAlign:'unset' }}>
            {dictionary[language]?.welcome}
          </Typography>
          <Typography variant='h5' mb={2} sx={{ color: 'white', textAlign: 'unset' }}>{dictionary[language]?.login}</Typography>
          <Form
            emailLabel={dictionary[language]?.userName}
            password={dictionary[language]?.password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
          <Link href={`${process.env.REACT_APP_SERVER_URL}password_reset/`} mt={2} style={{ cursor: 'pointer', color: 'white', textAlign: 'unset' }}>{dictionary[language]?.forgot}</Link>
          <Actions
            googleText={dictionary[language]?.with_google}
            googleColor={ButtonColor.google}
            googleAction={() => console.log('google auth')} // !! remove console.logs!!!
            or={dictionary[language]?.or}
            loginText={dictionary[language]?.login}
            loginColor={ButtonColor.login}
            loginAction={loginAction}
            loading={loading}
            disabled={true}
          />
          <Box flexGrow={1} minHeight={30} />
          <TermsAndConditions />
        </Box>
      </Box >
    </ThemeProvider>
  );
};
