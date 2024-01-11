import styled         from 'styled-components';
import {ScreenSize}   from '../../../../constants/screenSize';
import { makeStyles } from '@mui/styles'

export const TableContainer = styled.div`
    width: 100%;
`;

export const Table = styled.table`
    margin-top: 3rem;
    border: 1px solid #13705F;
    border-spacing: 0;
    width: 100%;
    & thead {
        background: #22BAAF;
        & > th {
            padding: 11px 26px;
            border-right: 1px solid #13705F;
            border-bottom: 1px solid #13705F;
            &:last-child {
                border-right: none;
            }
        }
    }
    & tbody {
        tr {
            border-bottom: 1px solid #13705F;
            &:last-child {
                border-bottom: none;
            }
            td {
                padding: 11px 26px;
                border-right: 1px solid #13705F;
                &:last-child {
                    border-right: none;
                }
            }
        }
    }
`

export const Table2 = styled.table`
    width: 100%;
    border: 1px solid #13705F;
    border-top: none;
    border-spacing: 0;
    thead {
        border-top: none;
        & > th {
            padding: 11px 0px;
            border-top: none;
            border-right: 1px solid #13705F;
            border-bottom: 1px solid #13705F;
            
            &:last-child {
                border-right: none;
            }
        }
    }
    & tbody {
        tr {
            & > td {
                padding: 11px 0px;
                border-right: 1px solid #13705F;
                &:last-child {
                    border-right: none;
                }
            }
        }
    }
`;
