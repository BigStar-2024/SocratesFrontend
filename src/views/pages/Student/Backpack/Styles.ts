import styled         from 'styled-components';
import { BasicColor } from 'views/Color';
import backpackBase   from 'views/assets/backpack-base.svg';
import { ScreenSize } from 'constants/screenSize';
import background     from 'views/assets/colored-shapes-bg.svg';

export const Wrapper = styled.div`
  background-image  : url(${background});
  background-repeat : no-repeat;
  background-size   : cover;
  height            : 100vh;
`;
export const BackpackContainer = styled.div`
  width             : 100%;
  height            : 80vh;
  display           : flex;
  align-items       : flex-end;
  overflow          : hidden;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    align-items : flex-start;
    margin-top  : 20px;
  }
`;
export const BackPackStyles = styled.div`
  width           : 100%;
  height          : 80%;
  position        : relative;
`;
export const HookBracket = styled.div`
  width           : 100%;
  height          : 130px;
  background-colo : ${BasicColor.brown};
  display         : flex;
  justify-content : center;
  align-items     : center;

  @media screen and (min-width: ${ScreenSize.tablet}) {
    height: 200px;
  }
`;
export const BackpackDecorationLeft = styled.img`
  display: none;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    width    : 250px;
    height   : 410px;
    display  : initial;
    position : absolute;
    left     : 100px;
    top      : 70px;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    left: 0;
  }
`;
export const BackpackDecorationRight = styled.img`
  display:             none;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    width    : 250px;
    height   : 410px;
    display  : initial;
    position : absolute;
    right    : 100px;
    top      : 70px;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    right: 0;
  }
`;
export const BackpackHook = styled.img`
  width :  150px;
  height: 60px;

  @media screen and (min-width: ${ScreenSize.tablet}) {
    width :  170px;
    height: 70px;
  }
`;
export const BackpackBase = styled.div`
  width               : 100%;
  height              : 325px;
  background-image    : url(${backpackBase});
  background-size     : contain;
  background-position : center;
  background-repeat   : no-repeat;
  margin              : 0 auto;
  position            : absolute;
  top                 : 45px;
  display             : flex;
  flex-direction      : column;
  justify-content     : center;
  align-items         : center;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    top:                 80px;
    height:              410px;
  }
`;

export const BackpackButtonsContainer = styled.div`
  width           : 90%;
  height          : 150px;
  display         : flex;
  margin-left     : 20px;
  justify-content : center;
  align-items     : flex-start;
  padding-top     : 15px;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    height: 200px;
  }
`;

export const AvatarButtonContainer = styled.div`
  transform: rotate(-25deg);
`;
export const ControlButtonContainer = styled.div`
  transform: rotate(-45deg);
`;

export const BackpackFace = styled.img`
  width    : 270px;
  position : absolute;
  bottom   : 0;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    width :  340px;
    bottom:  -10px;
  }
`;
