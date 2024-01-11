import { FC }                   from 'react';
import styled                   from 'styled-components';
import {GeneralText}            from 'views/atoms/Text/GeneralText';
import {IconSize}               from 'views/atoms/Icon/Size';
import {Icon}                   from 'views/atoms/Icon/Icon';
import finishLesson             from 'views/assets/finish-lesson.svg';
import energyIcon               from 'views/assets/lightning.svg';
import Button                   from 'views/molecules/MuiButton';
import {ScreenSize}             from 'constants/screenSize';
import {BasicColor, ButtonColor}    from '../Color';
import { useDispatch, useSelector } from 'react-redux';
import { dictionary } from 'views/pages/Student/Question/dictionary'
type FinishLessonProps = {
  tokens: number;
  energy: number;
  loading: boolean;
  onNextLesson: (e:any) => void;
};

export const FinishLesson: FC<FinishLessonProps> = ({tokens, energy, loading, onNextLesson}) => {

  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : 'en-us'

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <FinishLessonStyle>
        <GeneralText isDark={true}>{dictionary[language]?.youFinishedYourLessons}</GeneralText>
        <FinishLessonImage src={finishLesson} />
        <FinishLessonTextContainer>
          <GeneralText isDark={true}>{dictionary[language]?.lessonComplete}</GeneralText>
          <GeneralText>
            <GreenText>+{tokens} {dictionary[language]?.coins}</GreenText>
          </GeneralText>
        </FinishLessonTextContainer>
        <FinishLessonTextContainer>
          <GeneralText isDark={true}>{dictionary[language]?.bonus}</GeneralText>
          <GeneralText>
            <GreenText>+{energy}</GreenText>
          </GeneralText>
          <Icon image={energyIcon} size={IconSize.small} />
          <GeneralText>
            <GreenText>{dictionary[language]?.ofEnergy}</GreenText>
          </GeneralText>
        </FinishLessonTextContainer>
        <FinishLessonButtonContainer>
          <Button
            onClick={onNextLesson}
            value={dictionary[language]?.nextLesson}
            loading={loading}
            bgColor={ButtonColor.next}
            fullWidth={true}
          />
        </FinishLessonButtonContainer>
      </FinishLessonStyle>
    </div>
  );
};

const FinishLessonStyle = styled.div`

  border-radius: 75px;
  box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.25);
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  background-color: ${BasicColor.white};
  @media screen and (max-width: ${ScreenSize.phone}) {
    width: 100%;
    border-radius: 0;

  }
`;
const FinishLessonImage = styled.img`
  width: 190px;
  margin: 10px 0;
`;
const GreenText = styled.div`
  color: ${BasicColor.greenSoft};
  margin-left: 3px;
`;
const FinishLessonTextContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;
const FinishLessonButtonContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;
