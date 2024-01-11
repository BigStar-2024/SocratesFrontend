import styled     from 'styled-components';
import { ScreenSize } from 'constants/screenSize';

export const TopMenuContainer = styled.div`
  width           : 100%;
  display         : flex;
  justify-content : center;
  @media screen and (max-width: ${ScreenSize.phone}) {
    display: none;
  }
`;
