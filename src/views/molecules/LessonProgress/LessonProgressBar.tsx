import { FC, useEffect, useState }  from 'react';
import styled                       from 'styled-components';
import { BasicColor }               from 'views/Color';

type LessonProgressBarProps = {
  bgColor: string | null;
  finished?: boolean;
};

export const LessonProgressBar: FC<LessonProgressBarProps> = ({bgColor}) => {
  const [fullWidth, setFullWidth] = useState(false);

  useEffect(() => {
    if (bgColor) {
      setFullWidth(true);
    }
  }, [bgColor]);
  return (
    <Container>
      <StyledLessonProgressBar
        bgColor={bgColor}
        width={fullWidth ? '100%' : '0'}
      ></StyledLessonProgressBar>
    </Container>
  );
};

const StyledLessonProgressBar = styled.div<{
  bgColor: string | null;
  width: string;
}>`
  width: ${props => props.width};
  height: 100%;
  background-color: ${props => props.bgColor};
  transition: width 1000ms;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${BasicColor.gray80};
`;
