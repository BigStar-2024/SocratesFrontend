import styled         from 'styled-components';
import { BasicColor } from 'views/Color';
import { Typography } from './typography';

type UserInfoProps = {
  isDark?: boolean;
};

export const UserInfo = styled.span<UserInfoProps>`
  font-family: ${Typography.primary};
  color: ${props => (props.isDark ? BasicColor.black : BasicColor.white)};
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.75px;
  text-transform: capitalize;
  margin: 0;
`;
