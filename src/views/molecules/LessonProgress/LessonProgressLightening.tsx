import { FC, useEffect, useState } from 'react';
import styled, {keyframes, css }   from 'styled-components';
import lightening                  from 'views/assets/lightning.svg';
import { bounceInLeft }            from 'react-animations';
import { zoomIn }                  from 'react-animations';
import { ScreenSize }              from 'constants/screenSize';
import { TypoGeneralText }         from 'views/atoms/Text';
import { LESSON_PROGRESS_BAR_HEIGHT,
LESSON_PROGRESS_BAR_MOBILE_HEIGHT } from 'constants/common';
interface LighteningProps {
  combocount: number;
}
export const LessonProgressLightening: FC<LighteningProps> = ({combocount}) => {
  const [animate, setAnimate] = useState(false);

  const triggerAnimation = () => {
    setAnimate(!animate);
  };
  useEffect(() => {
    if (combocount) triggerAnimation();
  }, [combocount]);
  return (
    <Energy>
      <Combocount animate={animate} className="count">
        <Combocount animate={!animate} >
          <TypoGeneralText style={{color: 'white'}}>+{combocount}</TypoGeneralText>
        </Combocount>
      </Combocount>
      <Wobble animate={animate}>
        <Wobble animate={!animate}>
          <Img src={lightening} alt={'lightening'} />
        </Wobble>
      </Wobble>
    </Energy>
  );
};

const Energy = styled.div`
  display: flex;
  .count {
    align-self: center;
  }
  @media screen and (max-width: ${ScreenSize.phone}) {
  }
`;

const Img = styled.img`
  height: ${LESSON_PROGRESS_BAR_HEIGHT}px;
  @media screen and (max-width: ${ScreenSize.phone}) {
    height: ${LESSON_PROGRESS_BAR_MOBILE_HEIGHT}px;
  }
`

const Wobble = styled.div<{
  animate: boolean;
}>`
  ${props =>
    props.animate
      ? css`
          animation: 0.5s ${keyframes`${bounceInLeft}`};
        `
      : null}
`;

const Combocount = styled.div<{
  animate: boolean;
}>`
  ${props =>
    props.animate
      ? css`
          animation: 0.5s ${keyframes`${zoomIn}`};
        `
      : null}
`;
