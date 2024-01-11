import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { makeStyles } from '@mui/styles'
import { BasicColor } from 'views/Color';

export const Container = styled.div`
    position: relative;
    width: 384px;
    height: 420px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.color === 'Gold' ? BasicColor.paleOrange : BasicColor.ligntBlue};
    margin: 38px;
    @media screen and (max-width: ${'500px'}) {
        margin-left:10px;
        margin-right: 10px;
        max-width: 384px;
        // margin: unset;
    }
    @media screen and (max-width: ${ScreenSize.phone}) {
        margin-left:10px;
        margin-right: 10px;
        max-width: 100vw;
        // margin: unset;
    }
`;

export const TeacherContainer = styled.div`
    position: relative;
    width: 780px;
    height: 300px;
    display: flex;
    flex-direction: row;
    background-color: ${BasicColor.brightLightBlue};
    margin: 38px;
    @media screen and (max-width: ${'780px'}) {
        width: 100vw;
        height: unset;
    }
    @media screen and (max-width: ${'500px'}) {
        margin-left:10px;
        margin-right: 10px;
        max-width: 384px;
        // margin: unset;
    }
    @media screen and (max-width: ${ScreenSize.phone}) {
        margin-left:10px;
        margin-right: 10px;
        max-width: 100vw;
        // margin: unset;
    }
`;

export const Mask = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #dddddd;
    z-index: 10;
    opacity: 0.9;
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
export const TeacherHeader = styled.div`
    width: 250px;
    background-color: ${BasicColor.blue};
    height: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: black;
    font-size: 24px;
    @media screen and (max-width: ${ScreenSize.phone}) {
        display: none;
    }
`
export const Avatar = styled.img`
    padding-right:40px;
    padding-left:30px;
`

export const PriceContainer = styled.div`
    font-size: 40px;
    color: black;
    font-weight: 700;
    display: flex;
    align-items: end;
    padding-top: 10px;
`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const TeacherBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 30px;
`

export const TeacherBtnContainer = styled.div `
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    justify-content: space-around;
    width: 100%;
    @media screen and (max-width: ${'780px'}) {
        justify-content: left;
    }
`
export const Price = styled.div`
    font-size: 24px !important;
`

export const Plan = styled.div`
    font-size: 12px !important;
`

export const Subjects = styled.div`
    display: flex;
    flex-direction: column;
    padding-top:3px;
`

export const Subject = styled.div`
    padding-top:15px;
    display: flex;
`

export const SubjectIcon = styled.img`

`

export const Tip = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
    weight: 500;
    text-align: center;
`

export const SubjectTitle = styled.div`
    font-weight: 500;
    font-size: 16px;
    padding-left:16px;
    align-items: center;
    justify-content: center;
    display: flex;
`

export const useStyles = makeStyles({
});
