import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { BasicColor } from 'views/Color';
import { Typography } from './typography';

type GeneralTextProps = {
  isDark?: boolean;
};

export const GeneralText = styled.span<GeneralTextProps>`
  font-family: ${Typography.primary};
  color: ${props => (props.isDark ? BasicColor.black : BasicColor.white)};
  font-style: normal;
  font-size: 24px;
  line-height: 29px;
  //styleName: General Text;
  font-weight: 400;

  @media (max-width: ${ScreenSize.phone}) {
    font-size: 16px;
    line-height: 20px;
  }
`;
