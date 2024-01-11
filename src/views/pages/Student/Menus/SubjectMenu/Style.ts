import styled         from 'styled-components';
import background     from 'views/assets/colored-shapes-bg.svg';
import { ScreenSize } from 'constants/screenSize';

export const Wrapper = styled.div`
  background-image      : url(${background});
  background-repeat     : no-repeat;
  background-size       : cover;
  height                : 100vh;
`;
export const SubjectsCardsContainer = styled.div`
  width                 : 100%;
  margin                : 0 auto;
  margin-top            : 30px;
  display               : grid;
  grid-gap              : 20px;
  grid-template-columns : repeat(2, 1fr);
  justify-items         : center;

  @media screen and (min-width: ${ScreenSize.tablet}) {
    grid-template-columns : repeat(4, 1fr);
    margin-top            : 50px;
    grid-gap              : 10px;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    width                 : 70%;
    grid-template-columns : repeat(4, 1fr);
    margin-top            : 50px;
    grid-column-gap       : 0;
    grid-row-gap          : 25px;
  }
`;
export const TitleContainer = styled.div`
  width:  200px;
  margin: 20px auto;

  @media screen and (min-width: ${ScreenSize.tablet}) {
    width: 400px;
  }
`;
