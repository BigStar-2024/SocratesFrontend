import { FC }              from 'react';
import styled              from 'styled-components';
import { BasicColor }      from 'views/Color';
import { UserProgressBar } from 'views/molecules/UserProgressBar';
import { Typography }      from 'views/atoms/Text/typography';
import { useSelector }     from 'react-redux';
import { dictionary }      from 'views/pages/Student/Menus/dictionary'
type UserProgressProps = {
  rank: number;
  level: number;
  icon: string;
  exp: number;
  expMax: number;
  progress: number;
  userName: string;
};

export const UserProgress: FC<UserProgressProps> = ({
  rank,
  level,
  exp,
  expMax,
  progress,
  userName,
}) => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  return (
    <UserProgressStyle>
      <RangeContainer color={BasicColor.greenSoft}>
        {dictionary[language]?.rank} <Range>#{rank}</Range>
      </RangeContainer>
      <RangeContainer color={BasicColor.blue}>
        {dictionary[language]?.level} <Range>{level}</Range>
      </RangeContainer>
      <Name color={BasicColor.black}>{userName}</Name>
      <ExpContainer>
        <Name color={BasicColor.greenSoft}>{exp}</Name>
        <Name color={BasicColor.black}>/{expMax}{dictionary[language]?.exp}</Name>
      </ExpContainer>
      <UserProgressBar progress={progress} />
    </UserProgressStyle>
  );
};

type RangeContainerProps = {
  color: BasicColor.greenSoft | BasicColor.blue;
};

type NameProps = {
  color: BasicColor.black | BasicColor.greenSoft;
};

const UserProgressStyle = styled.div`
  width: 186px;
  height: 69px;
  font-family: ${Typography.primary};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  grid-column-gap: 10px;
`;

const RangeContainer = styled.div<RangeContainerProps>`
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${p => p.color};
`;

const Range = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-left: 5px;
`;

const Name = styled.p<NameProps>`
  font-size: 12px;
  letter-spacing: 0.4px;
  font-weight: 600;
  margin: 0;
  color: ${p => p.color};
`;

const ExpContainer = styled.div`
  display: flex;
`;
