import { FC } from 'react';
import styled from 'styled-components';

type iconProps = {
  image: string;
  size?: string;
  onClick?: () => void;
};

export const Icon: FC<iconProps> = ({image, onClick, size}) => {
  return (
    <>
      <IconStyle src={image} onClick={onClick} size={size} />
    </>
  );
};

const IconStyle = styled.img<{
  size?: string;
}>`

  height: ${p => p.size};
  width: ${p => p.size};
  &: hover {
    cursor: pointer;
    transition: 0.70s;
    transform: rotate(360deg);
  }
`;

export const RoundIcon = styled(IconStyle)`
  border-radius: 100%;
`;
