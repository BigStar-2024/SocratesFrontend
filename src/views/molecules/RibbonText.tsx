import { FC }         from 'react';
import styled         from 'styled-components';
import { Typography } from 'views/atoms/Text/typography';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';

type RibbonProps = {
  body: string;
};

export const RibbonText: FC<RibbonProps> = ({body}) => {
  return (
    <Wrapper>
      <RibbonHead></RibbonHead>
      <Ribbon>{body}</Ribbon>
      <RibbonTail></RibbonTail>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const Ribbon = styled.div`
  background-color: ${BasicColor.yellow};
  text-align: center;
  padding-top: 8px;
  font-family: ${Typography.secondary};
  color: #3f3f3f;
  font-weight: bold;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 20px;
  @media (min-width: ${ScreenSize.tablet}) {
    padding: 15px;
    padding-top: 24px;
  }
`;
const RibbonHead = styled.div`
  height: 0;
  border-style: solid;
  border-width: 16px;
  border-color: ${BasicColor.yellow} ${BasicColor.yellow} ${BasicColor.yellow}
    transparent;
  @media (min-width: ${ScreenSize.tablet}) {
    border-width: 32px;
  }
`;
const RibbonTail = styled.div`
  height: 0;
  border-style: solid;
  border-width: 16px;
  border-color: ${`${BasicColor.yellow} transparent ${BasicColor.yellow} ${BasicColor.yellow}`};
  @media (min-width: ${ScreenSize.tablet}) {
    border-width: 32px;
  }
`;
