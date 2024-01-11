import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { makeStyles } from '@mui/styles'
import { BasicColor } from 'views/Color';

export const Container = styled.div`
    position: relative;
    display: flex;
    padding-bottom: 100px;
    margin-left:auto;
    margin-right: auto;
    @media screen and (max-width: 1100px) {
        flex-direction: column;
        // display:none
    }
`;

export const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 720px;
    // width: 37.5vw;
    background-color: ${BasicColor.veryLightCyanBlue};
    border-color: ${BasicColor.paleRed};
    border-width: 1px;
    border-style: solid;
    padding-left: 90px;
    padding-right: 90px;
    padding-top: 50px;
    padding-bottom: 50px;
    // @media screen and (max-width: ${ScreenSize.tablet}) {
    //     max-width: 720px;
    // }
    @media screen and (max-width: 1100px) {
        max-width: 540px;
    }
    @media screen and (max-width: ${ScreenSize.phone}) {
        width: 95vw;
        padding-left: 10px;
        padding-right: 10px;
    }
`

export const Title = styled.div`
    font-size: 32px;
    font-weight: 700;
`

export const OrderContainer = styled.div`
    max-width: 510px;
    display: flex;
    flex-direction: column;
    // width: 26.5vw;
    min-width: 400px;
    border-width: 1px;
    border-color: ${BasicColor.blue};
    border-style: solid;
    @media screen and (max-width: ${ScreenSize.tablet}) {
        max-width: 720px;
        // width: unset;
    }
    @media screen and (max-width: 1100px) {
        max-width: 720px;
        // display:none
    }
    @media screen and (max-width: ${ScreenSize.phone}) {
        min-width: unset;
    }
`
export const OrderTitleContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 460px;
`

export const OrderTitleLog = styled.img`
`

export const OrderTitle = styled.div`
    font-size: 32px;
    font-weight: 700;
    text-decoration: underline;
    line-height: 40px;
`

export const OrderBody = styled.div`
    background-color: ${BasicColor.blue};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`
export const OrderItem = styled.div`
    padding: 23px;
    display: flex;
    width: 330px;
    padding-left: 35px;
    padding-right: 35px;
    justify-content: space-between;
    @media screen and (max-width: ${ScreenSize.tablet}) {
        width: 100vw;
        padding-left: unset;
        padding-right: unset;
    }
`
export const OrderItemTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: ${ScreenSize.tablet}) {
       padding-left: 35px;
    }
`
export const OrderItemTitle = styled.div`
    color: white;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    display: flex;

`
export const OrderItemSubtitle = styled.div`
    color: white;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
`

export const OrderItemContent = styled.div`
    color: white;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: ${ScreenSize.tablet}) {
        padding-right: 35px;
     }
`
export const OrderTip = styled.div`
    font-weight: 400;
    font-size: 10px;
    line-height: 15px;
    color: white;
    padding: 10px;
    padding-left: 55px;
    padding-right: 55px;
    @media screen and (max-width: ${ScreenSize.tablet}) {
        padding-left: 10px;
        padding-right: 10px;
        align-self: start;
    }
`

export const Header = styled.div`
    width: 100%;
    background-color: ${props => props.color === 'Gold' ? BasicColor.yellow : props.color === 'Combo' ? BasicColor.aqua : BasicColor.greenSoft};
    height: 88px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    color: black;
    font-size: 24px;
`

export const PayPal = styled.img`
    @media screen and (max-width: ${ScreenSize.tablet}) {
        max-width: 19.7vw;
        width: unset;
    }
`

export const Apple = styled.img`
    padding-left: 30px;
    @media screen and (max-width: ${ScreenSize.tablet}) {
        max-width: 19.7vw;
        width: unset;
    }
`

export const CardType = styled.img`
    width: 180px;
`

export const CardContent = styled.div`
    width: 415px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: ${ScreenSize.tablet}) {
        flex-direction: column;
        width: unset;
    }

`

export const FlexRow = styled.div`
    display: flex;
    // alignItems: center;
    // flex-wrap: wrap;
`

export const useStyles = makeStyles({
    radio: {
        '& .MuiSvgIcon-root':{
            height: '30px',
            width: '30px',
          }
    },
    divider: {
        marginTop: '30px !important',
        marginBottom: '30px !important'
    },
    codeInput: {
        '&.MuiOutlinedInput-root': {
            height: '50px'
        },
        '& .MuiInputLabel-root': {
        },
        '& .Mui-focused': {
            color: 'black !important'
        }
    },
    select: {
        '&.MuiOutlinedInput-root' : {
          borderRadius: '25px',
          backgroundColor: BasicColor.white,
        },
        '& fieldset' : {
          borderColor: BasicColor.brightBlue,
          borderWidth: '2px'
        }
    },
  });
