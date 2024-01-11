import { useSelector }                from 'react-redux'
import { useState, useEffect }        from 'react'
import { Grid, FormControl, Select }  from '@mui/material';
import { dictionary }           from './dictionary'
import addClassroomImgMark      from 'views/assets/addClassroom.svg'
import ClassroomItemImg         from 'views/assets/classroom-item.svg'
import { CardDialog }           from 'views/molecules/StudentCard/MyCards/CardDialog';
import InputLabel               from '@mui/material/InputLabel';
import TextField                from 'views/molecules/MuiTextField';
import { getAudiencesWithGrades} from 'app/actions/audienceActions'
import { useSnackbar }           from 'notistack';
import MenuItem                  from '@mui/material/MenuItem';
import Button                    from 'views/molecules/MuiButton';
import {ButtonColor, BasicColor} from 'views/Color';
import commonDictionary          from 'constants/commonDictionary'
// import DateTimePicker            from 'react-datetime-picker';
import Paper                     from '@mui/material/Paper';
import Checkbox                  from '@mui/material/Checkbox';
import {
    useStyles,
    StudentItem,
    StudentListContainer,
    StudentListHeader,
    StudentList,
} from './Style'
import { database } from 'app/firebase';

const StudentLists = (props: any) => {
    let language:string = useSelector((state: any) => state.user.language);
    language            = language? language : 'en-us'

    const { enqueueSnackbar } =  useSnackbar();
    const classes             =  useStyles();

    const [validateMsg, setValidateMsg] = useState<{[key: string]: any}>({
        title   : null,
        text    : null,
        date    : null,
    });
    const [title, setTitle] = useState('');
    const [text, setText]   = useState('');
    const [date, setDate]   = useState<Date>();
    const [isAllSelected, setIsAllSelected] = useState(false);

    const setData = props.setData;
    const formValidation = () => {
        const validateMsgTemp = {...validateMsg};
        let valiResult        = true;
        for (const key in validateMsg) {
          if (validateMsg[key] === null) {
            validateMsgTemp[key] = commonDictionary[language]?.fieldIsRequired;
          }
          if (validateMsgTemp[key]) valiResult = false;
        }
        setValidateMsg(validateMsgTemp);
        return valiResult;
    };

    const handleSubmit = () => {
        if (!formValidation()) return;
        props.close();
    }

    const handleFormChange = (field: string, errMsg: string) => {
        setValidateMsg({...validateMsg, [field]: errMsg});
    }

    const handleAll = () => {
        const temp = [...props.data];
        temp.map((item: any, index: number) => {
            if(!isAllSelected) temp[index].isChecked = true;
            else temp[index].isChecked = false;
        })
        setData(temp);
        setIsAllSelected(true)
    }
    useEffect(() => {
    },[])
    return (
        <StudentListContainer>
        <Paper elevation={24} className={classes.studentPaper}>
            <StudentList >
               <StudentListHeader>Student Name</StudentListHeader>
               <StudentItem onClick={handleAll}>
                   <Checkbox value={isAllSelected}/>
                   All Students
               </StudentItem>
                {
                    props?.data?.map((student: any, index: number) => (
                        <StudentItem key={index}>
                        <Checkbox value={props?.data[index]?.isChecked}/>
                        {student?.name}
                        </StudentItem>
                    ))
                }
            </StudentList>
        </Paper>
        </StudentListContainer>
    )
}

export default StudentLists
