import styled         from 'styled-components';
import {ScreenSize}   from '../../../../constants/screenSize';
import { makeStyles } from '@mui/styles'

export const SubjectCardContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export const TableContainer = styled.div`
    width: 100%;
    background: #E3E5E5;
`

export const AssignPanelContainer = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: center;
    padding: 3rem 1rem;
`;

export const StudentPanel = styled.div`
    border-radius: 1rem;
    background: white;
    padding: 1rem 1rem;
`;

export const AssignPanel = styled.div`
    border-radius: 1rem;
    background: white;
    padding: 1.5rem 2rem;
`;

export const StudentItemContainer = styled.div`
    display: flex;
    align-items: center;
`
