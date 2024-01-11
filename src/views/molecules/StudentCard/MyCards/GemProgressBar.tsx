import { FC, useState, useEffect } from 'react';
import styled                      from 'styled-components';
import ProgressBar                 from '@ramonak/react-progress-bar';
import { ScreenSize }              from 'constants/screenSize';
import { getDownUrlByFilename }    from 'app/firebase';
import { BasicColor }              from 'views/Color';

interface ProgressBarProps {
  totalCount: number;
  gainedCount: number;
  firebaseName: string | undefined
}

export const GemProgressBar: FC<ProgressBarProps> = ({
  totalCount,
  gainedCount,
  firebaseName,
}) => {
  const [imgurl, setImgurl] = useState('');

  const fetchFirebaseUrls = async () => {
    const link = await getDownUrlByFilename(
      'CategoriesBack',
      firebaseName ? 'back' + firebaseName + '.png' : ''
    );
    setImgurl(link?link:'');
  };

  useEffect(() => {
    fetchFirebaseUrls();
  }, [firebaseName]);
  return (
    <ProgressBarContainer>
      <div style={{width: '80%'}}>
        <StyledProgressLabel>
          {gainedCount}/{totalCount}
        </StyledProgressLabel>
        <div
          style={{
            border: 'solid 3px green',
            borderRadius: '50px',
            padding: '2px',
            margin: '5px',
            width: '100%',
          }}
        >
          <ProgressBar
            completed={gainedCount}
            width="100%"
            bgColor={BasicColor.green}
            baseBgColor={BasicColor.gray40}
            height="30px"
            maxCompleted={totalCount}
            isLabelVisible={false}
            animateOnRender={true}
          />
        </div>
      </div>
      {imgurl ? (
        <img src={imgurl} style={{width: '60px', margin: '5px'}} />
      ) : null}
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  padding: 1rem;
  margin: 1rem;
  position: relative;
  width: 40vw;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    flex-direction: column-reverse;
    width: 80%;
    align-items: center;
  }
`;

const StyledProgressLabel = styled.p`
  text-align: end;
  margin: 0;
  font-weight: 700;
  margin-right: 3vw;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    text-align: center;
    margin: 0;
  }
`;
