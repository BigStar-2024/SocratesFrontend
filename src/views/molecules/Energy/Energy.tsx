import { FC } from 'react';
import { Icon } from 'views/atoms/Icon/Icon';
import lightning from 'views/assets/lightning.svg';
import { Battery } from 'views/molecules/Battery/Battery';
import { IconSize } from 'views/atoms/Icon/Size';
import styled from 'styled-components';
import { BatteryButton } from 'views/molecules/Battery/BatteryButton';
import { ScreenSize } from 'constants/screenSize';

type EnergyProps = {
  charge: number;
};

const EnergyStyle = styled.div`
  width: 320px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Energy: FC<EnergyProps> = ({ charge }) => {
  return (
    <>
      <EnergyStyle>
        <IconContainer>

          <Icon image={lightning} size={IconSize.small} />
        </IconContainer>
        <Battery charge={charge} />
        <BatteryButton value={charge * 10 + ' % '} />
      </EnergyStyle>
    </>
  );
};

const IconContainer = styled.div`
  @media screen and (max-width: ${ScreenSize.tablet}) {
    display: none;
  }
`;
