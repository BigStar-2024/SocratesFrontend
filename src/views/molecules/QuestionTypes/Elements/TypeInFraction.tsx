import { FC, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { extractQuestion } from 'views/utils';

type TypeInFractionProps = {
  questionText: string;
  getAnswerText: (str: string) => void;
  answer: string[]
};


export const TypeInFraction: FC<TypeInFractionProps> = ({
  questionText,
  getAnswerText,
  answer
}) => {
  const [userAnswer, setUserAnswer] = useState({ 1: '0', 2: '0', 3: '0' })

  useEffect(() => {
    setUserAnswer({ 1: '0', 2: '0', 3: '0' })
  }, [questionText]);


  const handleInputChange = (e: any) => {
    e.preventDefault()
    const temp = { ...userAnswer }
    temp[e.target.name as keyof Object] = e.target.value
    const userAnswerText = []
    for (const answer in temp) {
      userAnswerText.push(temp[answer as keyof Object])
    }
    console.log({ temp })
    setUserAnswer(temp)
    getAnswerText(userAnswerText.join('|'))
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems={'center'}
      gap={5}
    >
      <Typography variant='h5' sx={{ color: 'white' }}>
        {questionText && extractQuestion(questionText)}
      </Typography>
      <Box display='flex' alignItems='center' gap={2}>
        <input
          name='1'
          value={userAnswer['1' as keyof object] || ''}
          style={{ width: 40, fontSize: 25, padding: 5, textAlign: 'end', display: answer[0] === '0' ? 'none' : 'inherit' }}
          onChange={(e: any) => handleInputChange(e)}
        />
        <Box display='flex' flexDirection={'column'}>
          <input
            name='2'
            value={userAnswer['2' as keyof object] || ''}
            style={{ width: 40, fontSize: 25, padding: 5, textAlign: 'end' }}
            onChange={(e: any) => handleInputChange(e)}
          />
          <hr style={{ color: 'white', width: '100%' }} />
          <input
            name='3'
            value={userAnswer['3' as keyof object] || ''}
            style={{ width: 40, fontSize: 25, padding: 5, textAlign: 'end' }}
            onChange={(e: any) => handleInputChange(e)}
          />
        </Box>
      </Box>
    </Box>
  );
};
