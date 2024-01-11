import { FC } from 'react';
import { dictionary } from './dictionary';
import { useSelector } from 'react-redux';
import {
  Grid,
  Link,
  useMediaQuery
} from '@mui/material';
import { ScreenSize } from 'constants/screenSize';

export const TermsAndConditions: FC = () => {
  const isTablet = useMediaQuery(`(max-width: ${ScreenSize.tablet})`)

  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  return (
    <Grid
      id='terms-policies-container'
      container spacing={1} mb={isTablet ? 1 : 3} >
      <Grid item xs={6} md={3}>
        <Link href='https://www.WithSocrates.com' variant='body1'>
          {dictionary[language]?.about}
        </Link >
      </Grid>
      <Grid item xs={6} md={3}>
        <Link href='https://www.withsocrates.com/privacy-policy/' variant='body1'>
          {dictionary[language]?.privacy}
        </Link >
      </Grid>
      <Grid item xs={6} md={3}>
        <Link href='https://www.withsocrates.com/terms-conditions/' variant='body1'>
          {dictionary[language]?.termCondition}
        </Link >
      </Grid>
      <Grid item xs={6} md={3}>
        <Link href='https://www.learnwithsocrates.com/index.php/main/policy/children_privacy/en' variant='body1'>
          {dictionary[language]?.children_privacy}
        </Link >
      </Grid>
    </Grid>
  );
};
