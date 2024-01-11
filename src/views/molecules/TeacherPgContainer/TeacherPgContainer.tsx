import { FC, ReactChildren, ReactChild } from 'react';
import Menu from 'views/pages/Teacher/Menus/TeacherMenu';
import logo from 'views/assets/socrates-logo.svg';

import { TeacherPgWrapper } from 'views/atoms/TeacherPgWrapper';
import {
  Box,
  Container,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { themeTeacher } from 'views/Theme';
import { ScreenSize } from 'constants/screenSize';

type ParentPgContainerProps = {
  onlyLogoImgNav: boolean;
  children: ReactChild | ReactChildren;
  title?: string
};

export const TeacherPgContainer: FC<ParentPgContainerProps> = ({ onlyLogoImgNav, title, children = (<></>) }) => {
  const isTablet = useMediaQuery(`(max-width: ${ScreenSize.tablet})`)

  return (
    <ThemeProvider theme={themeTeacher}>
      <TeacherPgWrapper>
        <Container maxWidth='xl'>
          <Box
            pt={5}
            pb={5}
          >
            {onlyLogoImgNav ?
              <Box
                id='socrates-logo-container'
                pl={isTablet ? 0 : 20}
                mb={isTablet ? 2 : 10}
              >
                <img src={logo} style={{
                  height: isTablet ? 50 : 'auto'
                }} />
              </Box>
              :
              <Menu />}
            {/* {title && <TeacherTitleBar>{title}</TeacherTitleBar>} */}
            {children}
          </Box>
        </Container>
      </TeacherPgWrapper>
    </ThemeProvider>
  );
};
