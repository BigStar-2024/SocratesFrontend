import { FC }         from 'react';
import styled         from 'styled-components';
import { BasicColor } from 'views/Color';

type UserProgressBarProps = {
  progress: number;
};

export const UserProgressBar: FC<UserProgressBarProps> = ({progress}) => {
  return (
    <>
      <UserProgressBarStyle>
        <Progress progress={progress} />
      </UserProgressBarStyle>
    </>
  );
};

type ProgressProps = {
  progress: number;
};

const UserProgressBarStyle = styled.div`
  width: 186px;
  height: 12px;
  background-color: ${BasicColor.gray80};
  border-radius: 40px;
`;

const Progress = styled.div<ProgressProps>`
  width: ${p => p.progress}%;
  height: 12px;
  background-color: ${BasicColor.greenSoft};
  border-radius: 40px;
`;
