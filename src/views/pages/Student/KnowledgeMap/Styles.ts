import styled from 'styled-components';
import { ScreenSize }   from 'constants/screenSize';
import background       from 'views/assets/colored-shapes-bg.svg';
import ocean            from 'views/assets/islands/ocean.svg';

export const Wrapper = styled.div`
  background-image  : url(${background});
  background-repeat : no-repeat;
  background-size   : cover;
`;

export const Ocean = styled.div`
  padding               : 1rem;
  display               : grid;
  grid-template-columns : 2fr 1fr;
  min-height            : 100vh;
  background-image      : url(${ocean});
  background-repeat     : no-repeat;
  background-size       : cover;
  @media (min-width: ${ScreenSize.desktop}) {
    padding               : 2rem;
    padding-top           : 3em;
    padding-bottom        : 3em;
    display               : grid;
  }
`;

export const Filler = styled.img`
  width: 40px;
  @media (min-width: ${ScreenSize.tablet}) {
    width: 150px;
  }
`;


