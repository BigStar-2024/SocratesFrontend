import styled       from 'styled-components';
import background   from 'views/assets/colored-shapes-bg.svg';
import {ScreenSize} from 'constants/screenSize';

export const Wrapper = styled.div`
  background-image  : url(${background});
  background-repeat : no-repeat;
  background-size   : cover;
  height            : 100vh;
`;
export const AvatarContainer = styled.div`
  width : 100%;
  margin: 40px 0;
  @media screen and (max-width: ${ScreenSize.phone}) {
    margin    :0;
    display   :flex;
    flex-direction  :column;
  }
`;
