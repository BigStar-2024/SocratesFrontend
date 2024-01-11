import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import home from 'views/assets/home.svg';
import { Icon } from 'views/atoms/Icon/Icon';
import { Energy } from 'views/molecules/Energy/Energy';
import modality from 'views/assets/modality.svg';
import { Wallet } from 'views/molecules/Wallet/Wallet';
import { UserProgress } from '../UserProgress';
import { IconSize } from 'views/atoms/Icon/Size';
import { ScreenSize } from 'constants/screenSize';
import { useHistory } from 'react-router-dom';
import { Sidebar } from 'views/organisms/Menu/Sidebar';
import { ProfileDropDownMenu } from 'views/organisms/Menu/ProfileDropdownMenu';
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box } from '@mui/material';
import { USER_AVATAR_SIZE } from 'constants/common';

type TopMenuProps = {
  rank         : number;
  level        : number;
  exp          : number;
  expMax       : number;
  icon         : string;
  userName     : string;
  progress     : number;
  energyCharge : number;
  balance      : number;
};

export const TopMenu: FC<TopMenuProps> = ({
  rank,
  level,
  exp,
  expMax,
  icon,
  userName,
  progress,
  energyCharge,
  balance,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${ScreenSize.phone})`)
  const [navOp, setNavOp] = useState(true)
  const changeNavBarOpacity = () => {
    const posY = window.scrollY
    if (posY < 40) {
      setNavOp(true)
    } else setNavOp(false)
  }
  useEffect(() => {
    changeNavBarOpacity()
    window.addEventListener('scroll', changeNavBarOpacity)
  }, [])

  const history = useHistory();
  return (
    <>
      {!isMobile && <Box sx={{ height: USER_AVATAR_SIZE + 15 + 'px', width: '100%' }} />}
      <TopMenuStyles style={navOp ? { background: '#FFFFFF00' } : { background: '#FFFFFF', boxShadow: 'gray 0px 0px 6px 0px' }}>
        <Sidebar />
        <Icon
          image={home}
          size={IconSize.medium}
          onClick={() => history.push('/home')}
        />
        <Energy charge={energyCharge} />
        <Icon image={modality} onClick={() => history.push('/map')} size={IconSize.medium} />
        <Wallet balance={balance} />
        <UserProgress
          rank={rank}
          level={level}
          exp={exp}
          expMax={expMax}
          icon={icon}
          userName={userName}
          progress={progress}
        />
        <ProfileDropDownMenu />
      </TopMenuStyles>
    </>
  );
};

const TopMenuStyles = styled.div`
  display: none;
  @media screen and (min-width: ${ScreenSize.phone}) {
    position: fixed;
    transition-duration: 1s;
    background: white;
    top: 0;
    z-index: 200;
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
`;
