import styled         from 'styled-components';
import { BasicColor}  from 'views/Color';
import { makeStyles } from '@mui/styles'

export const Container = styled.div`
  display       : flex;
  flex-wrap     : wrap;
`
export const ClassroomItem = styled.div`
  margin-left   : 30px;
  margin-right  : 30px;
  margin-top    : 40px;
  margin-bottom : 40px;
  display       : flex;
  flex-direction: column;
  align-items   : center;
  color         : ${ BasicColor.black };
  cursor        : pointer;
  width         : 70px;
`;

export const ClassroomMark = styled.img`
`;

export const ClassroomText = styled.div`
  text-align    : center;
`;

export const StudentItem = styled.div`
  position      : relative;
  margin-left   : 30px;
  margin-right  : 30px;
  margin-top    : 40px;
  margin-bottom : 40px;
  display       : flex;
  flex-direction: column;
  align-items   : center;
  color         : ${ BasicColor.black };
  cursor        : pointer;
  width         : 70px;
`;

export const StudentMark = styled.img`
`;

export const StudentText = styled.div`
  text-align    : center;
  position      : absolute;
  bottom        : 30px;
`;

export const GroupItem = styled.div`
  position      : relative;
  margin-left   : 30px;
  margin-right  : 30px;
  margin-top    : 40px;
  margin-bottom : 40px;
  display       : flex;
  flex-direction: column;
  align-items   : center;
  color         : ${ BasicColor.black };
  cursor        : pointer;
  width         : 150px;
`;

export const GroupMark = styled.img`
`;

export const GroupText = styled.div`
  text-align    : center;
`;

export const Formtitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`

export const FormLabel = styled.div`
  font-size: 24px;
  font-weight: 400;
`
export const useStyles = makeStyles({
  paper: {
    paddingTop      :      '40px',
    paddingBottom   :   '40px',
    paddingLeft     :     '70px',
    paddingRight    :    '70px',
    backgroundColor : 'white !important',
  },
  select: {
    '&.MuiOutlinedInput-root' : {
      borderRadius: '25px',
    },
    '& fieldset' : {
      borderColor: BasicColor.brightBlue,
      borderWidth: '2px'
    }
  },
  goldInput: {
    '&.MuiInputBase-root'  : {
      backgroundColor      : BasicColor.paleOrange,
      borderColor          : `${BasicColor.yellow}`
    },
    '&:hover,& fieldset' : {
      borderColor: `${BasicColor.yellow} !important`,
    }
  },
  comboInput: {
    '& .MuiInputBase-root'  : {
      backgroundColor       : BasicColor.ligntBlue,
      borderColor           : BasicColor.aqua
    },
    '&:hover,& fieldset'  : {
      borderColor         : `${BasicColor.aqua} !important`,
    }
  },
  soleInput: {
    '& .MuiInputBase-root'  : {
      backgroundColor       : BasicColor.ligntBlue,
      borderColor           : BasicColor.greenSoft
    },
    '&:hover,& fieldset'  : {
      borderColor         : `${BasicColor.greenSoft} !important`,
    },
  }
});
