import styled           from 'styled-components';
import titleBackground  from 'views/assets/title-games-background.png';
import background       from 'views/assets/colored-shapes-bg.svg';

export const Wrapper        = styled.div`
  background-image  : url(${background});
  background-repeat : no-repeat;
  background-size   : cover;
  height            : 100vh;
`;

export const GamesContainer = styled.div`
  flex-direction  : column;
  justify-content : center;
  align-items     : center;
  margin-top      : 30px;
  width           : 100%;
  display         : flex;
`;

export const GamesTitle     = styled.div`
  width           : fit-content;
  max-width       : 70vw;
  height          : 50%;
  padding         : 10px;
  padding-left    : 50px;
  padding-right    : 50px;
  display         : flex;
  text-align      : center;
  align-items     : center;
  justify-content : center;
  background      : url(${titleBackground}) center no-repeat;
  background-size : 100% 100%;
  margin-bottom   : 20px;
`;
