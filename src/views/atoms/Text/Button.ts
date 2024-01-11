import styled         from 'styled-components';
import { BasicColor } from 'views/Color';
import { Typography } from './typography';
import { ScreenSize } from 'constants/screenSize';

type ButtonProps = {
  isDark?: boolean;
  fontSize?: string;
};

export const Button = styled.span<ButtonProps>`
  font-family: ${Typography.primary};
  color: ${props => (props.isDark ? BasicColor.black : BasicColor.white)};
  font-weight: 500;
  font-size: ${props => (props.fontSize ? props.fontSize : '16px')};
  line-height: 20px;
  letter-spacing: 0.75px;
  text-transform: capitalize;
  cursor: pointer;
  @media (max-width: ${ScreenSize.phone}) {
    font-size:
  }
`;
