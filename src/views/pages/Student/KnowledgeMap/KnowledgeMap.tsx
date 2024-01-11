import { FC, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingContext } from 'react-router-loading';
import { useHistory } from 'react-router-dom';
import { StudentMenu } from 'views/pages/Student/Menus/StudentMenu';
import boat_sound from 'views/assets/audios/boat.mp3';
import boat from 'views/assets/islands/fillers/boat.svg';
import barrell from 'views/assets/islands/fillers/barril.svg';
import dragon from 'views/assets/islands/fillers/dragon.svg';
import isle from 'views/assets/islands/fillers/island.svg';
import rock from 'views/assets/islands/fillers/rock.svg';
import rock2 from 'views/assets/islands/fillers/rock-2.svg';
import boulder from 'views/assets/islands/fillers/rocxk.svg';
import { ScreenSize } from 'constants/screenSize';
import {
  Wrapper,
  Ocean,
  Filler,
} from './Styles';
import { Box, Typography, useMediaQuery } from '@mui/material';

const positions = [
  'end',
  'center',
  'start',
]

// REMEMBER: changed hex values
// #EC5858 -> #762C2C
// #F4C222 -> #D18316
// #22BAAF -> #115D57
// #26B824 -> #135C12
// #CC5B1D -> #662D0E
// #A685E2 -> #534271


export const KnowledgeMap: FC = () => {

  const isMobile = useMediaQuery(`(max-width: ${ScreenSize.tablet})`)
  const strokeWidth = isMobile ? 2 : 4

  const loadingContext = useContext(LoadingContext);
  const history = useHistory();
  const areasOfKnowledge: Array<any> = useSelector((state: any) => state.student.guardianstudentplan.subject);
  const [loadedImgNum, setLoadedImgNum] = useState(0)
  const [boatX, setBoatX] = useState(window.innerWidth / 2)
  const [boatY, setBoatY] = useState(window.innerHeight / 2)
  const fillers = [isle, rock, boulder, barrell, rock2]
  const [dragonNumber, setDragonNumber] = useState(0)
  const onImgLoad = () => {

    setLoadedImgNum(loadedImgNum + 1)
    if (loadedImgNum >= areasOfKnowledge.length - 1)
      loadingContext.done();

  }

  const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

  const animateBoat = (e: any, route: string) => {

    const audio = new Audio(boat_sound);
    audio.play();

    setBoatX(e.clientX)
    setBoatY(e.clientY + window.pageYOffset)

    setTimeout(() => {
      history.push(route);
    }, 3000);

  };

  useEffect(() => {
    const dragonNum = getRandomNumber(areasOfKnowledge.length);
    setDragonNumber(dragonNum)
  }, [])

  return (
    <Wrapper>
      <StudentMenu>
        <img src={boat}
          id='boat'
          style={{
            position: 'absolute',
            left: boatX - 100,
            top: boatY - 100,
            transition: 'top 2s, left 3s',
            height: isMobile ? 80 : 200,
            zIndex: 1
          }} />
        <Ocean >
          {areasOfKnowledge.map(
            (
              areaOfKnowledge: any,
              i
            ) => {
              return (
                <Box key={i}
                  sx={{
                    display: 'grid',
                    gridTemplateRows: '70% 30%',
                    placeItems: positions[i % 3],
                  }}
                >
                  <Box
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.1)'
                      },
                      position: 'relative',
                      height: isMobile ? 100 : 250,
                      width: isMobile ? 'auto' : '40vw',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    onClick={e => {
                      animateBoat(e, `/question/AI/${areaOfKnowledge.id}`);
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}media/${areaOfKnowledge.islandImage}`}
                      onLoad={onImgLoad}
                      onError={onImgLoad}
                      style={{
                        width: isMobile ? 150 : 400,
                        opacity: areaOfKnowledge.isActive ? 1 : 0.5
                      }}
                    />
                    <Typography
                      variant='h4'
                      sx={{
                        maxWidth: isMobile ? 100 : 200,
                        position: 'absolute',
                        top: '40%',
                        left: 0,
                        right: 0,
                        margin: 'auto',
                        fontFamily: 'Quicksand',
                        color: 'white',
                        fontWeight: '700',
                        textAlign: 'center',
                        fontSize: isMobile ? 12 : 30,
                        cursor: 'pointer',
                        textShadow: `
                          ${strokeWidth * Math.cos(0)}px 0 0 ${areaOfKnowledge.hexColor},
                          ${strokeWidth * Math.cos(Math.PI / 8)}px ${strokeWidth * Math.sin(Math.PI / 8)}px 0 ${areaOfKnowledge.hexColor},
                          ${strokeWidth * Math.cos(Math.PI / 4)}px ${strokeWidth * Math.sin(Math.PI / 4)}px 0 ${areaOfKnowledge.hexColor},
                          ${strokeWidth * Math.cos(Math.PI * 3 / 8)}px ${strokeWidth * Math.sin(Math.PI * 3 / 8)}px 0 ${areaOfKnowledge.hexColor}
                          `
                      }}>{areaOfKnowledge.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Filler src={i === dragonNumber ? dragon : fillers[getRandomNumber(20) % 5]} />
                  </Box>
                </Box>
              );
            }
          )}
        </Ocean>
      </StudentMenu>
    </Wrapper >
  );
};
