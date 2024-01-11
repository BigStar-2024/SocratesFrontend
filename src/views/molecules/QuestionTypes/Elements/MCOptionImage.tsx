import { FC, useEffect, useState } from 'react';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';
import { Box, useMediaQuery } from '@mui/material';

interface BlockQuestionInput {
  question: number;
  answerOption: number;
  isCorrect: boolean;
}

type MCOptionProps = {
  answer: any;
  onClick: (result: BlockQuestionInput) => void
}

export const MCOptionImage: FC<MCOptionProps> = ({ answer, onClick }) => {
  const isTablet = useMediaQuery(`(max-width: ${ScreenSize.tablet})`)

  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setIsAnswered(false);
  }, [answer])

  const handleAnswer = () => {
    setIsAnswered(true);
    const inputAnswer: BlockQuestionInput = {
      question: -1,
      answerOption: answer.id,
      isCorrect: answer.isCorrect
    };
    onClick(inputAnswer)
  }

  return (answer &&
    <Box
      sx={{
        cursor: 'pointer',
        pointerEvents: isAnswered ? 'none' : 'auto',
        '&:hover': {
          boxShadow: '1px 4px 3px 2px black'
        }
      }}
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      onClick={() => handleAnswer()}
      margin={1}
      borderRadius={2}
      bgcolor={
        isAnswered ?
          answer?.isCorrect ? BasicColor.greenSoft :
            BasicColor.red
          : 'white'
      }
    >
      {
        <img
          style={{
            margin: isTablet ? 2 : 10,
            minWidth: isTablet ? '10vw' : 100,
            height: isTablet ? '40vw' : 200
          }}
          alt={answer?.id}
          src={answer?.answerText}
        />}
    </Box>
  )
}
