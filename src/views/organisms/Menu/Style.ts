import styled     from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { USER_AVATAR_SIZE } from 'constants/common';
import { BasicColor } from 'views/Color';
import { makeStyles } from '@mui/styles'
export const MenuTitle = styled.div`
  color: ${BasicColor.white};
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export const MenuMark = styled.img`
  padding-left: 10px;
  padding-right: 10px;
`
export const LineMenu = styled.div`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    background: #377fb9;
  }
`
export const MenuItem = styled.div`
  color: ${BasicColor.white};
  font-size:17px;
  line-height: 20px;
  padding: 10px;
  padding-left: 40px;
  cursor: pointer;
  &:hover {
    background: #377fb9;
  }
`;

export const LogoImg = styled.img``;

export const AvatarContainer = styled.div`
  @media screen and (max-width: ${ScreenSize.tablet}) {
    display: none;
  }
`;

export const TeacherAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    display: none;
  }
`

export const NameAvatarGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${ScreenSize.phone}) {
    width: 150px;
  }
`;
export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    display: none;
  }
`;

export const useStyles = makeStyles({
  formControl: {
    width: '188px',
  },
  paper: {
    paddingTop      :      '40px',
    paddingBottom   :   '40px',
    paddingLeft     :     '70px',
    paddingRight    :    '70px',
    backgroundColor : 'white !important',
  },
  accordionSummary: {
    '&:hover'  : {
      background: '#377fb9'
    },
  },
  menuContainer: {
    boxShadow: 'unset !important',
    '&.MuiPaper-root' : {
      position: 'unset'
    },
    '& .MuiAccordionDetails-root': {
      padding: '0px'
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      color: 'white'
    }
  },
  soleInput: {
    '& .MuiInputBase-root'  : {
      backgroundColor       : BasicColor.ligntBlue,
      borderColor           : BasicColor.greenSoft
    },
    '&:hover,& fieldset'  : {
      borderColor         : `${BasicColor.greenSoft} !important`,
    },
  }
});
