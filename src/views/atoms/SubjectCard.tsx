import { FC } from "react";
import styled from "styled-components";

interface ISubjectBox {
    imgUrl?: string;
    bgColor?: string;
    text?: string;
}
export const SubjectCard: FC<ISubjectBox> = ({ imgUrl="", bgColor="", text="" }) => {
    return (<SubjectBox bgColor={bgColor}>
        <img src={imgUrl} alt="imgUrl" />
        <h2>{text}</h2>
    </SubjectBox>)
}

interface ISubjectBox {
    bgColor?: string;
}
const SubjectBox = styled.div<ISubjectBox>`
    width: 10rem;
    overflow: hidden;
    border-radius: 1rem;
    background-color: ${props => props?.bgColor ?? "white"};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
        color: #3F3F3F;
        font-size: 2rem;
        text-align: center;
    }
`;
