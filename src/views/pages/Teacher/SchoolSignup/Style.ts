import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { makeStyles } from '@mui/styles'
import { BasicColor } from 'views/Color';

export const Container = styled.div`
  position       : relative;
  display        : flex;
  margin-top     : 80px;
  padding-bottom : 100px;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    padding-bottom: 0px;
  }
`;

export const ContactContainer = styled.div`
    max-width      : 510px;
    display        : flex;
    flex-direction : column;
    border-width   : 1px;
    border-color   : ${BasicColor.blue};
    border-style   : solid;
    @media screen and (max-width: ${ScreenSize.tablet}) {
      display: none;
    }
`;

export const Title = styled.div`
    font-size: 32px;
    font-weight: 700;
    padding-bottom: 60px;
    @media screen and (max-width: ${ScreenSize.tablet}) {
      font-size: 20px;
    }
`;

export const ContactHeader = styled.div`
    background-color : white;
    display          : flex;
    flex-direction   : row;
    justify-content  : center;
    align-items      : center;
    padding-top      : 25px;
    padding-bottom   : 25px;
`;

export const GradeContainer = styled.div`
    padding          : 10px;
    border-width     : 2px;
    border-color     : ${BasicColor.brightBlue};
    border-style     : solid;
    border-radius    : 25px;
`;
export const GradeContainerTitle = styled.div`
    font-size        : 18px;
    padding-bottom   : 15px;
`;
export const ContactBody = styled.div`
    background-color : ${BasicColor.blue};
    display          : flex;
    flex-direction   : column;
    justify-content  : center;
    align-items      : center;
    flex-grow        : 1;
    color            : white;
`;

export const useStyles = makeStyles({
  select: {
    '&.MuiOutlinedInput-root' : {
      borderRadius: '25px',
      backgroundColor: BasicColor.white,
    },
    '& fieldset' : {
      borderColor: BasicColor.brightBlue,
      borderWidth: '2px'
    }
  },
});
