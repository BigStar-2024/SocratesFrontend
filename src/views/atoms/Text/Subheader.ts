import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { BasicColor } from 'views/Color';
import { Typography } from './typography';

type SubheaderProps = {
  isDark?: boolean;
};

export const Subheader = styled.h3<SubheaderProps>`
  font-family: ${Typography.primary};
  color: ${props => (props.isDark ? BasicColor.black : BasicColor.white)};
  font-size: 24px;
  font-weight: 500;
  line-height: 29px;
  margin: 0;
  @media (max-width: ${ScreenSize.phone}) {
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.75px;
    text-transform: capitalize;
  }
`;
