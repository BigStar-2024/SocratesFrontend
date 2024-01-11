import { FC, useContext } from 'react';
import { LoadingContext } from 'react-router-loading';
import { useParams } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

interface GameIframeParams {
  token: string
  gamePath: string
}

export const GameIframe: FC = () => {
  const { token, gamePath } = useParams<GameIframeParams>();
  const loadingContext = useContext(LoadingContext);
  const history = useHistory();

  return (
    <Box
      sx={{
        height: '100vh',
        width: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
      id='game-iframe-container'
    >
      <IconButton
        aria-label='close'
        color='secondary'
        size='large'
        sx={{ position: 'absolute', top: '5%', right: '10%', background: 'white' }}
        onClick={() => history.goBack()}
      >
        <CloseIcon />
      </IconButton>
      <iframe
        style={{
          width: '100%',
          height: '99%',
          border: 'none',
        }}
        onLoad={() => { loadingContext.done() }}
        src={process.env.REACT_APP_SERVER_URL + 'media/games/' + gamePath + '/gamePlay?token=' + token} />
    </Box>
  );
};
