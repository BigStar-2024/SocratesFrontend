import { FC, useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { ScreenSize } from 'constants/screenSize';
import { extractMathjaxText, extractQuestion } from 'views/utils';
import he from 'he'

type TypeInMultipleProps = {
  questionText: string;
  getAnswerText: (str: string) => void;
};


export const TypeInMultiple: FC<TypeInMultipleProps> = ({
  questionText,
  getAnswerText,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${ScreenSize.phone})`)
  let counter = 0
  const [userAnswer, setUserAnswer] = useState({})

  useEffect(() => {
    setUserAnswer({})
  }, [questionText]);


  const handleInputChange = (e: any) => {
    const temp = { ...userAnswer }
    temp[e.target.name as keyof Object] = e.target.value
    const userAnswerText = []
    for (const answer in temp) {
      userAnswerText.push(temp[answer as keyof Object])
    }
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
      <Box display='flex' alignItems='center' gap={isMobile ? '1px' : 1}>
        {
          questionText && he.decode(extractMathjaxText(questionText)).split(',').map((str: string, index) => {
            if (str === 'B') {
              counter++
              return <input
                key={index}
                name={counter.toString()}
                style={{ width: 40, fontSize: 25, padding: 5, textAlign: 'end' }}
                value={userAnswer[counter as keyof object] || ''}
                onChange={(e: any) => handleInputChange(e)}
                autoFocus
              />
            }
            return <Typography color='white' variant='h5' key={index}>{str}</Typography>
          }
          )
        }
      </Box>
    </Box>
  );
};
