import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { BasicColor } from 'views/Color';
import { Typography } from './typography';

type IconUpProps = {
  isDark?: boolean;
};

export const sIcon = styled.span<IconUpProps>`
  font-family: ${Typography.primary};
  color: ${props => (props.isDark ? BasicColor.black : BasicColor.white)};
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0;
  @media (max-width: ${ScreenSize.phone}) {
    font-size: 9px;
    line-height: 11px;
    text-transform: capitalize;
  }
`;
