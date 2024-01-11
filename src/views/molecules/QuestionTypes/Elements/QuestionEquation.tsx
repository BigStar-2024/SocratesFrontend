import { FC } from 'react';
import { Box } from '@mui/material';
import MathJax from 'react-mathjax';
import he from 'he'


interface QuestionBoxEquationPrtex {
  tex: string
}

export const QuestionEquation: FC<QuestionBoxEquationPrtex> = ({
  tex,
}) => {
  return (
    <Box sx={{ minWidth: 200, fontSize: 30, color: 'white' }}>
      <MathJax.Provider>
        <MathJax.Node
          formula={he.decode(tex)}
        />
      </MathJax.Provider>
    </Box>
  );
};
