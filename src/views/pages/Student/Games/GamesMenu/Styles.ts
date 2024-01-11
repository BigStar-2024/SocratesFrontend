import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import background     from 'views/assets/colored-shapes-bg.svg';

export const Wrapper                = styled.div`
  background-image  : url(${background});
  background-repeat : no-repeat;
  background-size   : cover;
  height            : 100vh;
`;

export const GamesMenuContainer     = styled.div`
  width                 : 75%;
  margin                : 10px auto;
  display               : grid;
  grid-gap              : 15px;
  justify-items         : center;
  grid-template-columns : repeat(2, 1fr);

  @media screen and (min-width: ${ScreenSize.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: ${ScreenSize.desktop}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const GamesMenuTitleContainer = styled.div`
  width           : 100%;
  display         : flex;
  margin-top      : 20px;
  justify-content : center;
`;
