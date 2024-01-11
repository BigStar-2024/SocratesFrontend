import styled         from 'styled-components';
import { makeStyles } from '@mui/styles'
import { BasicColor}  from 'views/Color';

export const LicenseHeader = styled.div`
  background-color: ${BasicColor.blue};
  color: ${BasicColor.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 33px;
  padding: 25px;
  border-radius: 10px 10px 0px 0px;
  @media screen and (max-width: 540px) {
    font-size: 1em;
    padding: 10px;
  }
`;

export const LicenseBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color:${BasicColor.gray20};
  height: 100%;
  border-radius: 0px 0px 10px 10px;
  padding: 35px;
  @media screen and (max-width: 540px) {
    font-size: 1em;
    padding: 3px;
  }
`;

