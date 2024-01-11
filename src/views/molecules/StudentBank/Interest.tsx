import { FC }         from 'react';
import { ScreenSize } from 'constants/screenSize';
import styled         from 'styled-components';
import Table          from '@mui/material/Table';
import TableBody      from '@mui/material/TableBody';
import TableCell      from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead      from '@mui/material/TableHead';
import TableRow       from '@mui/material/TableRow';
import { BasicColor } from 'views/Color';
import { LSLabel }    from 'views/molecules/Setting/utils/Style';
import { dictionary } from 'views/pages/Student/Bank/dictionary'
import { useDispatch, useSelector }    from 'react-redux';

interface Column {
  id: 'name' | 'requireCoin' | 'amount';
  label: string;
  minWidth?: number;
  align?: string;
  format?: (value: number) => string;
}

interface InterestProp {
  interests: []
}
export const Interest: FC<InterestProp> = ({interests}) => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  const columns: readonly Column[] = [
    { id: 'name', label: dictionary[language]?.savingsTitle, minWidth: 100 },
    { id: 'requireCoin', label: dictionary[language]?.value, minWidth: 70, format: (value: number) => value.toLocaleString('en-US'), },
    {
      id: 'amount',
      label: `${dictionary[language]?.interest}% \n (${dictionary[language]?.perWeek})`,
      align: 'right',
      minWidth: 60,
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];

  return (
    <StyledTxContainer >
      <LSLabel fontSize={20}>{dictionary[language]?.interest} {' & '} {dictionary[language]?.levels}</LSLabel>
      <StyledTableContainer >
        <Table >
          <TableHead>
            <TableRow sx={{
              '& .MuiTableRow-root': {
                backgroundColor: BasicColor.white,
                color: 'black',
                borderColor: 'black'
              }
            }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth,maxWidth: 90, backgroundColor: BasicColor.white, color: 'black' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {interests
              .map((row, idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align='center' sx={{ color: 'black' }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledTxContainer>
  );
}

const StyledTxContainer = styled.div`
  width: 450px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background: ${BasicColor.white};
  border-color: ${BasicColor.blue};
  color: black;
  padding: 30px 20px 30px 20px;
  paddingBottom: 2px;
  margin-bottom: 60px;
  border-radius: 15px;
  border-width: 1px;
  border-style: solid;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    width: 85vw;
    padding: 15px;
  }
  @media screen and (min-width: ${ScreenSize.tablet}) (max-width: ${ScreenSize.desktop}) {
    width: 45vw;
    margin-bottom: 1vh;
    padding: 15px;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  max-height: 440px;
  min-height: 330px;
`;
