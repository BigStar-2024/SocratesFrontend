import styled from 'styled-components';
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

export const Title = styled.div`
    font-size: 32px;
    font-weight: 700;
    padding-bottom: 60px;
    @media screen and (max-width: ${ScreenSize.tablet}) {
      font-size: 20px;
    }
`;

export const useStyles = makeStyles({
  select: {
    '&.MuiOutlinedInput-root': {
      borderRadius: '25px',
      backgroundColor: BasicColor.white,
    },
    '& fieldset': {
      borderColor: BasicColor.brightBlue,
      borderWidth: '2px'
    }
  },
});
