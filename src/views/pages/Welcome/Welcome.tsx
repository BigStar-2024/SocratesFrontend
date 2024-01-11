import {
  FC,
  // useState,
  useEffect
} from 'react';
import logo from 'views/assets/socrates-logo.svg';
import welcome from 'views/assets/welcome-page.svg';
import { dictionary } from 'views/pages/Welcome/dictionary';
// import { Modal } from 'views/atoms/Modal';
import { useHistory } from 'react-router-dom';
import { resetReducer } from 'app/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  ThemeProvider,
  useMediaQuery
} from '@mui/material';
import { welcomePage } from 'views/Theme';

import {
  Wrapper,
  Illustration,
  // ModalContent,
  // ModalStyles,
  // ModalItemsContainer,
} from './Style';
// import { TextInput } from '../../atoms/Text/TextInput';
import { Typography } from '@mui/material';
import { LanguageSelect } from 'views/organisms/Welcome/LanguageSelect';
import { ScreenSize } from 'constants/screenSize';
import { TermsAndConditions } from 'views/molecules/Login/TermsAndConditions';

export const Welcome: FC = () => {
  const isMobile = useMediaQuery(`(max-width: ${ScreenSize.phone})`)
  // const [joinModal, setJoinModal] = useState(false);
  // const [deployModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  // const sendEmail = () => {
  //   setJoinModal(!joinModal);
  // };

  useEffect(() => {
    resetReducer(dispatch);
  }, []);

  return (
    <ThemeProvider theme={welcomePage}>
      <Wrapper>
        <Box
          display='flex'
          justifyContent={isMobile ? 'start' : 'center'}
          width='100%'
          margin={2}
        >
          <img src={logo} alt='Learn with Socrates logo' style={{ width: isMobile ? '50%' : 'auto' }} />
        </Box>
        {/* {deployModal ? (
          <Modal>
            <ModalContent>
              <ModalStyles>
                {joinModal ? (
                  <ModalItemsContainer>
                    <Subheader>
                      Congratulations now you are part of SOCRATES!
                    </Subheader>
                    <Subheader>Check yout email</Subheader>
                  </ModalItemsContainer>
                ) : (
                  <ModalItemsContainer>
                    <Subheader>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </Subheader>
                    <TextInput label={'email'} />
                    <Button
                      onClick={sendEmail}
                      value={dictionary[language]?.join}
                      color={ButtonColor.join}
                      darkText={true}
                    />
                  </ModalItemsContainer>
                )}
              </ModalStyles>
            </ModalContent>
          </Modal>
        ) : null} */}
        {/* <Body> */}
        {/* <Header isDark={true}>{dictionary[language]?.practice}</Header> */}
        <Typography variant='h4' fontWeight='bold'>{dictionary[language]?.practice}</Typography>
        <Box
          sx={{
            position: 'absolute',
            right: '1vw',
            top: '1vh',
            // top: isMobile ? '1vh' : 'auto',
            minWidth: 120,
          }}>
          <LanguageSelect />
        </Box>
        <Box mt={1}>
          <Typography variant='body1'>{dictionary[language]?.description1}</Typography>
          <Typography variant='body1'>{dictionary[language]?.description2}</Typography>
        </Box>
        {/* </Body> */}

        <Illustration src={welcome} alt='' />

        <Grid container justifyContent='center' spacing={2} mt='3vh' maxWidth={'sm'} mb={5}>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => history.push('/teacher/selectCreateType')}
              variant='contained'
              color='secondary'
            >
              {dictionary[language]?.schoolSignUp}
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} >
            <Button
              color='yellow'
              variant='contained'
              style={{ width: 'unset' }}
              onClick={() => history.push('/parent/create')}
            >
              {dictionary[language]?.parentSignUp}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              value={dictionary[language]?.login}
              variant='contained'
              color='primary'
              style={{ width: 'unset' }}
              onClick={() => history.push('/login')}
            >
              {dictionary[language]?.login}
            </Button>
          </Grid>
        </Grid>
        <TermsAndConditions />
      </Wrapper>
    </ThemeProvider>
  );
};
