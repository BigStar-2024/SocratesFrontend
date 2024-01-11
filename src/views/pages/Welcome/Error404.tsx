import { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { resetReducer } from 'app/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  ThemeProvider,
  useMediaQuery
} from '@mui/material';
import { themeTeacher } from 'views/Theme';
import notFoundPageImage from 'views/assets/others/404image.svg'
import { Typography } from '@mui/material';
import { ScreenSize } from 'constants/screenSize';
import { Wrapper } from './Style';

export const Error404: FC = () => {
  const isMobile = useMediaQuery(`(max-width: ${ScreenSize.phone})`)

  const history = useHistory();
  const dispatch = useDispatch();
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  useEffect(() => {
    resetReducer(dispatch);
  }, []);

  return (
    <ThemeProvider theme={themeTeacher}>
      <Wrapper>
        <Box display='flex' flexDirection='column' alignItems='center' gap={3}>
          <Typography variant='h1' fontWeight={'bold'}>Opps!</Typography>
          <Typography variant='h4'>Something went wrong.</Typography>
          <Typography variant='h5'>Error404: Page not found</Typography>
          <img src={notFoundPageImage}
            style={{ maxWidth: '100%', maxHeight: '60vh' }}
          />
          <Button
            variant='contained'
            color='aqua'
            onClick={() => history.goBack()}
            sx={{ marginBottom: 10 }}
          >Go Back</Button>
        </Box>
      </Wrapper>
    </ThemeProvider >
  );
};
