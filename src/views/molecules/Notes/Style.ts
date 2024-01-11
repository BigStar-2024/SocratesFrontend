import styled         from 'styled-components';
import { BasicColor}  from 'views/Color';
import { makeStyles } from '@mui/styles'
export const StudentListContainer = styled.div`
    padding-top: 30px;
    padding-left: 65px;
    padding-right: 65px;
    padding-bottom: 65px;
    background-color: ${BasicColor.brightLightBlue}
`;
export const StudentList = styled.div`
    max-height: 450px;
`;
export const StudentListHeader = styled.h2`

`;
export const StudentItem = styled.div`
    display: flex;
`;
export const useStyles = makeStyles({
  paper: {
    paddingTop      : '65px',
    paddingBottom   : '40px',
    paddingLeft     : '70px',
    paddingRight    : '70px',
    backgroundColor : 'white !important',
    borderColor     : BasicColor.green,
    borderWidth     : '2px',
    borderStyle     : 'solid',
  },
  studentPaper: {
    paddingTop      : '30px',
    paddingBottom   : '40px',
    paddingLeft     : '50px',
    paddingRight    : '50px',
    backgroundColor : 'white !important',
    borderColor     : BasicColor.green,
    borderWidth     : '2px',
    borderStyle     : 'solid',
    overflow        : 'scroll'
  },
});
