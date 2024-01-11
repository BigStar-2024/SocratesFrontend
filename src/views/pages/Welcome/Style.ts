import styled from 'styled-components';
import background from 'views/assets/colored-shapes-bg.svg';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';

export const Wrapper = styled.div`
  background-image   : url(${background});
  background-repeat  : no-repeat;
  background-size    : cover;
  display            : flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Illustration = styled.img`
  width        : 95vw;
  display      : block;
  margin-left  : auto;
  margin-right : auto;
  @media (min-width: ${ScreenSize.desktop}) {
    width: 29rem;
  }
`;
export const ModalContent = styled.div`
  width       : 100%;
  height      : 100vh;
  position    : absolute;
  display     : flex;
  align-items : center;
  top         : 0;
  left        : 0;
  background-color: ${BasicColor.background40};
`;
export const ModalStyles = styled.div`
  width            : 80%;
  height           : 270px;
  margin           : 0 auto;
  background-color : ${BasicColor.blue};
  border-radius    : 40px;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    height: 290px;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    width: 500px;
  }
`;
export const ModalItemsContainer = styled.div`
  width          : 80%;
  height         : 100%;
  margin         : 0 auto;
  display        : flex;
  flex-direction : column;
  grid-gap       : 15px;
  justify-conten : center;
  align-content  : center;
  text-align     : center;
  font-size      : 14px;
`;
