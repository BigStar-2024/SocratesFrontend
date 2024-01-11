import styled         from 'styled-components';
import { makeStyles } from '@mui/styles'
import Grid           from '@mui/material/Grid';
import titleBg        from 'views/assets/title-kids-background.png'
import { BasicColor } from 'views/Color';
import { Typography } from 'views/atoms/Text/typography';

export const LicenseButton  = styled.img`
  cursor: pointer;
  &:hover {
    transform :  scale(1.1);
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
`;

export const Title          = styled.div`
  font-Size   :    40px;
  line-height :  50px;
  font-weight :  700;
  font-family :  ${Typography.secondary};
  color           : white;
  width           : 385px;
  height          : 81px;
  background      : url(${titleBg}) no-repeat center;
  display         : flex;
  margin-top      : 20px;
  margin-bottom   : 3vh;
  background-size : contain;
  justify-content : center;
  align-items     : center;
  @media screen and (max-width: 540px) {
    width:      95%;
    font-size:  32px;
  }
`

export const Container      = styled.div`
  z-index         : 10;
  display         : flex;
  width           : 100%;
  margin-bottom   : 100px;
  flex-direction  : column;
  justify-content : center;
  align-items     : center;
`;

export const KidContainer   = styled.div`
  margin: 0 5vw 5vh 5vw;
  width:  100%;
  @media screen and (max-width: 540px) {
    background: linear-gradient(
        0deg,
        rgba(23, 113, 185, 0.2),
        rgba(23, 113, 185, 0.2)
      ),
    linear-gradient(0deg, #ffffff, #ffffff);
  }
`;

export const GridContainer  = styled(Grid)`
  display         : flex;
  justify-content : center;
  &.MuiGrid-root {
    padding: 25px;
  }
`;
export const GridItem       = styled(Grid)`
  display         : flex;
  justify-content : center;
  padding         : 10px;
  &.MuiGrid-root {
    padding-top: 5px;
  }
`;

export const useStyles      = makeStyles({
  select: {
    '&.MuiOutlinedInput-root' : {
      borderRadius: '25px',
    },
    '& fieldset' : {
      borderColor: BasicColor.brightBlue,
      borderWidth: '2px'
    }
  },
});
