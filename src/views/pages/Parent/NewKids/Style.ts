import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { makeStyles } from '@mui/styles'
import { BasicColor } from 'views/Color';
import Tooltip        from '@mui/material/Tooltip';

export const Title = styled.div`
  font-weight      : 700;
  font-size        : 40px;
  line-height      : 50px;
  padding-bottom   : 20px;
`

export const Tip = styled.div`
  font-weight      : 400;
  font-size        : 25px;
  line-height      : 30px;
  padding-bottom   : 30px;
`

export const Container = styled.div`
  padding-top      : 25px;
  padding-bottom   : 100px;
  z-index          : 10;
  align-self       : start;
`
export const Welcome = styled.div`
  position         : absolute;
  right            : 14.3vw;
  bottom           : 220px;
  width            : 34.8vw;
  // height: 397px;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    display: none
  }
`

export const Socrates = styled.img`
  position         : absolute;
  right            : 14.5vw;
  top              : 616px;
  width            : 239px;
  height           : 335px;
`

export const Subjects = styled.div`
    display          : flex;
    flex-direction   : column;
    background-color : ${props => props.color === 'Gold' ? BasicColor.paleOrange : props.color === 'Combo' ? BasicColor.ligntBlue : BasicColor.ligntBlue};
    border-color     : ${props => props.color === 'Gold' ? BasicColor.yellow : props.color === 'Combo' ? BasicColor.aqua : BasicColor.greenSoft};
    border-width     : 1px;
    border-style     : solid;
    padding          : 5px 30px 20px 30px;
`

export const Subject = styled.div`
    padding-top :15px;
    display     : flex;
`

export const SubjectIcon = styled.img`

`

export const SubjectTitle = styled.div`
    font-weight     : 500;
    font-size       : 16px;
    padding-left    : 16px;
    align-items     : center;
    justify-content : center;
    display         : flex;
`

export const PaperContainer = styled.div`
  margin-left : 18vw;
  width       : 37vw;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    margin-left: 0vw;
    width: 100vw;
  }
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
