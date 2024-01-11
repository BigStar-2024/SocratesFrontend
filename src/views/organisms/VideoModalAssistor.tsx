import { FC }            from 'react';
import styled            from 'styled-components';
import { Modal }         from 'views/atoms/Modal';
import { Typography }    from 'views/atoms/Text/typography';
import { BasicColor }    from 'views/Color';
import { VideoQuestion } from 'views/molecules/VideoQuestions';
import { ScreenSize }    from 'constants/screenSize';

type VideoModalProps = {
  onClick: () => void;
  source: string;
};
export const VideoModalAssistor: FC<VideoModalProps> = ({onClick, source}) => {
  return (
    <>
      <Modal>
        <ModalContainer>
          <VideoModalContainer>
            <ModalStyles>
              <CloseButton onClick={onClick}>X</CloseButton>
              <VideoQuestion source={source} />
            </ModalStyles>
          </VideoModalContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 210;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  background-color: ${BasicColor.background40};
`;
const ModalStyles = styled.div`
  width: 100%;
  height: 270px;
  margin: 0 auto;
  background-color: ${BasicColor.white};
  border-radius: 40px;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    height: 400px;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    height: 480px;
  }
`;
const VideoModalContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  position relative;
`;
const CloseButton = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  width: 30px;
  right: 10px;
  top: 10px;

  font-family: ${Typography.primary};
  border-radius: 10px;
  letter-spacing: 0.25px;
  cursor: pointer;
  background-color: ${BasicColor.red};
  z- @media screen and (min-width: ${ScreenSize.tablet}) {
    font-size: 35px;
    right: 15px;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
