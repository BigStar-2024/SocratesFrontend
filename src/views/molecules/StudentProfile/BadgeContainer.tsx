import { FC } from 'react';
import { ProfileTitle } from 'views/molecules/ProfileTitle';
import { Avatar, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ScreenSize } from 'constants/screenSize';
import { useSelector } from 'react-redux'
import { dictionary } from 'views/pages/Student/Settings/dictionary'


interface BadgeContainerProps {
  badges: any[]
}

export const BadgeContainer: FC<BadgeContainerProps> = ({ badges }) => {

  const isMobile = useMediaQuery(`(max-width:${ScreenSize.phone})`);
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'
  const size = isMobile ? 40 : 120
  return (
    <>
      <ProfileTitle title={dictionary[language]?.badges} />
      <Grid container spacing={2} justifyContent={'center'} mb={3} >
        {
          badges.map(badge => (
            <Grid item key={badge.id} justifyContent='center'>
              <Avatar sx={{ width: size, height: size, background: 'white', border: 'gray dashed' }}>
                <img style={{ height: size / 5 * 4 }} src={badge.badge.image} />
              </Avatar>
            </Grid>)
          )
        }
      </Grid>
    </>
  );
};

