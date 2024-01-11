import styled         from 'styled-components';
import { BasicColor } from 'views/Color';
import { Typography } from './typography';

type LinkProps = {
  isDark?: boolean;
};

export const Link = styled.h3<LinkProps>`
  font-family: ${Typography.primary};
  color: ${props => (props.isDark ? BasicColor.black : BasicColor.white)};
  margin: 0;
  text-decoration: underline;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.75px;
  text-transform: capitalize;
  font-weight: 600;
`;
