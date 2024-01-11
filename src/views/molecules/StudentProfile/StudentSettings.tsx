import { FC } from 'react';
import { Container, Paper } from '@mui/material';
import { ProfileTitle } from 'views/molecules/ProfileTitle';
import {StudentSettingsAccordian} from './StudentSettingsAccordian';
import { useSelector, useDispatch } from 'react-redux';
import { dictionary }       from 'views/pages/Student/Settings/dictionary'

export const StudentSettings: FC = () => {

  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : 'en-us'

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ProfileTitle title={dictionary[language]?.settings} />
      <Paper elevation={3} sx={{ padding: 1, marginBottom: 5, width: '100%' }}>
        <StudentSettingsAccordian />
      </Paper>
    </Container>
  );
};

