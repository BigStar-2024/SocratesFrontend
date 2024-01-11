import { FC, useEffect, useContext } from 'react';
import { Button, Grid }                      from '@mui/material';
import { ParentPgContainer }         from 'views/molecules/ParentPgContainer/ParentPgContainer';
import { Title }                     from 'views/molecules/Setting/utils/Style';
import {
  TextGroup,
  LSLabel,
  LSText,
} from 'views/molecules/Setting/utils/Style';
import { SettingForm }      from 'views/organisms/Setting/Parent/Profile';
import { Payment }          from 'views/organisms/Setting/Parent/Payment';
import { MembershipDetail } from 'views/organisms/Setting/Parent/Details';
import { CssBaseline }      from '@mui/material';
import { LoadingContext }   from 'react-router-loading';
import { TypoTitle }        from 'views/atoms/Text';
import { useSelector }      from 'react-redux'
import { dictionary }       from './dictionary'
import {
  SettingContainer,
  TitleContainer,
 } from './Styles';
export const Settings: FC = () => {
  const loadingContext = useContext(LoadingContext);
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'
  useEffect(() => {
    if(window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();
    loadingContext.done();
  }, []);
  return (
    <ParentPgContainer onlyLogoImgNav={false}>
      <SettingContainer>
        <TitleContainer>
          <Title><TypoTitle>{dictionary[language]?.settings}</TypoTitle></Title>
        </TitleContainer>
        <CssBaseline />
        <Grid container>
          <Grid item xs={12} md={6}>
            <SettingForm />
            <Payment />
            <TextGroup>
              <LSLabel>{dictionary[language]?.questions}</LSLabel>
              <LSText>{dictionary[language]?.reachUsAndWeWillHelpYou}</LSText>
              <Button href='#'>{dictionary[language]?.contact}</Button>
            </TextGroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <MembershipDetail />
          </Grid>
        </Grid>
      </SettingContainer>
    </ParentPgContainer>
  );
};
export default Settings;
