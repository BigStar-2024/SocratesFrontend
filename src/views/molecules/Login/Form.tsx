import { FC } from 'react';
import styled from 'styled-components';
import { Box, TextField } from '@mui/material';

type FormProps = {
  emailLabel: string;
  password: string;
  setUsername: (str: string) => void;
  setPassword: (str: string) => void;
};

export const Form: FC<FormProps> = ({
  emailLabel,
  password,
  setUsername,
  setPassword
}) => {
  return (
    <Box
      display='flex'
      gap={3}
      flexDirection= 'column'
      >
      <StyledTextField
        onChange={(e) => setUsername(e.target.value)}
        label={emailLabel}
        type='email'
      />
      <StyledTextField
        onChange={(e) => setPassword(e.target.value)}
        label={password}
        type='password'
      />
    </Box>
  );
};

const StyledTextField = styled(TextField)`
  width: 100%;
  border: none;

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiOutlinedInput-root  {
    border-radius: 10px;
  }
  & .MuiOutlinedInput-input  {
    border-radius: 10px;
    background: white;
  }
  & .MuiFormLabel-root {
    top: 5px;
  }
`;
