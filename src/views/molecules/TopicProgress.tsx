import { FC }         from 'react';
import styled         from 'styled-components';
import { Lesson }     from 'views/atoms/Text/Lesson';
import { BasicColor } from 'views/Color';

type TopicProgressProps = {
  points: boolean[];
  maxPoints: number;
  title: string;
  color: string;
};
export const TopicProgress: FC<TopicProgressProps> = ({
  points,
  title,
  color,
  maxPoints,
}) => {
  const generateProgress = () => {
    const progressWeekOne = points.slice(0, 5);
    const progressWeekTwo = points.slice(5, 10);

    return {progressWeekOne, progressWeekTwo};
  };

  return (
    <>
      <TopicProgressContainer>
        <Lesson isDark={true}>{title}</Lesson>
        <TopicProgressStyle>
          <TopicPointsContainer>
            {generateProgress().progressWeekOne.map((item, i) => {
              return (
                <ProgressPoint
                  color={item ? color : BasicColor.gray80}
                  width={275 / maxPoints - 5}
                  key={i}
                />
              );
            })}
          </TopicPointsContainer>
          <TopicPointsContainer>
            {generateProgress().progressWeekTwo.map((item, i) => {
              return (
                <ProgressPoint
                  color={item ? color : BasicColor.gray80}
                  width={275 / maxPoints - 5}
                  key={i}
                />
              );
            })}
          </TopicPointsContainer>
        </TopicProgressStyle>
      </TopicProgressContainer>
    </>
  );
};

type PropgressPointProps = {
  color: string;
  width: number;
};

const TopicProgressContainer = styled.div`
  width: 100%;
  height: 84px;
  display: grid;
`;
const TopicProgressStyle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;
const TopicPointsContainer = styled.div`
  width: 100%;
  height: 36px;
  background-color: ${BasicColor.gray40};
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 5px;
`;
const ProgressPoint = styled.div<PropgressPointProps>`
  width: ${p => `${p.width}px`};
  height: 25px;
  background-color: ${p => p.color};
`;
