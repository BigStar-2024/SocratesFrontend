import styled         from 'styled-components';
import background     from 'views/assets/colored-shapes-bg.svg';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';
import { Container }  from '@mui/material';

export const Login = styled.div`
  background-image  : url(${background});
  background-repeat : no-repeat;
  background-size   : cover;
  height            : 100vh;
  display           : grid;
  grid-template-rows: auto 1fr;
  @media (min-width: ${ScreenSize.desktop}) {
    display           : grid;
    grid-template-rows: unset;
    grid-template-columns: 1fr 1fr;
  }
`;

export const DesktopWelcome = styled.div`
  display: none;
  @media (min-width: ${ScreenSize.desktop}) {
    display       : block;
    margin-bottom : 4rem;
    text-align    : center;
  }
`;

export const ContentWrapper = styled.div`
  margin-top    : 3vh;
  margin-bottom : 6vh;
  @media (min-width: ${ScreenSize.desktop}) {
    width       : 60%;
    min-width   : 550px;
    margin-top  : 8rem;
    margin-left : 3rem;
  }
`;
export const TermsContainer = styled.div`
  position: fixed;
  bottom: 2vh;
  right: 0;
  left: 50%;
  @media (max-width: ${ScreenSize.phone}) {
    left: 0;
  }
`;

export const StyledContainer = styled(Container)`
  background: ${BasicColor.blue};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &.MuiContainer-root {
    @media (max-width: ${ScreenSize.phone}) {
      border-radius: 30px 30px 0 0;
    }
  }
`;

export const Content = styled.div`
  color: white;
  font-size: 20px;
`
