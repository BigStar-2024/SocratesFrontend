import { useEffect }   from 'react';
import styled          from 'styled-components';
import { ScreenSize }  from 'constants/screenSize';
import { Header }      from 'views/atoms/Text/Header';
import { Title }       from 'views/atoms/Text/Title';
import titleBackground from 'views/assets/title-games-background.png';

export const ScoreBoard = () => {
  const mockData = [
    {
      avatar: '',
      player: 'Juanpa',
      time: 60,
      score: 420,
    },
    {
      avatar: '',
      player: 'Albert',
      time: 60,
      score: 320,
    },
    {
      avatar: '',
      player: 'Tony',
      time: 60,
      score: 240,
    },
    {
      avatar: '',
      player: 'Emily',
      time: 60,
      score: 220,
    },
    {
      avatar: '',
      player: 'Viri',
      time: 60,
      score: 120,
    },
    {
      avatar: '',
      player: 'Juanpa',
      time: 60,
      score: 420,
    },
  ];
  return (
    <>
      <GamesTitle>
        <Title>Test</Title>
      </GamesTitle>
      <BlackBoard>
        <RecordHeaders />
        <StudentRecord data={mockData} />
      </BlackBoard>
    </>
  );
};

type ScoreRecord = {
  avatar: string;
  player: string;
  time: number;
  score: number;
};

const StudentRecord = ({data}: any) => {
  useEffect(() => {
  });
  return (
    <>
      {data.map((elem: ScoreRecord, i: number) => {
        return (
          <Record>
            <Header>{++i}</Header>
            <Header>{elem.avatar}</Header>
            <Header>{elem.player}</Header>
            <Header>{elem.time}</Header>
            <Header>{elem.score}</Header>
          </Record>
        );
      })}
    </>
  );
};

const RecordHeaders = () => {
  return (
    <Record>
      <Header>Position</Header>
      <Header>Avatar</Header>
      <Header>Name</Header>
      <Header>Time</Header>
      <Header>Score</Header>
    </Record>
  );
};

const BlackBoard = styled.div`
  background-color: #13705f;
  border: 7px solid #5c2100;
  border-radius: 16px;
  margin: 1rem;
  padding-top: 2rem;
  display: grid;
  grid-template-rows: auto auto;
  @media (min-width: ${ScreenSize.tablet}) {
    margin: 1rem;
    margin-top: 5rem;
    margin-bottom: 7rem;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    margin: 1rem;
  }
`;

const Record = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

export const GamesTitle = styled.div`
  width: 50%;
  margin: auto;
  max-width: 300px;
  text-align: center;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background: url(${titleBackground}) center no-repeat;
  background-size: contain;
  margin-bottom: 20px;
`;
