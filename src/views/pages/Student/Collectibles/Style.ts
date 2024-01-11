import styled         from 'styled-components';
import background     from 'views/assets/colored-shapes-bg.svg';
import { ScreenSize } from 'constants/screenSize';
import {BasicColor}   from 'views/Color';

export const Wrapper = styled.div`
  background-image  : url(${background});
  background-repeat : no-repeat;
  background-size   : cover;
  height            : 100vh;
`;
export const CardCollectibleContainer = styled.div`
  display           : flex;
  flex-direction    : column;
  justify-content   : center;
  margin            : 0 auto;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    margin: 0 auto;
  }
`;

export const BtnContainer = styled.div`
  display         : flex;
  justify-content : center;
  padding-top     : 3vh;
`

export const Button = styled.button`
  border          : none;
  width           : 200px;
  height          : 40px;
  background      : ${BasicColor.aqua};
  color           : white;
  border-radius   : 20px;
  // position        : absolute;
  cursor          : pointer;
  // top             : 16vh;
  // right           : 15vw;
  transition      : all 250ms ease-in-out;

  &:hover {
    box-shadow: 0 4px 1rem -4px #000;
  }
  @media screen and (max-width: ${ScreenSize.tablet}) {
    position: inherit;
    z-index: 1;
  }
`;
