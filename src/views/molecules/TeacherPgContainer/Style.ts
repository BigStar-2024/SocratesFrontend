import styled               from 'styled-components';
import teacher_title_bar_img          from 'views/assets/teacherTitleBar.svg'

export const TeacherTitleBar = styled.div`
    display     : flex;
    width       : 385px;
    height      : 81px;
    margin-left : 266px;
    margin-top  : 54px;
    font-size   : 40px;
    color       : white;
    background  : url(${teacher_title_bar_img}), #FFFFFF;
    align-items     : center;
    justify-content : center;
`;
