import { FC } from 'react';
import styled from 'styled-components';
import { Icon } from 'views/atoms/Icon/Icon';
import { BasicColor } from 'views/Color';
import home from 'views/assets/home.svg';
import energyButton from 'views/assets/lightning.svg';
import walletIcon from 'views/assets/coins-mobile.svg';
import { IconSize } from 'views/atoms/Icon/Size';
import { ScreenSize } from 'constants/screenSize';
import { IconDropDown } from 'views/molecules/IconDropDown';
import { Sidebar } from 'views/organisms/Menu/Sidebar';
import { useHistory } from 'react-router-dom';
import modality from 'views/assets/modality.svg';
import { useSelector } from 'react-redux';
import { TypoGeneralText } from 'views/atoms/Text';
import { Battery } from 'views/molecules/Battery/Battery';
import useMediaQuery from '@mui/material/useMediaQuery'
import BottomNavigation from '@mui/material/BottomNavigation';
import { Box } from '@mui/material';


export const MobileMenu: FC = () => {
  const mobile = useMediaQuery(`(max-width: ${ScreenSize.phone})`)
  const history = useHistory();
  const earning = useSelector((state: any) => state.earning);

  return (
    <Box>
      {mobile && <Box sx={{ height: 70, width: '100%' }} />}
      <BottomNavigation
        sx={{
          display: mobile ? 'flex' : 'none',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: BasicColor.blue,
          justifyContent: 'space-evenly',
          position: 'fixed',
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          padding: 1,
          // overflow: 'hidden'
        }}
      >
        <Sidebar />
        <Icon
          image={home}
          size={IconSize.medium}
          onClick={() => history.push('/home')}
        />
        <Icon image={modality} onClick={() => history.push('/map')} size={IconSize.medium} />
        <IconDropdownContainer>
          <IconDropDown
            icon={energyButton}
            content={
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <TypoGeneralText style={{ color: BasicColor.green, margin: 0 }}>{+earning.energyCharge * 10 + '%'}</TypoGeneralText>
                <Battery charge={earning.energyCharge} />
              </div>
            }
          />
        </IconDropdownContainer>
        <IconDropdownContainer>
          <IconDropDown
            icon={walletIcon}
            content={
              <TypoGeneralText>
                {'$' + earning.balance}
              </TypoGeneralText>
            }
          />
        </IconDropdownContainer>
      </BottomNavigation>
    </Box>
  );
};

const IconDropdownContainer = styled.div`
  width: 50px;
`;
