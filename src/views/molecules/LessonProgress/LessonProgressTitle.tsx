import { FC } from 'react';
import styled from 'styled-components';
import { BasicColor } from 'views/Color';
import { LevelUp } from 'views/atoms/Text/LevelUp';
import { ScreenSize } from 'constants/screenSize';
import { dictionary } from './dictionary'
import { useSelector }from 'react-redux';

type LessonProgressTitleProps = {
  topic: string;
  currentQuestion: number;
  totalQuestions: number;
  finished?: boolean;
  questions: any;
};

export const LessonProgressTitle: FC<LessonProgressTitleProps> = ({
  topic,
  currentQuestion,
  totalQuestions,
  finished,
  questions,
}) => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'
  const questionText = finished
    ? 'Good job!'
    : dictionary[language]?.Question + currentQuestion.toString() + ` ${dictionary[language]?.of} ` + totalQuestions;
  return (
    <LessonProgressTitleWrapper>
      <LessonProgressTopic>
        <LevelUp>{topic}</LevelUp>
      </LessonProgressTopic>
      <TriangleRight></TriangleRight>
      <LessonProgressQuestion>
        <LevelUp>{questionText}</LevelUp>
        {
          currentQuestion > 0 && questions.length > 0 &&
          <QuestionIdContainer>No.{questions[currentQuestion - 1]?.id}</QuestionIdContainer>}
      </LessonProgressQuestion>
    </LessonProgressTitleWrapper>
  );
};

const TriangleRight = styled.div`
  width: 0;
  height: 0;
  border-top: 35px solid transparent;
  border-left: 35px solid ${BasicColor.blue};
  border-bottom: 35px solid transparent;
  @media (max-width: ${ScreenSize.phone}) {
    border-top: 17px solid transparent;
    border-left: 17px solid ${BasicColor.blue};
    border-bottom: 17px solid transparent;
  }
`;

const LessonProgressTopic = styled.div`
  height: 100%;
  display: grid;
  background-color: ${BasicColor.blue};
  align-content: center;
  padding-left: 45px;
  @media (max-width: ${ScreenSize.phone}) {
    padding-left: 14px;
  }
`;

const LessonProgressQuestion = styled.div`
  height: 100%;
  display: grid;
  align-content: center;
  justify-self: end;
  padding-right: 45px;
  @media (max-width: ${ScreenSize.phone}) {
    padding-right: 14px;
  }
`;

export const QuestionIdContainer = styled.div`
  color: white;
  display: flex;
  justify-self: center;
`;

const LessonProgressTitleWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: grid;
  grid-template-columns: 4fr auto 6fr;
  align-content: center;
  background-color: ${BasicColor.aqua};
  border-bottom: 1px solid white;
  @media (max-width: ${ScreenSize.phone}) {
    height: 34px;
  }
`;
