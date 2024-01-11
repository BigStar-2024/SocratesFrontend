import * as React from 'react';
import { FC, ReactChildren, ReactChild, forwardRef, RefObject, useImperativeHandle }       from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  editComponent?: 'Edit' | 'Select';
  selectDatas?: any;
  required?: boolean;
  format?: (value: any) => string;
}

interface MuiTableProps {
  columns: Column[];
  tableData: any;
  audiences?: Array<object>;
}
// const columns: readonly Column[] = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     required: true,
//     // format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     // format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     editComponent: 'Select',
//     selectDatas: ['123', '234'],
//     // format: (value: number) => value.toFixed(2),
//   },
// ];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];
const newDataState = -1;
const notEditingState = -2;
// const MuiTable: FC<MuiTableProps> = React.forwardRef<null,MuiTableProps>(({ rootProps, isLoading, data, children }, ref) => {
// const MuiTable: FC<MuiTableProps> = ({columns, tableData, audiences=[]}) => {
interface MuiTableFunc {
    getData(): any;
    handleAddData(): void;
}
const MuiTable = forwardRef<MuiTableFunc, any>((props: MuiTableProps, ref)=>{
// export default function MuiTable(props) {
  const {tableData, columns, audiences} = props;
  console.log("table data in table", tableData)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editingIndex, setEditingIndex] = React.useState(notEditingState);
  const [data, setData] = React.useState<any>(tableData);
  const [editingData, setEditingData] = React.useState<any>({});
  const [addData, setAddData] = React.useState<any>();
  // const [audiences, setAudiences] = React.useState<any>([]);

  React.useEffect(() => {
  }, [])

  React.useEffect(() => {
    setData(tableData)
  }, [tableData])

  useImperativeHandle(ref, () => ({
    getData() {
        const result = getData();
        return result;
    },
    handleAddData() {
      handleAddData()
    }
  }))
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setEditingIndex(notEditingState);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSave = (index: number) => {
    // const temp = JSON.parse(JSON.stringify(data));
    // temp[index] = editingData;
    // console.log("handle save", editingData, data, temp);
    // {columns.map((column) => {
    //   const value = (column.id in editingData) ? editingData[column.id] : '';
    // }
    // for(const key in columns) {
    //   const column
    //   if(column.id in editingData && )
    // }
    for(const column of columns) {
      if(column?.required === true && !(column.id in editingData && editingData[column.id])) return;
    }
    if(index === newDataState) data.push(editingData);
    else data[index] = editingData;
    setData(data);
    setEditingIndex(notEditingState);
  }

  const handleDelete = (index: number) => {
    data.splice(index, 1);
    setData([...data])
  }

  const handleChange = (index: number, key: string, value: any) => {
    editingData[key] = value;
    setEditingData( {...editingData} )
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingData(data[index]);
  }

  const handleAddData = () => {
    if(data.length > 40) return;
    setEditingIndex(newDataState);
    setEditingData({});
  }

  const getData = () => data;
  console.log("columns is ",columns)
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align={'right'}
                style={{ width: 145 }}>
                  Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editingIndex === newDataState &&
              <TableRow hover role="checkbox" tabIndex={-1}>
                {columns.map((column) => {
                  const value = (column.id in editingData) ? editingData[column.id] : '';
                  if(column.id === 'grade') {
                    column.selectDatas = editingData?.audience?.gradeSet;
                  }
                  if(column?.editComponent === 'Select')
                    return (
                      <TableCell key={column.id} align={column.align}>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 70 }}>
                        <Select
                          value={value}
                          onChange={(e) =>handleChange(newDataState, column.id, e.target.value)}
                        >
                          {column?.selectDatas && column.selectDatas.map((selectData: any, index: number) => (
                            <MenuItem value={selectData} key={index}>{selectData?.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      </TableCell>

                    );
                  else
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <TextField id="standard-basic"
                          variant="standard"
                          value={column.format ? column.format(value) : value}
                          onChange={(e) =>handleChange(newDataState, column.id, e.target.value)}
                        />
                      </TableCell>
                    );
                })}
                <TableCell align={'right'}  style={{ width: 145 }} >
                  <Button variant="text" onClick={() => handleSave(newDataState)}>Save</Button>
                  <Button variant="text" color="error" disabled={true}>Delete</Button>
                </TableCell>
              </TableRow>
            }
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => {
                if(index === editingIndex - (page * rowsPerPage))
                  return(
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = (column.id in editingData) ? editingData[column.id] : '';
                        if(column.id === 'grade') {
                          column.selectDatas = editingData?.audience?.gradeSet;
                        }
                        if(column?.editComponent === 'Select')
                          return (
                            <TableCell key={column.id} align={column.align}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 70 }}>
                              <Select
                                value={value}
                                onChange={(e) =>handleChange(page * rowsPerPage + index, column.id, e.target.value)}
                              >
                                {column?.selectDatas && column.selectDatas.map((selectData: any, index: number) => (
                                  <MenuItem value={selectData} key={index}>{selectData?.name}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            </TableCell>

                          );
                        else
                          return (
                            <TableCell key={column.id} align={column.align} style={{ width: 145 }} >
                              <TextField id="standard-basic"
                                variant="standard"
                                value={column.format ? column.format(value) : value}
                                onChange={(e) =>handleChange(page * rowsPerPage + index, column.id, e.target.value)}
                              />
                            </TableCell>
                          );
                      })}
                      <TableCell align={'right'}  style={{ width: 145 }} >
                        <Button variant="text" onClick={() => handleSave(page * rowsPerPage + index)}>Save</Button>
                        <Button variant="text" color="error" disabled={editingIndex > notEditingState}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  )
                else
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = (column.id in row) ? row[column.id] : '';
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align={'right'}  style={{ width: 145 }} >
                        <Button variant="text" onClick={() => handleEdit(page * rowsPerPage + index)} disabled={editingIndex > notEditingState}>Edit</Button>
                        <Button variant="text" color="error" disabled={editingIndex > notEditingState} onClick={() => handleDelete(page * rowsPerPage + index)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
})

export default MuiTable
