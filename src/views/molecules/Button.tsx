import { FC }                   from 'react';
import { ButtonColor, BasicColor }          from 'views/Color';
import { Button as ButtonText } from 'views/atoms/Text/Button';
import { ButtonWrapper }        from 'views/atoms/ButtonWrapper';

type ButtonProps = {
  value: string;
  color?: ButtonColor | BasicColor;
  darkText?: boolean;
  style?: any;
  onClick: () => void;
};

export const Button: FC<ButtonProps> = ({
  style=null,
  value,
  color,
  darkText = false,
  onClick,
}) => {
  return (
    <ButtonWrapper  bgcolor={color} onClick={onClick} style={style}>
      <ButtonText isDark={darkText}>{value}</ButtonText>
    </ButtonWrapper>
  );
};
