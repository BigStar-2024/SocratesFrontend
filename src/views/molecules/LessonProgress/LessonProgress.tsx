import { FC } from 'react';
import styled from 'styled-components';
import { LessonProgressTitle } from './LessonProgressTitle';
import { LessonProgressBar } from './LessonProgressBar';
import { ScreenSize } from 'constants/screenSize';
import { BasicColor } from 'views/Color';
import { LessonProgressLightening } from './LessonProgressLightening';
import {
  LESSON_PROGRESS_BAR_HEIGHT,
  LESSON_PROGRESS_BAR_MOBILE_HEIGHT
} from 'constants/common';

type LessonProgressProps = {
  topic: string;
  currentQuestion: number;
  totalQuestions: number;
  finished?: boolean;
  questions?: any
  answerResult?: boolean[];
  combocount: number;
};

type ProgressBar = {
  color: BasicColor | null;
};

export const LessonProgress: FC<LessonProgressProps> = ({
  topic,
  currentQuestion,
  totalQuestions,
  finished,
  questions,
  answerResult = [],
  combocount
}) => {
  // !! Added bar array builder function
  const buildBars = (totalQuestions: number, answerResult: boolean[]) => {
    const bars = [];
    // TODO add logic inside this loop to build a
    // TODO proper progress bar
    for (let i = 0; i < totalQuestions; i++) {
      if (answerResult[i] === true) bars.push({ color: BasicColor.green });
      else if (answerResult[i] === false) bars.push({ color: BasicColor.red });
      else bars.push({ color: null });
    }
    return bars;
  };

  return (
    <StyledLessonProgressWrapper id='lesson-progress-wrapper'>
      <LessonProgressTitle
        topic={topic}
        currentQuestion={currentQuestion + 1}
        totalQuestions={totalQuestions}
        finished={finished}
        questions={questions}
      ></LessonProgressTitle>
      <StyledLessonProgressBarWrapper>
        {buildBars(totalQuestions, answerResult).map(
          (bar: ProgressBar, i: number) => (
            <LessonProgressBar bgColor={bar.color} key={i}></LessonProgressBar>
          )
        )}
        <div className='lightening' style={combocount ? {} : { display: 'none' }}>
          <LessonProgressLightening combocount={combocount} />
        </div>
      </StyledLessonProgressBarWrapper>
    </StyledLessonProgressWrapper>
  );
};

const StyledLessonProgressWrapper = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: ${ScreenSize.phone}) {
    max-width: 1366px;
  }
`;

const StyledLessonProgressBarWrapper = styled.div`
  width: 100%;
  height: ${LESSON_PROGRESS_BAR_MOBILE_HEIGHT}px;
  display: flex;
  background: white;
  grid-gap: 2px;
  position: relative;

  .lightening {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }
  @media screen and (min-width: ${ScreenSize.phone}) {
    height: ${LESSON_PROGRESS_BAR_HEIGHT}px;
  }
`;
