import styled from 'styled-components';
import bg_left_img from 'views/assets/teacher_bg_left.svg'
import bg_right_img from 'views/assets/teacher_bg_right.svg'


export const TeacherPgWrapper = styled.div`
  background-image  : url(${bg_left_img}), url(${bg_right_img});
  background-repeat : no-repeat;
  background-position: left top, right bottom;
  height            : 100vh;
  height: fit-content;
`;


