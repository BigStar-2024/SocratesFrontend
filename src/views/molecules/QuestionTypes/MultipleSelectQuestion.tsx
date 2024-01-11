import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IAIBlock, IAIQuestion } from 'app/entities/block';
import { BasicColor, ButtonColor } from 'views/Color';
// import { Question } from 'views/atoms/Text/Question';
import { Icon } from 'views/atoms/Icon/Icon';
import videoIcon from 'views/assets/others/video-assistor.png';
import assistor from 'views/assets/text-to-speech.svg';
import { VideoModalAssistor } from 'views/organisms/VideoModalAssistor';
import Button from 'views/molecules/MuiButton';
import { dictionary } from 'views/pages/Student/Question/dictionary'
import { BlackBoard, QuestionContainer, AnswersContainer, AssistorContainer } from './Styles'
import { FormGroup, Grid, FormControlLabel, Checkbox } from '@mui/material';

type ChoiceTextProps = {
  question: IAIQuestion;
  nextQuestion: () => void;
  totalQuestions: number;
  questionCounter: number;
  blockPresentation: IAIBlock;
  onAnswer: (result: {
    multipleSelectAnswerOptions: Array<string>,
    question: string
  }, isCorrect: boolean) => void;
};

export const MultipleSelectQuestion: FC<ChoiceTextProps> = ({
  question,
  nextQuestion,
  totalQuestions,
  questionCounter,
  blockPresentation,
  onAnswer,
}) => {
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'
  const [showAssistor, setShowAssistor] = useState(false);

  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [checked, setChecked] = useState(new Array(question.answerOptions.length).fill(false))
  const questionSoundURI = `${process.env.REACT_APP_SERVER_URL}${question.questionAudioUrl}`;

  useEffect(() => {
    setIsAnswered(false);
    setChecked(new Array(question.answerOptions.length).fill(false))
    console.log('current:',questionCounter, 'total: ',totalQuestions)
  }, [question]);

  const handleNextButtonClicked = () => {
    if (isAnswered)
      nextQuestion()
    else {
      setIsAnswered(true)

      const answerIds = []
      const trueAnswer = []
      for (const option of question.answerOptions) {
        trueAnswer.push(option.isCorrect)
      }

      for (let i = 0; i < trueAnswer.length; i++) {
        if (trueAnswer[i] === true)
          answerIds.push(question.answerOptions[i].id)
      }

      onAnswer({
        question: question.id,
        multipleSelectAnswerOptions: answerIds
      },
        JSON.stringify(trueAnswer) === JSON.stringify(checked)
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

  // const readAnswer = (answerOption: any) => {
  //   const answerSoundURI = `${process.env.REACT_APP_SERVER_URL}${answerOption.answerAudioUrl}`;
  //   const audio = new Audio(answerSoundURI);
  //   audio.play();
  // };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempArray = [...checked]

    // if checked count is bigger than 2, then selecting another one is impossible.
    const idx = question.answerOptions.findIndex((x: { id: string; }) => x.id === event.target.value)
    tempArray[idx] = event.target.checked
    console.log(idx, tempArray)
    setChecked(tempArray)
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
        <QuestionContainer>
          {/* <Question>{question.questionText}</Question> */}
        </QuestionContainer>
        <AnswersContainer>
          <FormGroup sx={{ marginLeft: 3 }}>
            <Grid container alignItems={'start'} flexDirection='column'>
              {question.answerOptions.map((option, index) => (
                <Grid item key={option.id}>
                  <FormControlLabel
                    sx={{ color: 'white', }}
                    key={option.id}
                    label={option.answerText}
                    value={option.id}
                    // control={<Checkbox checked={checked[index]} onChange={handleCheckChange} />}
                    control={
                      <Checkbox
                        checked={checked[index]}
                        onChange={handleCheckChange}
                        sx={{
                          '&.MuiCheckbox-root': {
                            color: 'yellow'
                          }
                        }} />}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </AnswersContainer>
        <AssistorContainer>
          <Button
            bgColor={!isAnswered ? ButtonColor.login : ButtonColor.next}
            onClick={handleNextButtonClicked}
            // disabled={!isAnswered}
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
          <Icon image={videoIcon} onClick={closeVideoModal} />
        </AssistorContainer>
      </BlackBoard>
    </>
  );
};
