import { FC, ReactNode } from 'react';
import { Paper } from '@mui/material';

export const FormContainer: FC<{ children: ReactNode, isMobile: boolean }> = ({ children, isMobile }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 700,
        padding: isMobile ? 2 : 10,
        borderRadius: 3
      }}
    >
      {children}
    </Paper>
  );
};
export default FormContainer;
