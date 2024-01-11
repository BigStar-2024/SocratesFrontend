import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { makeStyles } from '@mui/styles';
import { BasicColor}  from 'views/Color';
export const Container = styled.div`
  position: relative;
  min-height: 65px;
  padding-top: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: ${ScreenSize.desktop}) {
    padding-top: 4.2vw;
    padding-bottom: 1.7vw;
  }
  @media screen and (max-width: ${ScreenSize.tablet}) {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 3vw;
    padding-right: 3vw;
    background-color: ${BasicColor.blue};
    position: absolute;
    bottom: 0px;
    z-index: 1000;
    width: 100%;
    border-radius: 8px 8px 0 0;
  }
`;

export const Home = styled.img``;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    display: none;
  }
`;

export const LogoImg = styled.img``;

export const SupportBtnContainer = styled.div`
  width: 200px;
  & #questionMarkButton {
    display: none;
  }
  @media screen and (max-width: ${ScreenSize.tablet}) {
    width: unset;
    & button {
      display: none;
    }
    & #questionMarkButton {
      display: flex;
    }
  }
`;

export const NameAvatarGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${ScreenSize.phone}) {
    width: 150px;
  }
`;

export const AvatarContainer = styled.div`
  @media screen and (max-width: ${ScreenSize.tablet}) {
    display: none;
  }
`;

export const useStyles = makeStyles({
  formControl: {
    width: '188px',
  },
  questionMark: {
    '&.MuiAvatar-root': {
      backgroundColor: 'unset',
      borderColor: 'white',
      borderWidth: '1px',
      borderStyle: 'solid',
      width: '35px',
      height: '35px',
      marginRight: '10px',
    },
  },
  questionMarkButton: {
    '&.MuiAvatar-root': {
      borderColor: 'white',
      borderWidth: '2px',
      borderStyle: 'solid',
      width: '35px',
      height: '35px',
      marginRight: '20px',
      backgroundColor: '#21B95C !important',
      cursor: 'pointer',
    },
  },
  button: {
    '&.MuiButton-root': {
      backgroundColor: '#21B95C',
      borderRadius: '20px',
      height: '49px',
      width: '200px',
      textTransform: 'unset',
      fontSize: '16px',
    },
  },
});
