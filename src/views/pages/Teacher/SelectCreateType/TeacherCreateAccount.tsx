import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import logo from 'views/assets/socrates-logo.svg';
import classroom from 'views/assets/teacher-and-children.svg';
import greeting from 'views/assets/greeting.svg';
import { Greet } from 'views/molecules/Login/Greet';
import { dictionary } from './dictionary';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  ThemeProvider,
  Typography,
  useMediaQuery
} from '@mui/material';
import { BasicColor } from 'views/Color';
import background from 'views/assets/colored-shapes-bg.svg';
import { ScreenSize } from 'constants/screenSize';
import { themeTeacher } from 'views/Theme';
import { TermsAndConditions } from 'views/molecules/Login/TermsAndConditions';

export const TeacherCreateAccount: FC = () => {
  const isTablet = useMediaQuery(`(max-width: ${ScreenSize.tablet})`)
  const history = useHistory();

  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

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
          flexGrow={1}
          pl={isTablet ? 0 : 3}
          pr={isTablet ? 0 : 20}
          pt={isTablet ? 0 : 10}
          display='flex'
          justifyContent='space-between'
          flexDirection='column'
          alignItems='center'
          borderRadius={isTablet ? '30px 30px 0 0' : 0}
          sx={{
            background: BasicColor.blue
          }}
        >
          <Box flexGrow={1} minHeight={30} />
          <Typography variant='h4' mb={2} color='white' textAlign='center'>{dictionary[language]?.practicePlayGrow}</Typography>
          <Typography variant='body1' color='white' textAlign='center'>{dictionary[language]?.content}</Typography>
          <Grid container spacing={2} mt={isTablet ? 3 : 5}>
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                color='yellow'
                onClick={() => history.push('/teacher/teacherSignup')}>
                {dictionary[language]?.createClassroomAccount}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                color='aqua'
                onClick={() => history.push('/teacher/schoolSignup')}>
                {dictionary[language]?.createSchoolAccount}
              </Button>
            </Grid>
          </Grid>
          <Box flexGrow={1} minHeight={30} />
          <TermsAndConditions />
        </Box >
      </Box >
    </ThemeProvider >
  );
};
