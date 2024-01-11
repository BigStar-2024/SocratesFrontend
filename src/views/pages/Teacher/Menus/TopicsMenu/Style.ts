import styled     from 'styled-components';
import background from 'views/assets/colored-shapes-bg.svg';

export const Wrapper = styled.div`
  background-image  : url(${background});
  background-repeat : no-repeat;
  background-size   : cover;
  height            : 100vh;
`;

export const TopicsMenuStyles = styled.div`
  width             : 100%;
  margin            : 20px auto;
`;
