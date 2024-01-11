import { FC }                     from 'react';
import styled                     from 'styled-components';
import { BasicColor, shadeColor } from 'views/Color';

type ServiceButtonProps = {
  value: string;
  icon: string;
  onClick: () => void;
};

export const ServiceButton: FC<ServiceButtonProps> = ({
  value,
  onClick,
  icon,
}) => {
  return (
    <StyledServiceButton icon={icon} onClick={onClick}>
      {value}
    </StyledServiceButton>
  );
};

const StyledServiceButton = styled.button<{icon: string}>`
  background-color: ${BasicColor.white};
  color: ${BasicColor.black};
  width: 262px;
  height: 49px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  background-position: center;
  transition: background 800ms;
  display: inline;
  border: none;
  &:hover {
    background: ${shadeColor(BasicColor.white, -10)}
      radial-gradient(circle, transparent 1%, ${BasicColor.white} 1%)
      center/15000%;
  }
  &:active {
    background-color: ${shadeColor(BasicColor.white, -5)};
    background-size: 100%;
    transition: background 0s;
  }
  &::before {
    content: url(${p => p.icon});
    vertical-align: -25%;
    padding: 0 6px 0 0;
  }
`;
