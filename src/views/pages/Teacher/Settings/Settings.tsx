import { FC, useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { dictionary } from './dictionary'
import { TeacherSettingPgContainer } from 'views/molecules/TeacherPgContainer/TeacherSettingPgContainer';
import { Container, Grid } from '@mui/material';
import { TeacherSettingProfile } from 'views/organisms/Setting/Teacher/Profile';
import { TeacherPaymentInfo } from 'views/organisms/Setting/Teacher/Payment';
import { TeacherMembershipDetail } from 'views/organisms/Setting/Teacher/Details';

const TeacherSettings: FC = () => {
  let language: string = useSelector((state: any) => state.user.language);

  language = language ? language : "en-us"
  useEffect(() => {

    if (window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();

  }, []);

  return (
    <TeacherSettingPgContainer onlyLogoImgNav={true} title={dictionary[language]?.settings}>
      <Container maxWidth='lg'>
        <Grid container justifyContent={'center'}>
          <Grid item md={6} xs={12}>
            <TeacherSettingProfile />
            <TeacherPaymentInfo />
          </Grid>
          <Grid item md={6} xs={12}>
            <TeacherMembershipDetail />
          </Grid>
        </Grid>
      </Container>
    </TeacherSettingPgContainer>
  );
};
export default TeacherSettings
