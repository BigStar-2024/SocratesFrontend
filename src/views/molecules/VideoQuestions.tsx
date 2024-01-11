import styled from 'styled-components';

type VideoProps = {
  source: string;
};

export const VideoQuestion = ({source}: VideoProps) => {
  return (
    <>
      <VideoStyles src={source} allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
    </>
  );
};

const VideoStyles = styled.iframe`
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;
