import styled         from 'styled-components';
import { Grid }       from '@mui/material';
import { ScreenSize } from 'constants/screenSize';


export const GridItem = styled(Grid)<{
  align?: string;
}>`
&.MuiGrid-root {
  display: flex;
  justify-content: center;
  align-items: ${p => (p.align ? p.align : 'center')};
  flex-direction: column;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    align-items: center;
  }
`;

export const Input = styled.input`
  margin: 15px;
  border-radius: 14px;
  height: 54px;
  border-collapse: collapse;
  outline: none;
  font-size: 18px;
  width: 230px;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    font-size: 0.9em;
  }
  @media screen and (max-width: ${ScreenSize.phone}) {
    height: 30px;
    width: 150px;
  }
`;
