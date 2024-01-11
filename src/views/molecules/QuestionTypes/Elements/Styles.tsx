import styled from 'styled-components';
import { ScreenSize } from 'constants/screenSize';

export const QuestionsList = styled.div<{ isDraggingOver: boolean, isTablet?: boolean }>`
  border: dashed 1px gray;
  transition: background 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${props =>
    props.isTablet ? "column" : "row"};
  gap: 10px;
  margin-left: auto;
  margin-right: auto;
  min-height: 100px;
  border-radius: 10px;
  background-color: ${props =>
    props.isDraggingOver ? "rgba(10,10,10,0.3)" : "rgba(10,10,10,0.1)"};
  margin-bottom: 20px;
  padding: 0 20px;
`;
export const AnswersList = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  border: dashed 1px gray;
  height: 80px;
  border-radius: 10px;
  background-color: ${props =>
    props.isDraggingOver ? "rgba(10,10,10,0.3)" : "rgba(15,15,15,0.1)"};
  width: 100%;
  min-width: 200px;
`;

export const AnswersContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    flex-direction: row;
    grid-gap: 10px;
  }
`;
