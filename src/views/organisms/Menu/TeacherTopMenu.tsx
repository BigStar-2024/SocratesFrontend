import { FC, useEffect, useState } from 'react';
import styled                      from 'styled-components';
import home                        from 'views/assets/home.svg';
import { Icon }                    from 'views/atoms/Icon/Icon';
import { Energy }                  from 'views/molecules/Energy/Energy';
import modality                    from 'views/assets/modality.svg';
import { Wallet }                  from 'views/molecules/Wallet/Wallet';
import { UserProgress }            from '../UserProgress';
import { IconSize }                from 'views/atoms/Icon/Size';
import { ScreenSize }              from 'constants/screenSize';
import { useHistory }              from 'react-router-dom';
import Sidebar                     from 'views/organisms/Menu/TeacherSidebar';
import { ProfileDropDownMenu }     from 'views/organisms/Menu/ProfileDropdownMenu';
import InputLabel        from '@mui/material/InputLabel';
import MenuItem          from '@mui/material/MenuItem';
import FormControl       from '@mui/material/FormControl';
import Select            from '@mui/material/Select';
import logoTitle         from 'views/assets/logo-learn.svg'
import avatar            from 'views/assets/profile-icon.svg'
import { useStyles }     from './Style';
import { useSelector }   from 'react-redux'
import Avatar            from '@mui/material/Avatar';

import {
  LogoContainer,
  LogoImg,
  NameAvatarGroup,
  AvatarContainer,
  TeacherAvatarContainer
} from './Style';
type TopMenuProps = {
    data?: any
};

export const TopMenu: FC<TopMenuProps> = ({
    data=null
}) => {

  const [navOp, setNavOp] = useState(true)
  const changeNavBarOpacity = () => {
    const posY = window.scrollY
    if(posY < 40) {
      setNavOp(true)
    } else setNavOp(false)
  }
  useEffect(() => {
    changeNavBarOpacity()
    window.addEventListener('scroll', changeNavBarOpacity)
  },[])

  const history = useHistory();
  const classes = useStyles();
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : "en-us"
  return (
    <>
      <TopMenuStyles style={navOp ? {background: '#FFFFFF00', paddingTop: '45px'}:{background: '#FFFFFF', boxShadow:'gray 0px 0px 6px 0px', paddingTop: '45px'}}>
        <Sidebar />
        <LogoContainer>
          <LogoImg  src={logoTitle} />
        </LogoContainer>
        <NameAvatarGroup>
        <TeacherAvatarContainer>
          Name_lastName
          <Avatar sx={{ bgcolor: '#22BAAF', height:'60px', width:'60px', marginLeft: '15px'}} alt='Remy Sharp' src={avatar} />
        </TeacherAvatarContainer>
      </NameAvatarGroup>
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
    width: 60vw;
    display: flex;
    gap: 20px;
    justify-content: space-around;
    align-items: center;
  }
`;
