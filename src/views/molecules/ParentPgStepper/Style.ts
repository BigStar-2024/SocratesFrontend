import styled from 'styled-components';
import { ScreenSize } from 'constants/screenSize';

export interface pointProps {
    color: string,
    isCurrent: boolean;
}

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Line = styled.div`
    display: block;
    border-color: rgb(189, 189, 189);
    border-top-style: solid;
    border-top-width: 1px;
    width: 62px;
    margin-left: 10px;
    margin-right: 10px;
    @media screen and (max-width: ${ScreenSize.tablet}) {
        display: none
    }

`;

export const StepContent = styled.div`
    font-size: 24px;
    padding-left: 10px;
    color: ${props => props.color || '#21B95C'};
    @media screen and (max-width: ${ScreenSize.phone}) {
        display: none
    }
    @media screen and (max-width: ${ScreenSize.tablet}) {
        font-size: 3vw;
    }
`;

export const Point = styled.div`
    width: 40px;
    height: 40px;
    background-color:  ${(props: pointProps) => props.isCurrent && props.color || 'unset'};
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-radius: 100%;
    font-size: 24px;
    color: ${(props: pointProps) => props.isCurrent && 'white' || props.color};
    border-color: ${props => props.color || '#21B95C'};
    border-style: solid;
    @media screen and (max-width: ${ScreenSize.tablet}) {
        margin-left: 15px;
    }
    @media screen and (max-width: ${ScreenSize.phone}) {
        margin: 15px;
    }

`;
