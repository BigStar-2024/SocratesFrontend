import { FC, useEffect, useState } from 'react';
import { BasicColor } from 'views/Color';
import { Box, Typography } from '@mui/material';
import MathJax from 'react-mathjax';
import { extractMathjaxText } from 'views/utils';

interface BlockQuestionInput {
  question: number;
  answerOption: number;
  isCorrect: boolean;
}

type MCOptionProps = {
  answer: any;
  onClick: (result: BlockQuestionInput) => void
}

export const MCOption: FC<MCOptionProps> = ({ answer, onClick }) => {

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
      padding={1}
      borderRadius={2}
      bgcolor={
        isAnswered ?
          answer?.isCorrect ? BasicColor.greenSoft :
            BasicColor.red
          : 'white'
      }
    >
      {
        answer?.answerText.charAt(0) === '@' ?
          <MathJax.Provider>
            <MathJax.Node
              formula={extractMathjaxText(answer.answerText)}
            />
          </MathJax.Provider> :
          <Typography variant='h5' style={{ margin: 0, textAlign: 'center' }}>{answer?.answerText || 'EMPTY'}</Typography>
      }
    </Box>
  )
}
