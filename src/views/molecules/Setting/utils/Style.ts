import styled                    from 'styled-components';
import Grid                      from '@mui/material/Grid';
import { Box, InputBase, Paper } from '@mui/material';
import { BasicColor }            from 'views/Color';
import {Typography}              from 'views/atoms/Text/typography';
import FormControl               from '@mui/material/FormControl';
import {
  DialogContent,
  DialogContentText,
  Radio,
  FormControlLabel,
} from '@mui/material';

import titleBg from 'views/assets/title-kids-background.png';
import { ScreenSize } from 'constants/screenSize';

/*--------------------------------------------------------------------------------------------*/
/*                                         Dialog                                             */
/*--------------------------------------------------------------------------------------------*/
export const LSDialogContent = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 0 40px 0 40px;
    @media screen and (max-width: 540px) {
      padding: 5px;
    }
  }
`;
export const LSDialogContentText = styled(DialogContentText)`
  &.MuiDialogContentText-root {
    padding: 20px;
    font-family: ${Typography.primary};
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0px;
    text-align: left;
  }
`;

/*--------------------------------------------------------------------------------------------*/
/*                                          Form                                              */
/*--------------------------------------------------------------------------------------------*/
export const LSFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    padding: 0 20px 10px 25px;
  }
`;

interface InputBaseProps {
  border?: string;
  border_radius?: number;
  mt?: number;
  pl?: number;
}
export const LSInputBase = styled(InputBase)<InputBaseProps>`
  font-family: ${Typography.primary};
  border: solid 2px cornflowerblue;
  border-radius: ${props => props.border_radius || 0}px;
  margin-top: ${props => props.mt || 0}px;
  padding-left: ${props => props.pl || 0}px;
  text-align: left;
`;
export const LSRadio = styled(Radio)`
  & .MuiSvgIcon-root {
    font-size: 30px;
  }
  &.MuiRadio-root {
    color: ${BasicColor.green};
  }
`;
export const LSFormControlLabel = styled(FormControlLabel)`
  & .MuiTypography-root {
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0px;
    text-align: left;
    @media screen and (max-width: ${ScreenSize.phone}) {
      font-size: 12px;
    }
  }
`;
export const LSButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0px 20px 0px;
  @media screen and (max-width: 540px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

/*--------------------------------------------------------------------------------------------*/
/*                                           GRID                                             */
/*--------------------------------------------------------------------------------------------*/
export const LSGridRow = styled(Grid)`
  display: flex;
  justify-content: center;
  padding: 5px 7px 0px 15px;
  align-items: center;
  margin-top: 8px;
  @media screen and (max-width: 540px) {
    padding: 2px;
  }
`;
export const LSShadowContainer = styled(Box)<{
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;
}>`
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};
  flex-direction: ${props => props.flexDirection};
  box-shadow: 0px 2px 10px 0px #00000040;
  border-radius: 10px;
  background-color: white;
  font-family: ${Typography.primary};
  margin: 16px;
  padding: 20px 32px 20px 32px;
  ${props => (props.width ? 'width:' + props.width + 'px;' : '')}
  ${props => (props.height ? 'height:' + props.height + 'px;' : '')}
  ${props => (props.left ? 'left:' + props.left + 'px;' : '')}
  ${props => (props.top ? 'top:' + props.top + 'px;' : '')}
  display: ${props => props.display};
  @media screen and (max-width: 540px) {
    padding: 10px 22px 10px 22px;
  }
`;
export const LSTitle = styled.p<{
  fontSize?: number;
  mt?: number;
  mb?: number;
  ml?: number;
}>`
  font-family: ${Typography.primary};
  font-size: 1.3em;
  margin-top: ${props => props.mt || 5}px;
  margin-bottom: ${props => props.mb || 5}px;
  margin-left: ${props => props.ml || 5}px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0.25px;
  text-align: left;
  @media screen and (max-width: 540px) {
    font-size: 1.3em;
  }
`;
export const Title = styled.div`
  line-height: 50px;
  color: white;
  width: 385px;
  height: 81px;
  background: url(${titleBg}) no-repeat center;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4vh;
  @media screen and (max-width: 540px) {
    width: 60%;
    margin-top: 10px;
    margin-bottom: 0;
  }
`;
export const TextGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/*--------------------------------------------------------------------------------------------*/
/*                                           Upgrade                                          */
/*--------------------------------------------------------------------------------------------*/
export const LSPaperMoney = styled(Paper)`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: solid 2px cornflowerblue;
  &.MuiPaper-root {
    border-radius: 20px;
  }
`;

/*--------------------------------------------------------------------------------------------*/
/*                                           TEXT                                             */
/*--------------------------------------------------------------------------------------------*/
export const LSLabel = styled.p<{
  fontSize?: number;
  color?: string;
  mt?: number;
  mb?: number;
  ml?: number;
  textAlign?: string;
  margin?: number;
}>`
  font-family: ${Typography.primary};
  font-size: ${props => (props.fontSize ? props.fontSize + 'px;' : '15px;')}
  margin: ${props =>
    props.margin === 0 || props.margin ? props.margin + 'px;' : '0px;'}
  margin-top: ${props =>
    props.mt === 0 || props.mt ? props.mt + 'px;' : '5px;'}
  margin-bottom: ${props =>
    props.mb === 0 || props.mb ? props.mb + 'px;' : '5px;'}
  margin-left: ${props =>
    props.ml === 0 || props.ml ? props.ml + 'px;' : '5px;'}
  color: ${props => props.color};
  font-style: normal;
  text-align: ${props => props.textAlign?props.textAlign + ';':'left;'}
  font-weight: 700;
  letter-spacing: 0.75px;
`;

export const LSText = styled.p<{
  fontSize?: number;
  fontStyle?: string;
  fontWeight?: number;
  textAlign?: string;
  margin?: number;
  mt?: number;
  mb?: number;
  pl?: number;
  ml?: number;
}>`
  font-family: ${Typography.primary};
  font-size: ${props => (props.fontSize ? props.fontSize + 'px;' : '15px;')}
  margin: ${props =>
    props.margin === 0 || props.margin ? props.margin + 'px;' : '0px;'}
  margin-top: ${props =>
    props.mt === 0 || props.mt ? props.mt + 'px;' : ''}
  margin-bottom: ${props =>
    props.mb === 0 || props.mb ? props.mb + 'px;' : ''}
  margin-left: ${props =>
    props.ml === 0 || props.ml ? props.ml + 'px;' : ''}
  padding-left: ${props =>
    props.pl === 0 || props.pl ? props.pl + 'px;' : ''}
  font-weight: ${props => props.fontWeight + ';' || '500;'}
  text-align: ${props => props.textAlign?props.textAlign + ';':'left;'}
  letter-spacing: 1px;
  @media screen and (max-width: 540px) {
    font-size: 0.8em;
  }
`;
