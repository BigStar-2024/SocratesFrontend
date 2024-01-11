import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';

export const Wrapper = styled.div`
  background-repeat : no-repeat;
  background-size   : cover;
  @media (max-width: ${ScreenSize.tablet}) {
    height: 100vh;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    height: 100vh;
  }
`;
