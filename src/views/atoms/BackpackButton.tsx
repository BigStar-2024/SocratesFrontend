import { FC }         from 'react';
import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';

type BackpackButtonProps = {
  onClick: () => void;
  image: string;
  width: number;
  height: number;
};

export const BackpackButton: FC<BackpackButtonProps> = ({
  onClick,
  image,
  width,
  height,
}) => {
  return (
    <>
      <BackpackButtonStyles
        src={image}
        width={width}
        height={height}
        onClick={onClick}
      />
    </>
  );
};

type BackpackButtonStyleProps = {
  width: number;
  height: number;
};

const BackpackButtonStyles = styled.img<BackpackButtonStyleProps>`
  width: ${p => p.width}px;
  heigth: ${p => p.height}px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
  @media screen and (min-width: ${ScreenSize.tablet}) {
    width: ${p => p.width + 40}px;
    height: ${p => p.height + 45}px;
  }
`;
