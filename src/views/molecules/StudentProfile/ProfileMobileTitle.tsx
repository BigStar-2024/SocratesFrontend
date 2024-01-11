import { FC } from 'react';
import styled from 'styled-components';
import green_ribbon from 'views/assets/student-profile/green-ribbon.svg'
import { useSelector } from 'react-redux';
import { TypoHeader } from 'views/atoms/Text';
import { ImageAvatar } from '../Avatar/DefaultAvatar';
import { USER_AVATAR_SIZE } from 'constants/common';
import { Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ScreenSize } from 'constants/screenSize';

export const ProfileMobileTitle: FC<{ title: string }> = ({ title }) => {
  const isMobile = useMediaQuery(`(max-width:${ScreenSize.phone})`);
  const avatar = useSelector((state: any) => state.avatar)
    const student = useSelector((state: any) => state.student);

    return (
        <Grid container alignItems='center' justifyContent={'center' } sx={{display: isMobile ? 'box': 'none'}}>
            <Grid item>
                <ImageAvatar
                    name={student.fullName}
                    accessory={avatar.accessory ? avatar.accessory : null}
                    head={avatar.head ? avatar.head : null}
                    clothes={avatar.clothes ? avatar.clothes : null}
                    skinTone={avatar.skin ? avatar.skin : null}
                    size={USER_AVATAR_SIZE + 10}
                />
            </Grid>
            <Grid item sx={{marginLeft: -5}}>
                <CardTitle>
                    <TypoHeader style={{ padding: 30, margin: 0, color: 'white', width: 150 }}>{title}</TypoHeader>
                </CardTitle>
            </Grid>
        </Grid>
    );
};

export const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  background-image: url(${green_ribbon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  padding: 15px;
`;
