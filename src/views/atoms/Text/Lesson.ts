import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { BasicColor } from 'views/Color';
import { Typography } from './typography';

type LessonProps = {
  isDark?: boolean;
};

export const Lesson = styled.h4<LessonProps>`
  font-family: ${Typography.primary};
  color: ${props => (props.isDark ? BasicColor.black : BasicColor.white)};
  font-weight: 500;
  font-size: 28px;
  line-height: 24px;
  letter-spacing: 0.44px;
  margin: 0;
  @media (max-width: ${ScreenSize.phone}) {
    font-size: 16px;
    line-height: 16px;
  }
`;
