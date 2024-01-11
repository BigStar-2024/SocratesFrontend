import styled       from 'styled-components';
import {ScreenSize} from 'constants/screenSize';
import {BasicColor} from 'views/Color';
import {Typography} from './typography';

// Roboto:wght@100;300;400;500;700;900

type TextProps = {
  isDark?: boolean;
};

export const TypoHeader = styled.h1<TextProps>`
  font-family: ${Typography.secondary};
  color: black;
  font-weight: 700;
  font-size: 36px;
  @media (max-width: ${ScreenSize.phone}) {
    font-size: 20px;
    letter-spacing: 0.1px;
  }
`;

export const TypoGeneralText = styled.p<TextProps>`
  font-family: ${Typography.primary};
  color: black;
  font-weight: 400;
  font-size: 24px;
  @media (max-width: ${ScreenSize.phone}) {
    font-size: 16px;
    letter-spacing: 0.1px;
  }
`;

export const Subheader = styled.h3<TextProps>`
  font-family: ${Typography.secondary};
  color: ${props => (props.isDark ? BasicColor.black : BasicColor.white)};
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  @media (max-width: ${ScreenSize.phone}) {
    font-size: 12px;
    letter-spacing: 0.75px;
    text-transform: capitalize;
  }
`;

export const Title = styled.h2<TextProps>`
  font-family: ${Typography.secondary};
  color: ${props => (props.isDark ? BasicColor.black : BasicColor.white)};
  font-weight: bold;
  letter-spacing: 0.25px;
  margin: 0;
  font-size: 40px;
  font-weight: 500;

  @media (min-width: ${ScreenSize.desktop}) {
    font-size: 34px;
  }
`;

export const TypoTitle = styled.h2`
  font-family: ${Typography.secondary};
  font-weight: bold;
  letter-spacing: 0.25px;
  margin: 0;
  font-size: 40px;
  font-weight: 700;

  @media (max-width: ${ScreenSize.phone}) {
    font-size: 24px;
  }
`;

export const TypoBtn = styled.p`
  font-family: ${Typography.primary};
  letter-spacing: 0.25px;
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: ${ScreenSize.phone}) {
    font-size: 12px;
    font-weight: 500;
  }
`;

export const TypoDescription = styled.p`
  font-family: ${Typography.primary};
  letter-spacing: 0.25px;
  margin: 0;
  font-size: 16px;
  cursor: pointer;

  @media (max-width: ${ScreenSize.phone}) {
    font-size: 12px;
  }
`;

export const TypoIcon = styled.p`
  font-family: ${Typography.primary};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 1.5px;
  text-align: center;
  cursor: pointer;
  @media (max-width: ${ScreenSize.phone}) {
    font-size: 9px;
  }
`
// please add "Typo" prefix to all texts newly defined.
