import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import background     from 'views/assets/colored-shapes-bg.svg';
import { Grid }       from '@mui/material';

export const GridItem = styled(Grid) <{
  align?: string;
}>`
  &.MuiGrid-root {
    display         : flex;
    justify-content : center;
    align-items     : ${p => (p.align ? p.align : 'center')};
    flex-direction  : column;
    padding         : 15px;
    @media screen and (max-width: ${ScreenSize.tablet}) {
      padding: 10px 0 10px 0;
      align-items: center;
    }
  }
`;

export const Img = styled.img`
@media screen and (max-width: ${ScreenSize.tablet}) {
    width       : 15vw;
    margin-left : 5vw;
  }
`;
export const Wrapper = styled.div`
  background-image  : url(${background});
  background-repeat : repeat-y;
  background-size   : cover;
  height            : 100vh;
`;
