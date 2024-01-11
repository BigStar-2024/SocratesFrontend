import styled                                   from 'styled-components';
import { BasicColor, ButtonColor, shadeColor }  from 'views/Color';

type ButtonWrapperProps = {
  bgcolor?: ButtonColor | BasicColor;
};

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  background-color: ${props => props.bgcolor || BasicColor.greenSoft};
  color: ${BasicColor.white};
  padding: 18px 32px;
  height: fit-content;
  border-radius: 20px;
  width: 100%;
  text-align: center;
  border: none;
  &:hover {
    background: ${p => shadeColor(p.bgcolor || BasicColor.greenSoft, 10)}
      radial-gradient(circle, transparent 1%, ${p => p.bgcolor} 1%)
      center/15000%;
  }
  &:active {
    background-color: ${p => shadeColor(p.bgcolor || BasicColor.greenSoft, 15)};
    background-size: 100%;
  }
`;
