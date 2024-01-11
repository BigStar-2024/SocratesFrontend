import { FC, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IAIBlock, IAIQuestion } from 'app/entities/block';
import { BasicColor, ButtonColor } from 'views/Color';
import { Icon } from 'views/atoms/Icon/Icon';
import videoIcon from 'views/assets/others/video-assistor.png';
import assistor from 'views/assets/text-to-speech.svg';
import { VideoModalAssistor } from 'views/organisms/VideoModalAssistor';
import Button from 'views/molecules/MuiButton';
import { dictionary } from 'views/pages/Student/Question/dictionary'
import { BlackBoard, AssistorContainer } from './Styles'
import { Box } from '@mui/material';
import { QuestionBoxTitle } from './Elements/QuestionBoxTitle';
import { SortOrderDnd } from './Elements/SortOrderDnd';

type ChoiceTextProps = {
  question: IAIQuestion;
  nextQuestion: () => void;
  totalQuestions: number;
  questionCounter: number;
  blockPresentation: IAIBlock;
  onAnswer: (result: {
    question: string,
    orderAnswerOptions: string[],
  }, isCorrect: boolean) => void;
};

export const SortOrderQuestion: FC<ChoiceTextProps> = ({
  question,
  nextQuestion,
  totalQuestions,
  questionCounter,
  blockPresentation,
  onAnswer,
}) => {
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'
  const dndRef = useRef<any>(null)
  const [showAssistor, setShowAssistor] = useState(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const questionSoundURI = `${process.env.REACT_APP_SERVER_URL}${question.questionAudioUrl}`;

  useEffect(() => {
    setIsAnswered(false);
    console.log({ question })
  }, [question]);


  const handleNextButtonClicked = () => {
    if (isAnswered)
      nextQuestion()
    else {
      setIsAnswered(true)
      onAnswer({
        question: question.id,
        orderAnswerOptions: dndRef?.current.getCurrentAnswer()
      },
        dndRef?.current.checkAnswer()
      )
    }
  }
  const closeVideoModal = () => {
    setShowAssistor(!showAssistor);
  };

  const readQuestion = () => {
    const audio = new Audio(questionSoundURI);
    audio.play();
  };

  return (
    <>
      {(showAssistor && blockPresentation?.block?.topicGrade?.topic?.videoAssistor) ? (
        <VideoModalAssistor
          onClick={closeVideoModal}
          source={
            blockPresentation
              ? blockPresentation?.block?.topicGrade?.topic?.videoAssistor
              : ''
          }
        />
      ) : null}
      <BlackBoard>
        <QuestionBoxTitle
          title={question.questionText}
          audioFile={
            question.questionAudioAssets[0]?.audioFile
          }
        />
        <Box
          id='dnd-container'
          width='100%'
          display='flex'
          justifyContent={'center'}
          alignItems='center'
        >
          {
            question.answerOptions &&
            <SortOrderDnd options={question.answerOptions} ref={dndRef} />
          }
        </Box>
        <AssistorContainer>
          <Button
            bgColor={!isAnswered ? ButtonColor.login : ButtonColor.next}
            onClick={handleNextButtonClicked}
            fullWidth={true}
            value={
              isAnswered ?
                totalQuestions === questionCounter + 1 ?
                  dictionary[language]?.finish :
                  dictionary[language]?.next
                :
                'Check'
            }
            color={BasicColor.black}
          />
          <Icon image={assistor} onClick={readQuestion} />
          <Icon image={videoIcon} onClick={closeVideoModal} />
        </AssistorContainer>
      </BlackBoard>
    </>
  );
};
