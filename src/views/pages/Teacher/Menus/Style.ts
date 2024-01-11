import styled     from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { USER_AVATAR_SIZE } from 'constants/common';

export const TopMenuContainer = styled.div`
  width           : 100%;
  display         : flex;
  justify-content : center;
  margin-bottom   : ${USER_AVATAR_SIZE + 10}px;
  padding-top     : 45px;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    display: none;
  }
`;
