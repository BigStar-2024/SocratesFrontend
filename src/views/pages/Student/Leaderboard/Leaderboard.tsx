import { FC }           from 'react';
import { ScoreBoard }   from 'views/organisms/ScoreBoard';
import { StudentMenu }  from 'views/pages/Student/Menus/StudentMenu';
import { Wrapper }      from './Style';

export const Leaderboard: FC = () => {
  return (
    <Wrapper>
      <StudentMenu>
        <ScoreBoard />
      </StudentMenu>
    </Wrapper>
  );
};


