import { useState, useEffect, FC }      from 'react';
import styled, { css }                  from 'styled-components';
import IconButton                       from '@mui/material/IconButton';
import ArrowBackIosNewIcon              from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon              from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon                  from '@mui/icons-material/CheckCircle';
import CircleIcon                       from '@mui/icons-material/Circle';
import { LSLabel }                      from 'views/molecules/Setting/utils/Style';

const Frame = styled.div`
  margin-bottom: 20px;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Day = styled.div<{
  isToday?: boolean,
  isSelected?: boolean,
}>`
  width: 12.7%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 2px;

  ${props =>
    props.isToday &&
    css`
      filter: invert(100%)
    `}

  ${props =>
    props.isSelected &&
    css`
      filter: invert(0.5)
    `}
`;

export const LSCalendarComponent: FC = () => {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;
  const nodays = [1,3,5,7,11, 22,29]

  return (
    <Frame>
      <Header>
        <IconButton aria-label="prev" onClick={() => setDate(new Date(year, month - 1, day))}>
          <ArrowBackIosNewIcon fontSize='inherit' sx={{ background: '#21B95C', borderRadius: 5, color: 'white' }} />
        </IconButton>
        <LSLabel>{MONTHS[month]} {year}</LSLabel>
        <IconButton aria-label="next" onClick={() => setDate(new Date(year, month + 1, day))}>
          <ArrowForwardIosIcon fontSize='inherit' sx={{ background: '#21B95C', borderRadius: 5, color: 'white' }} />
        </IconButton>
      </Header>
      <Body>
        {DAYS_OF_THE_WEEK.map(d => (
          <Day key={d}>
            <strong>{d}</strong>
          </Day>
        ))}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            return (
              <Day
                key={index}
                isToday={d === today.getDate()}
                isSelected={d === day}
                onClick={() => setDate(new Date(year, month, d))}
              >
                {/* {d > 0 ? d : ''} */}
                {
                  !nodays.includes(d) ? <CheckCircleIcon sx={{ color: '#21B95C' }} /> : <CircleIcon sx={{ color: '#1771B9' }} />
                }
              </Day>
            );
          })}
      </Body>
    </Frame>
  );
}
