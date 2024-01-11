import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IAIBlock, IAIQuestion } from 'app/entities/block';
import { BasicColor, ButtonColor } from 'views/Color';
import { Icon } from 'views/atoms/Icon/Icon';
import videoIcon from 'views/assets/others/video-assistor.png';
import assistor from 'views/assets/text-to-speech.svg';
import { VideoModalAssistor } from 'views/organisms/VideoModalAssistor';
import Button from 'views/molecules/MuiButton';
import { dictionary } from 'views/pages/Student/Question/dictionary'
import { BlackBoard, AnswersContainer, AssistorContainer, BlockAnswers, ImageAsset, AnswerContainer } from './Styles'
import { QuestionBoxTitle } from './Elements/QuestionBoxTitle';
import { isValidUrl, shuffle } from 'views/utils';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { ScreenSize } from 'constants/screenSize';
import { MCOption } from './Elements/MCOption';
import { MCOptionImage } from './Elements/MCOptionImage';

type ChoiceTextProps = {
  question: IAIQuestion;
  nextQuestion: () => void;
  totalQuestions: number;
  questionCounter: number;
  blockPresentation: IAIBlock;
  onAnswer: (result: {
    multipleChoiceAnswerOption: number,
    question: string
  }, isCorrect: boolean) => void;
};

interface BlockQuestionInput {
  question: number;
  answerOption: number;
  isCorrect: boolean;
}

export const MultipleChoice: FC<ChoiceTextProps> = ({
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
  const [shuffled, setShuffled] = useState<Array<any>>([])

  useEffect(() => {
    setIsAnswered(false);
    setShuffled(shuffle([...question.answerOptions]))
  }, [question]);

  const readAnswer = (option: any) => {
    if (!option.answerAudioUrl) return
    // const answerSoundURI = `${process.env.REACT_APP_SERVER_URL}${option.answerAudioUrl}`;
    const audio = new Audio(option.answerAudioUrl);
    audio.play();
  };

  const handleAnswer = (result: BlockQuestionInput) => {
    setIsAnswered(true);
    onAnswer({
      question: question.id,
      multipleChoiceAnswerOption: result.answerOption,
    }, result.isCorrect);
  };

  const readQuestion = () => {
    if (!question.questionAudioUrl) return
    const audio = new Audio(question.questionAudioUrl);
    audio.play();
  };

  const closeVideoModal = () => {
    setShowAssistor(!showAssistor);
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
        <AnswersContainer>
          <Box
            justifyContent='center'
            alignItems='center'
            display='flex'
            flexDirection={isTablet ? 'column-reverse' : 'row'}
          >
            <BlockAnswers isAnswered={isAnswered} />
            <Grid container justifyContent={'center'} spacing={1} maxWidth={500}>
              {shuffled && shuffled.map((option) => {
                return (
                  isValidUrl(option.answerText) ? // check whether option is image
                    <Grid item key={option.id} spacing={2}>
                      <MCOptionImage
                        answer={option}
                        onClick={handleAnswer}
                      />
                    </Grid> :
                    <Grid item key={option.id} xs={12}>
                      <AnswerContainer>
                        <MCOption
                          answer={option}
                          onClick={handleAnswer}
                        />
                        {
                          !(question.questionAudioAssets[0]?.audioFile) && // hide for sight words, sight word will have questionAudiosAssets.
                          <Icon
                            image={assistor}
                            onClick={() => {
                              readAnswer(option);
                            }}
                          />
                        }
                      </AnswerContainer>
                    </Grid>
                )
              }
              )}
            </Grid>
            {
              question &&
              question.questionImageAssets.length > 0 &&
              <Grid container justifyContent={'center'} spacing={1}>
                {
                  question.questionImageAssets?.map((item, i) => (
                    <Grid item>
                      <ImageAsset key={i} src={item.image} alt='' />
                    </Grid>
                  ))
                }
              </Grid>
            }
          </Box>
        </AnswersContainer>
        <AssistorContainer>
          <Button
            bgColor={ButtonColor.next}
            onClick={nextQuestion}
            disabled={!isAnswered}
            value={
              totalQuestions === questionCounter + 1 ?
                dictionary[language]?.finish :
                dictionary[language]?.next
            }
            fullWidth={true}
            color={BasicColor.black}
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
