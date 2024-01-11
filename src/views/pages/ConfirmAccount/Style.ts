import styled         from 'styled-components';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';
import background     from 'views/assets/colored-shapes-bg.svg';


export const ConfirmationContainer = styled.div`
  background-image  : url(${background});
  background-repeat : no-repeat;
  background-size   : cover;
  height            : 100vh;
  @media (min-width: ${ScreenSize.tablet}) {
    padding-top: 2rem;
  }
`;

export const ValidationButton = styled.div`
  width         : 215px;
  margin-left   : auto;
  margin-right  : auto;
`;

export const Card = styled.div`
  background-color        : ${BasicColor.blue};
  padding                 : 18px;
  min-height              : 100vh;
  border-top-left-radius  : 30px;
  border-top-right-radius : 30px;
  @media (min-width: ${ScreenSize.tablet}) {
    margin-left   : 2rem;
    margin-right  : 2rem;
    border-radius : 30px;
    min-height    : calc(80vh - 4rem);
    padding-left  : 3rem;
    padding-right : 3rem;
    max-width     : 692px;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    margin-left : auto;
    margin-right: auto;
  }
`;

export const StudentRegister = styled.div`
  border        : ${BasicColor.white} 3px solid;
  padding       : 11px;
  border-radius : 20px;
  @media (min-width: ${ScreenSize.tablet}) {
    padding     : 22px;
  }
`;

export const StudentSelector = styled.div`
  display               : grid;
  grid-template-columns : 1fr 1fr 1fr;
  grid-gap              : 5px;
`;

export const Centered = styled.div`
  text-align: center;
`;

export const StudentsForm = styled.div`
  display              : grid;
  grid-template-columns: 1fr;
  margin-top           : 1rem;
  margin-bottom        : 1rem;
`;

export const Disclaimer = styled.div`
  margin-top: 2rem;
`;

export const Logo = styled.img`
  display : none;
  @media (min-width: ${ScreenSize.desktop}) {
    display        : block;
    padding-top    : 1rem;
    padding-bottom : 3rem;
    margin-left    : auto;
    margin-right   : auto;
  }
`;
