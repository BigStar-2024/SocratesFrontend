import { FC, useEffect, useState } from 'react';
import styled                      from 'styled-components';
import {  BasicColor  }            from 'views/Color';
import { TopicProgress }           from 'views/molecules/TopicProgress';
import { ScreenSize }              from 'constants/screenSize';
import { dictionary }              from 'views/pages/Student/Progress/dictionary';
// import { getProgress }             from 'app/firebase';
import { useSelector }             from 'react-redux';

export const ReportProgress: FC = () => {

  // useEffect(() => {
  //   getProgress(setProgress);
  // }, []);

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  const lessonProps = [
    {
      title: dictionary[language].ela,
      color: BasicColor.red,
      progress: [
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
      ],
    },
    {
      title: dictionary[language].math,
      color: BasicColor.orange,
      progress: [
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
      ],
    },
    {
      title: dictionary[language].sight,
      color: BasicColor.yellow,
      progress: [
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
      ],
    },
    {
      title: dictionary[language].science,
      color: BasicColor.green,
      progress: [
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
      ],
    },
    {
      title: dictionary[language].health,
      color: BasicColor.aqua,
      progress: [
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        true,
      ],
    },
  ];
  const [progress, setProgress] = useState(lessonProps);


  return (
    <>
      <MyProgressStyle>
        {progress.map((item, i) => (
          <TopicProgress
            points={item.progress}
            maxPoints={10}
            title={item.title}
            color={item.color}
            key={i}
          />
        ))}
      </MyProgressStyle>
    </>
  );
};

const MyProgressStyle = styled.div`
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 35px 25px;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    height: 400px;
  }
`;
