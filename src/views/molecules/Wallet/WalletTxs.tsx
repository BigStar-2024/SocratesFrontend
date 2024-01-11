import { FC } from 'react';
import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { BasicColor } from 'views/Color';
import useSWR from 'swr'
import { doFetchWalletTransactions } from 'app/actions';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery'
import { ScreenSize } from 'constants/screenSize';

interface Column {
  id: string
  label: string
  width?: number
  align?: string
  format?: (value: number) => string
}



const columns: readonly Column[] = [
  { id: 'date', label: 'Date', width: 100 },
  { id: 'description', label: 'Description', width: 200 },
  { id: 'side', label: 'Type', width: 100 },
  { id: 'comment', label: 'Comment', width: 200 },
  {
    id: 'amount',
    label: 'Amount',
    align: 'right',
    width: 100
  },
];

export const WalletTxHistory: FC = () => {
  const isMobile = useMediaQuery(`(max-width: ${ScreenSize.phone})`)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const student = useSelector((state: any) => state.student);
  const user = useSelector((state: any) => state.user);

  // introduce SWR, no need useEffect to fetch data.
  const { data, error } = useSWR([student.id, user.token], doFetchWalletTransactions)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (error) return <Typography variant='caption'>Failed to fetch</Typography>
  if (!data) return <Typography variant='caption'>Loading...</Typography>
  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, minHeight: 340 }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{
                    width: isMobile ? 'auto' : column.width,
                    backgroundColor: BasicColor.green,
                    color: 'white',
                    fontSize: 18
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value: any = row[column.id as keyof Object];
                        return (
                          <TableCell key={column.id} align='center' >
                            {column.id === 'side' ?
                              value === 'R' ? 'Deposit' : 'Widthraw'
                              : value
                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            }

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '&.MuiTablePagination-root': {
            paddingBottom: 0
          }
        }}
      />
    </Paper>
  );
}
