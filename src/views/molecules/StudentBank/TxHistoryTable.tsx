import { FC }           from 'react';
import * as React       from 'react';
import { ScreenSize }   from 'constants/screenSize';
import styled           from 'styled-components';
import Table            from '@mui/material/Table';
import TableBody        from '@mui/material/TableBody';
import TableCell        from '@mui/material/TableCell';
import TableContainer   from '@mui/material/TableContainer';
import TableHead        from '@mui/material/TableHead';
import TablePagination  from '@mui/material/TablePagination';
import TableRow         from '@mui/material/TableRow';
import PaidIcon         from '@mui/icons-material/Paid';
import { BasicColor }   from 'views/Color';
import { LSLabel }      from 'views/molecules/Setting/utils/Style';
import { dictionary }   from 'views/pages/Student/Bank/dictionary'
import { useDispatch, useSelector } from 'react-redux'

interface Column {
  id: 'updateTimestamp' | 'side' | 'amount';
  label: string;
  minWidth?: number;
  align?: string;
  format?: (value: number) => string;
}


// const txData = [
//   {
//     date: '2022-02-04',
//     type: 'Withdraw',
//     amount: '+5000',
//     interest: 10,
//     id: 1
//   },
//   {
//     date: '2022-02-04',
//     type: 'Withdraw',
//     amount: '-5000',
//     interest: 10,
//     id: 2
//   },
//   {
//     date: '2022-02-04',
//     type: 'Withdraw',
//     amount: '-5000',
//     interest: 10,
//     id: 3
//   },
//   {
//     date: '2022-02-04',
//     type: 'Withdraw',
//     amount: '-5000',
//     interest: 10,
//     id: 4
//   },
//   {
//     date: '2022-02-04',
//     type: 'Withdraw',
//     amount: '-5000',
//     interest: 10,
//     id: 5
//   },
//   {
//     date: '2022-02-04',
//     type: 'Withdraw',
//     amount: '-5000',
//     interest: 10,
//     id: 6
//   },
// ]
interface MovementProp {
  movement: []
}
export const TxHistoryTable: FC<MovementProp> = ({movement}) => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const columns: readonly Column[] = [
    { id: 'updateTimestamp', label: dictionary[language]?.date, minWidth: 60 },
    { id: 'side', label: dictionary[language]?.type, minWidth: 60 },
    {
      id: 'amount',
      label: `${dictionary[language]?.amount}($)`,
      align: 'right',
      minWidth: 60,
      format: (value: number) => value.toLocaleString('en-US'),
    },
    // {
    //   id: 'interest',
    //   label: 'Interest(%)',
    //   align: 'right',
    //   minWidth: 60,
    //   format: (value: number) => value.toLocaleString('en-US'),
    // },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (

    <StyledTxContainer >
      <div style={{display: 'flex', alignItems:'center'}}>
      <PaidIcon />
      <LSLabel fontSize={20}>{dictionary[language]?.latestTransactions}</LSLabel>
      </div>
      <StyledTableContainer >
        <Table >
          <TableHead>
            <TableRow sx={{
              '& .MuiTableRow-root': {
                backgroundColor: BasicColor.blue,
                color: 'white'
              }
            }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth, backgroundColor: BasicColor.blue, color: 'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {movement
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if(column.id === 'side'){
                        switch(value){
                          case 'R' :
                            value = dictionary[language]?.deposit;
                            break;
                          case 'L' :
                            value = dictionary[language]?.withdrawal;
                            break;
                          case 'I' :
                            value = dictionary[language]?.interest;
                          // default :
                          //   row[column.id] = "Interest";
                        }
                      }
                      if(column.id ==='updateTimestamp'){
                        let temp = new Date(value);
                        temp = new Date();
                        value = temp.toLocaleDateString('en-US')
                      }
                      return (
                        <TableCell key={column.id} align='center' sx={{ color: 'white' }}>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={movement.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '&.MuiTablePagination-root': {
            color: 'white',
            paddingBottom: 0,

            '@media screen and (max-width: 720px)' :{
              '& .MuiInputBase-root' : {
                margin: 0
              },
              '& .MuiTablePagination-selectLabel' :{
                display: 'none'
              }
            }
          },
        }}
      />
    </StyledTxContainer>
  );
}

const StyledTxContainer = styled.div`
  width: 450px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background: ${BasicColor.blue};
  color: white;
  padding: 30px 20px 30px 20px;
  paddingBottom: 2px;
  border-radius: 15px;
  margin-bottom: 3vh;
  @media screen and (max-width: ${ScreenSize.tablet}) {
    width: 85vw;
    margin-bottom: 1vh;
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

