import { useEffect, useState } from 'react';
import styled                  from 'styled-components';
import { LevelUp }             from 'views/atoms/Text/LevelUp';
import { BasicColor }          from 'views/Color';

type RushProps = {
  initialTime: number;
  handleFinish: () => void;
  children: any;
};

export const BlockRush = ({initialTime, handleFinish, children}: RushProps) => {
  const [time, setTime] = useState(initialTime);
  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        const x = setTime(time => {
          if (time - 1 === 0) {
            handleFinish();
            clearInterval(interval);
          }
          return time - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {children}
      <StyledClock>
        <LevelUp>{time}</LevelUp>
      </StyledClock>
    </div>
  );
};

const StyledClock = styled.div`
  background-color: ${BasicColor.gray80};
  width: 5rem;
  margin-left: 80%;
  border: 3px solid #000;
  border-radius: 15px;
`;
