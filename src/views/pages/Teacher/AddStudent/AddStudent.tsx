import { FC, useEffect, useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { LoadingContext } from 'react-router-loading';
import { useSnackbar } from 'notistack';
import { TeacherPgContainer } from 'views/molecules/TeacherPgContainer/TeacherPgContainer';
import Table from 'views/molecules/MuiTable';
import { Column } from 'views/molecules/MuiTable';
import { dictionary } from './dictionary'
import Button from 'views/molecules/MuiButton';
import { BasicColor } from 'views/Color';
import { getAudiencesWithGrades } from 'app/actions/audienceActions'
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import Menu from 'views/pages/Teacher/Menus/TeacherMenu';
const data = [
  {
    name: 'arminssssssssssss s'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  }
]
interface MuiTableFunc {
  getData(): any;
  handleAddData(): void;
}
const AddStudent: FC = () => {

  const loadingContext = useContext(LoadingContext);
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state: any) => state.user);
  const guardian = useSelector((state: any) => state.guardian);
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : "en-us"
  const TableRef = useRef<MuiTableFunc>(null)

  const [audiences, setAudiences] = useState([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [tableData, setTableData] = useState<any>([])
  console.log("updated")
  // const columns: Column[] = [
  //   { id: 'name', label: dictionary[language]?.name, minWidth: 170 },
  //   { id: 'lastName', label: dictionary[language]?.lastName, minWidth: 100 },
  //   {
  //     id: 'username',
  //     label: dictionary[language]?.username,
  //     minWidth: 170,
  //     required: true,
  //   },
  //   {
  //     id: 'password',
  //     label: dictionary[language]?.password,
  //     minWidth: 170,
  //   },
  //   {
  //     id: 'audience',
  //     label: dictionary[language]?.audience,
  //     minWidth: 170,
  //     editComponent: 'Select',
  //     selectDatas: [{id:'123', name: 'id 123 name'}, {id:'1244', name: 'id 1244 name'}],
  //     format: (value: any) => value?.name,

  //   },
  //   {
  //     id: 'grade',
  //     label: dictionary[language]?.grade,
  //     minWidth: 170,
  //     editComponent: 'Select',
  //     selectDatas: [{id:'123', name: 'id 123 name'}, {id:'1244', name: 'id 1244 name'}],
  //     format: (value: any) => value?.name,
  //   },
  //   {
  //     id: 'language',
  //     label: dictionary[language]?.language,
  //     minWidth: 170,
  //     editComponent: 'Select',
  //     selectDatas: [{id:'123', name: 'id 123 name'}, {id:'1244', name: 'id 1244 name'}],
  //     format: (value: any) => value?.name,
  //   },
  // ];

  const sampleData = [
    {
      name: 'India',
      lastName: 'string',
      username: 'number',
      password: 'number',
      audience: { id: '123', name: 'id 123 name' },
      grade: { id: '123', name: 'id 123 name' },
      language: { id: '123', name: 'id 123 name' },
    }
  ]

  const [isOpenNewForm, setIsOpenNewForm] = useState(false);

  const onNew = () => {
    console.log("will open")
    setIsOpenNewForm(true)
  }

  const onClassroom = (classroom: any) => {

  }

  const setAudienceData = async () => {
    const result: any = await getAudiencesWithGrades(
      // user.token,
      // dispatch
    );
    if (!result.success) {
      enqueueSnackbar(result.msg, { variant: 'error' });
      return false;
    }

    console.log('audience data is', result.data)
    setAudiences(result.data);
    setColumns([
      { id: 'name', label: dictionary[language]?.name, minWidth: 50 },
      { id: 'lastName', label: dictionary[language]?.lastName, minWidth: 50 },
      {
        id: 'username',
        label: dictionary[language]?.username,
        minWidth: 50,
        required: true,
      },
      {
        id: 'password',
        label: dictionary[language]?.password,
        minWidth: 50,
      },
      {
        id: 'audience',
        label: dictionary[language]?.audience,
        minWidth: 50,
        editComponent: 'Select',
        selectDatas: result.data,
        format: (value: any) => value?.name,
      },
      {
        id: 'grade',
        label: dictionary[language]?.grade,
        minWidth: 50,
        editComponent: 'Select',
        selectDatas: [{ id: '123', name: 'id 123 name' }, { id: '1244', name: 'id 1244 name' }],
        format: (value: any) => value?.name,
      },
      {
        id: 'language',
        label: dictionary[language]?.language,
        minWidth: 50,
        editComponent: 'Select',
        selectDatas: [{ id: 'en-us', name: 'English' }, { id: 'th', name: 'Thai' }, { id: 'es-mx', name: 'Spanish' }],
        format: (value: any) => value?.name,
      },
    ]);
    return true;
  }

  useEffect(() => {

    if (window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();
    onPageInit();
  }, []);

  const onPageInit = async () => {
    await setAudienceData();
  }

  const handleNew = () => {
    TableRef?.current?.handleAddData();
  }

  const handleImportExcel = () => {
    document?.getElementById('file-input')?.click();
  }

  const handleSave = () => {
    console.log(TableRef?.current?.getData())
  }

  const handleChangeExcelFile = (e: any) => {
    const fileObj = e.target.files[0];
    console.log('handle excel')
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err: any, resp: any) => {
      if (err) {
        console.log(err);
      }
      else {
        if (resp.rows?.length < 1) return;
        const excelHeader: any = [];
        const excelData: any = [];
        for (let i = 0; i < resp.rows[0].length; i++) {
          const col = resp.rows[0][i]
          console.log({ col })
          const temp: any = {};
          for (const column of columns) {
            if (column?.label === col) {
              excelHeader.push(column?.id)
              break;
            }
          }
        }
        for (let i = 1; i < resp.rows.length; i++) {
          const rowData: any = {};
          for (let j = 0; j < resp.rows[i].length; j++) {
            if (!(excelHeader[j]) || !(resp.rows[i][j])) continue;
            rowData[excelHeader[j]] = resp.rows[i][j];
          }
          excelData.push(rowData);
        }
        console.log("data is ", excelData)
        setTableData(excelData)
        // this.setState({
        //   cols: resp.cols,
        //   rows: resp.rows
        // });
      }
    });
  }
  return (
    <TeacherPgContainer onlyLogoImgNav={true} title={dictionary[language]?.classroom}>
      <>
        <div style={{ width: '100%' }}>
          <Button
            bgColor={BasicColor.green}
            onClick={handleNew}
            align="right"
            value={dictionary[language]?.addNew}
            margin="20px"
          />
          <Button
            bgColor={BasicColor.orange}
            onClick={handleImportExcel}
            align="right"
            value={dictionary[language]?.importExcel}
            margin="20px"
          />
          <input id="file-input" type="file" name="name" style={{ display: "none" }} onChange={handleChangeExcelFile} />
        </div>
        <Table columns={columns} tableData={tableData} audiences={audiences} ref={TableRef}></Table>
        <Button
          bgColor={BasicColor.yellow}
          onClick={handleSave}
          align="right"
          value={dictionary[language]?.save}
          margin="20px"
        />
      </>
    </TeacherPgContainer>
  );
};
export default AddStudent
