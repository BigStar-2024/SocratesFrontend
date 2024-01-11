import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IAIBlock, IAIQuestion, ITypeInAnswerOptionInput } from 'app/entities/block';
import { BasicColor, ButtonColor } from 'views/Color';
import { Icon } from 'views/atoms/Icon/Icon';
import videoIcon from 'views/assets/others/video-assistor.png';
import assistor from 'views/assets/text-to-speech.svg';
import { VideoModalAssistor } from 'views/organisms/VideoModalAssistor';
import Button from 'views/molecules/MuiButton';
import { dictionary } from 'views/pages/Student/Question/dictionary'
import { BlackBoard, AssistorContainer } from './Styles'
import { QuestionBoxTitle } from './Elements/QuestionBoxTitle';
import { Box, useMediaQuery } from '@mui/material';
import { ScreenSize } from 'constants/screenSize';
import { TypeInMultiple } from './Elements/TypeInMultiple';
import { TypeInFraction } from './Elements/TypeInFraction';

type ChoiceTextProps = {
  question: IAIQuestion;
  nextQuestion: () => void;
  totalQuestions: number;
  questionCounter: number;
  blockPresentation: IAIBlock;
  onAnswer: (result: {
    typeInAnswerOption: ITypeInAnswerOptionInput,
    question: string
  }, isCorrect: boolean) => void;
};


export const TypeInQuestion: FC<ChoiceTextProps> = ({
  question,
  nextQuestion,
  totalQuestions,
  questionCounter,
  blockPresentation,
  onAnswer,
}) => {
  const isTablet = useMediaQuery(`(max-width: ${ScreenSize.tablet})`)
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'
  const [showAssistor, setShowAssistor] = useState(false);

  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [typedAnswer, setTypedAnswer] = useState('')
  const [disabled, setDisabled] = useState(false)
  const questionSoundURI = `${process.env.REACT_APP_SERVER_URL}${question.questionAudioUrl}`;

  useEffect(() => {
    setIsAnswered(false);
    setTypedAnswer('')
    setDisabled(false)
  }, [question]);

  const handleNextButtonClicked = () => {
    if (isAnswered)
      nextQuestion()
    else if (typedAnswer) {
      setIsAnswered(true)
      const answer: ITypeInAnswerOptionInput = {
        answerOption: +question.answerOptions[0].id,
        typedAnswer: typedAnswer
      }
      onAnswer({
        question: question.id,
        typeInAnswerOption: answer
      },
        question.answerOptions[0].caseSensitive ?
          typedAnswer === question.answerOptions[0].answerText :
          typedAnswer.toLowerCase().trim() === question.answerOptions[0].answerText.toLowerCase().trim()
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

  const renderQuesionContent = (type: string) => {
    switch (type) {
      case 'TYPE':
        return <TypeInMultiple
          questionText={question.questionText}
          getAnswerText={setTypedAnswer}
        />
      case 'FRAC':
        return <TypeInFraction
          answer={question.answerOptions[0]?.answerText?.split('|')}
          questionText={question.questionText}
          getAnswerText={setTypedAnswer}
        />
      default:
        return <Box
          display='flex'
          flexDirection='column'
          alignItems={'center'}
          gap={5}
        >
          <QuestionBoxTitle
            title={question.questionText}
            audioFile={
              question.questionAudioAssets[0]?.audioFile
            }
          />
          <input
            disabled={disabled}
            style={{ width: 200, fontSize: 25, padding: 5, textAlign: 'end' }}
            value={typedAnswer}
            onChange={(e: any) => setTypedAnswer(e.target.value)}
            autoFocus
          />
        </Box>
    }
  }

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
        <Box
          display='flex'
          gap={3}
          flexDirection={isTablet ? 'column' : 'row'}
          justifyContent='center'
          alignItems={'center'}
        >
          {renderQuesionContent(question.questionText?.slice(0, 4))}
          {
            question.questionImageAssets.length > 0 &&
            <Box
              id='image-asset-container'
              display={'flex'}
              justifyContent='center'
              alignItems={'center'}
              gap={2}
            >
              {question.questionImageAssets?.map((item, i) => (
                <img style={{ maxHeight: 700, maxWidth: '100%' }} key={i} src={item.image} alt='' />
              ))}
            </Box>
          }
        </Box>
        <AssistorContainer>
          <Button
            bgColor={!isAnswered ? ButtonColor.login : ButtonColor.next}
            onClick={handleNextButtonClicked}
            fullWidth={true}
            color={BasicColor.black}
            value={
              isAnswered ?
                totalQuestions === questionCounter + 1 ?
                  dictionary[language]?.finish :
                  dictionary[language]?.next
                :
                'Check'
            }
          />
          <Icon image={assistor} onClick={readQuestion} />
          {
            blockPresentation?.block?.topicGrade?.topic?.videoAssistor &&
            <Icon image={videoIcon} onClick={closeVideoModal} />
          }
        </AssistorContainer>
      </BlackBoard>
    </>
  );
};
