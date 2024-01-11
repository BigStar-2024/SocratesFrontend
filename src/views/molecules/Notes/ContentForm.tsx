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
import {useStyles} from './Style'
const AddNewStudent = (props: any) => {
    let language:string = useSelector((state: any) => state.user.language);
    language            = language? language : 'en-us'

    const { enqueueSnackbar } =  useSnackbar();
    const classes             =  useStyles();

    const [title, setTitle] = useState('');
    const [text, setText]   = useState('');
    const [date, setDate]   = useState<Date>();
    const [validateMsg, setValidateMsg] = useState<{[key: string]: any}>({
        title   : null,
        text    : null,
        date    : null,
    });

    useEffect(() => {
    },[])

    const handleSubmit = () => {
        if (!formValidation()) return;
        props.close();
    }

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
    const handleFormChange = (field: string, errMsg: string) => {
        setValidateMsg({...validateMsg, [field]: errMsg});
    }


    return (
        <Paper elevation={24} className={classes.paper}>
            <div >
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <TextField
                            label       = {dictionary[language]?.title}
                            onChange    = {(e: any) => {
                                handleFormChange('title', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                                setTitle(e.target.value)
                            }}
                            error       = {!!validateMsg.title}
                            helperText  = {validateMsg.title}
                            value       = {title}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label       = {dictionary[language]?.text}
                            onChange    = {(e: any) => {
                                handleFormChange('text', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                                setText(e.target.value)
                            }}
                            error       = {!!validateMsg.text}
                            helperText  = {validateMsg.text}
                            value       = {text}
                            maxRows     = {100}
                            height      = {250}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <DateTimePicker
                            value={date}
                            onChange={(e: any) => {
                                handleFormChange('date', e === null ? commonDictionary[language]?.fieldIsRequired : '');
                                // setDate(e.target.value);
                                setDate(e);
                                console.log(e)
                            }}
                        />
                        <div className='err-text'>{validateMsg.date}</div>
                    </Grid> */}
                    <Grid item xs={12} md={12} lg={12}>
                        <Button
                            value     = {dictionary[language]?.send}
                            bgColor   = {BasicColor.green}
                            onClick   = {handleSubmit}
                            align     = {'right'}
                            fullWidth = { true }
                        />
                    </Grid>
                </Grid>
            </div>
            </Paper>
    )
}

export default AddNewStudent
