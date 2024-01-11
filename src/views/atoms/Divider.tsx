import { FC }         from 'react';
import styled         from 'styled-components';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';

type DividerProps = {
  value: string;
};

export const Divider: FC<DividerProps> = ({value}) => {
  return (
    <StyledDivider>
      <StyledLine />
      {value}
      <StyledLine />
    </StyledDivider>
  );
};

const StyledDivider = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  color: ${BasicColor.white};
  font-weight: 700;
  font-size: 14px;
  padding-left: 3rem;
  padding-right: 3rem;
  @media (min-width: ${ScreenSize.tablet}) {
    visibility: hidden;
  }
`;

const StyledLine = styled.div`
  margin-bottom: 7px;
  border-bottom: 1px solid ${BasicColor.white};
`;
