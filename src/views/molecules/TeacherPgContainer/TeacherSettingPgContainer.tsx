import { FC, ReactChildren, ReactChild } from 'react';
import { ParentPgNav } from 'views/molecules/ParentPgNav/ParentPgNav'
import { ThemeProvider } from '@mui/material';
import { settingPage } from 'views/Theme';

import { ParentPageTitle } from '../PageTitle';

type ParentPgContainerProps = {
  onlyLogoImgNav: boolean;
  title?: string;
  children: ReactChild | ReactChildren;
};

export const TeacherSettingPgContainer: FC<ParentPgContainerProps> = ({ onlyLogoImgNav, children = (<></>), title = '' }) => {

  return (
    <ThemeProvider theme={settingPage}>
      <ParentPgNav onlyLogoImg={onlyLogoImgNav} />
      {
        title && <ParentPageTitle title={title} />
      }
      {children}
    </ThemeProvider>
  );
};
