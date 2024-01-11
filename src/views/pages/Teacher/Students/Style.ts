import styled           from 'styled-components';
import {ScreenSize}     from '../../../../constants/screenSize';
import { makeStyles }   from '@mui/styles'
import { BasicColor }   from 'views/Color'
export const TabContainer = styled.div`
    display         : flex;
    justify-content : center;
    align-items     : center;
    font-size       : 22px;
    text-decoration: underline;
`;

export const SelectedTab = styled.div`
    padding-left    : 20px;
    padding-right   : 20px;
    cursor          : pointer;
    color           : ${BasicColor.blue};
`;

export const Tab = styled.div`
    padding-left    : 20px;
    padding-right   : 20px;
    cursor          : pointer;
`
