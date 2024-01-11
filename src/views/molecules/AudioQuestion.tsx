import styled     from 'styled-components';
import { Title }  from 'views/atoms/Text/Title';

type AudioProps = {
  source: string;
};

export const AudioQuestion = ({source}: AudioProps) => {
  return (
    <div>
      <Title>What's the name of this song?</Title>
      <audio src={source} />
      <Audio controls id="beep">
        <source src={source} type="audio/mp3" />
        Your browser does not support the audio tag.
      </Audio>
    </div>
  );
};

const Audio = styled.audio`
  margin-top: 20%;
`;
