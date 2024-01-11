import { FC } from 'react';
import styled from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import {
  Box,
  Typography,
  useMediaQuery
} from '@mui/material';
type GreetProps = {
  header: string;
  logo: string;
  classroomIllustration: string;
  greetingIllustration: string;
};

export const Greet: FC<GreetProps> = ({
  header,
  logo,
  classroomIllustration,
  greetingIllustration,
}) => {
  const isTablet = useMediaQuery(`(max-width: ${ScreenSize.tablet})`)
  return (
    <div>
      <Typography
        variant='h4'
        sx={
          !isTablet ?
            { display: 'none' } :
            { margin: 5, textAlign: 'center', fontWeight: 'bold' }}>
        {header}
      </Typography>

      <Box sx={{
        display: isTablet ? 'none' : 'unset'
      }}>
        <Logo src={logo} alt="Learn with Socrates logo" />
        <ClassroomIlustration
          src={classroomIllustration}
          alt="Classroom Illustratoin"
        />
        <GreetingIlustration
          src={greetingIllustration}
          alt="Teach with student's illustration"
        />
      </Box>
    </div>
  );
};

const Logo = styled.img`
  @media (min-width: ${ScreenSize.tablet}) {
    width: 12rem;
    position: absolute;
    top: 2rem;
    left: 3rem;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    width: 15rem;
    position: absolute;
    top: 3rem;
    left: 8rem;
  }
`;

const ClassroomIlustration = styled.img`
  @media (min-width: ${ScreenSize.tablet}) {
    width: 55%;
    position: absolute;
    bottom: 2rem;
    left: 3rem;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    display: none;
  }
`;

const GreetingIlustration = styled.img`
  display: none;
  @media (min-width: ${ScreenSize.desktop}) {
    display: unset;
    width: 35%;
    position: absolute;
    bottom: 2rem;
    left: 8rem;
  }
`;
