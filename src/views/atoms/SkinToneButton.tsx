import { FC }           from 'react';
import styled           from 'styled-components';
import { BasicColor }   from 'views/Color';

type SkinToneProps = {
    color: string,
    onClick?: () => void
}

export const SkinToneButton:FC<SkinToneProps> = ({color,onClick}) => {
    return(
        <>
            <SkinToneStyles color={color} onClick={onClick}/>
        </>
    )
}

const SkinToneStyles = styled.div<{
    color: string;
}>`
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: ${props => props.color};
    cursor:pointer;
    &:hover{
        transform: scale(1.1);
        box-shadow: 0 0 1px 1px ${BasicColor.black};
    }
`;
