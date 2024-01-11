import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import pt from 'views/assets/question/correct/positive-thinking.png'
import ss from 'views/assets/question/correct/shooting-star.png'
import stars from 'views/assets/question/correct/stars.png'
import tu from 'views/assets/question/correct/thumbs-up.png'

import achievement from 'views/assets/question/wrong/achievement.png'
import goal from 'views/assets/question/wrong/goal.png'
import ps from 'views/assets/question/wrong/positive-thinking.png'
import trumpet from 'views/assets/question/wrong/trumpet.png'

import fullBattery from 'views/assets/question/full-battery.gif'

const strokeWidth = 2

const images = [
  {
    id: 'correct-1',
    image: {
      correct: pt,
      wrong: achievement
    },
    message: {
      correct: {
        'en-us': 'Great job!',
        'es-mx': '¡Gran trabajo!',
        'th': 'ทำได้ดีมาก!',
      },
      wrong: {
        'en-us': 'You can do it!',
        'es-mx': '¡Puedes hacerlo!',
        'th': 'คุณสามารถทำมันได้!',
      }
    },
    hex: '#AFCE80',
    background: 'linear-gradient(180deg, #FFEEB0 -37.63%, #FFFFFF 78.26%)'
  },
  {
    id: 'correct-2',
    image: {
      correct: ss,
      wrong: goal
    },
    message: {
      correct: {
        'en-us': 'Excellent!',
        'es-mx': '¡Excelente!',
        'th': 'ยอดเยี่ยม!',
      },
      wrong: {
        'en-us': 'Do not give up!',
        'es-mx': '¡No te rindas!',
        'th': 'อย่ายอมแพ้!',
      }
    },
    hex: '#BDC1CB',
    background: 'linear-gradient(180deg, #CDD1FB -46.71%, #FFFFFF 78.26%)'
  },
  {
    id: 'correct-3',
    image: {
      correct: stars,
      wrong: ps
    },
    message: {
      correct: {
        'en-us': 'You are the rock star!',
        'es-mx': '¡Eres la estrella de rock!',
        'th': 'คุณคือร็อคสตาร์!',
      },
      wrong: {
        'en-us': 'Do not give in!',
        'es-mx': '¡No cedas!',
        'th': 'อย่ายอมแพ้!',
      }
    },
    hex: '#5AD0EE',
    background: 'linear-gradient(180deg, #AAF0FF -46.71%, #FFFFFF 78.26%)'
  },
  {
    id: 'correct-4',
    image: {
      wrong: trumpet,
      correct: tu,
    },
    message: {
      correct: {
        'en-us': 'Awesome!',
        'es-mx': '¡Impresionante!',
        'th': 'สุดยอด!',
      },
      wrong: {
        'en-us': 'Try again!',
        'es-mx': '¡Intentar otra vez!',
        'th': 'ลองอีกครั้ง!',
      }
    },
    hex: '#B43FA0',
    background: 'linear-gradient(180deg, #F4FFB0 -37.63%, #FFFFFF 78.26%)'
  },
]
export const QuestionPopup: FC<{ type: string }> = ({ type }) => {

  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'
  const [id, setId] = useState(0)

  useEffect(() => {
    setId(Math.floor(Math.random() * 100 % 4))
  }, [])

  return (
    type === 'BATTERY' ?
      <Box
        margin={1}
        sx={{
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <img src={fullBattery} />
      </Box>
      :
      <Box
        margin={1}
        sx={{
          background: images[id].background,
          borderRadius: 5,
          padding: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        {
          <>
            <Typography
              variant='h3'
              fontFamily={'Quicksand'}
              fontWeight='bold'
              sx={{
                textAlign: 'center',
                marginBottom: 2,
                textShadow: `
                ${strokeWidth * Math.cos(0)}px 0 0 ${images[id].hex},
                ${strokeWidth * Math.cos(Math.PI / 8)}px ${strokeWidth * Math.sin(Math.PI / 8)}px 0 ${images[id].hex},
                ${strokeWidth * Math.cos(Math.PI / 4)}px ${strokeWidth * Math.sin(Math.PI / 4)}px 0 ${images[id].hex},
                ${strokeWidth * Math.cos(Math.PI * 3 / 8)}px ${strokeWidth * Math.sin(Math.PI * 3 / 8)}px 0 ${images[id].hex}
                `
              }}
            >
              {type === 'CORRECT' && images[id].message.correct[language as keyof Object]}
              {type === 'WRONG' && images[id].message.wrong[language as keyof Object]}
            </Typography>
            {type === 'CORRECT' && <img src={images[id].image.correct} style={{ width: '60%' }} />}
            {type === 'WRONG' && <img src={images[id].image.wrong} style={{ width: '60%' }} />}
          </>
        }
      </Box>
  );
};

