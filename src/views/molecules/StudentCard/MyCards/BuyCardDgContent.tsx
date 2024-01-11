import { FC } from 'react';
import { BasicColor } from 'views/Color';
import { Button, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { TypoGeneralText } from 'views/atoms/Text';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: BasicColor.greenSoft,
      main: BasicColor.green,
      dark: BasicColor.greenShadow,
      contrastText: '#fff',
    }
  },
});

export const BuyCardDgContent: FC = () => {
  const history = useHistory();

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginBottom: 2 }}>
        {
          <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <TypoGeneralText>Not collected yet!</TypoGeneralText>
            <Button variant='contained' onClick={() => history.push('/collectibles/cards')}
              sx={{ width: 100, borderRadius: 5 }}
            >
              Buy!
            </Button>
          </div>
        }
      </Container>
    </ThemeProvider>
  );
};
