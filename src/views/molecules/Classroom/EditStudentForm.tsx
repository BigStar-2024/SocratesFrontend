import { useSelector }                from 'react-redux'
import { useState, useEffect }             from 'react'
import { Grid, FormControl, Select }                 from '@mui/material';
import { dictionary }           from './dictionary'
import addClassroomImgMark      from 'views/assets/addClassroom.svg'
import ClassroomItemImg         from 'views/assets/classroom-item.svg'
import {
    Container,
    useStyles,
    ClassroomItem,
    ClassroomMark,
    ClassroomText }             from './Style'
import { CardDialog } from 'views/molecules/StudentCard/MyCards/CardDialog';
import InputLabel                   from '@mui/material/InputLabel';
import TextField                    from 'views/molecules/MuiTextField';
import { getAudiencesWithGrades} from 'app/actions/audienceActions'
import { useSnackbar }           from 'notistack';
import MenuItem                  from '@mui/material/MenuItem';
import Button                    from 'views/molecules/MuiButton';
import {ButtonColor, BasicColor} from 'views/Color';
import commonDictionary          from 'constants/commonDictionary'

const AddNewStudent = (props: any) => {
    let language:string = useSelector((state: any) => state.user.language);
    language            = language? language : 'en-us'

    const { enqueueSnackbar } =  useSnackbar();
    const classes =              useStyles();

    const [audiences, setAudiences] = useState([]);
    const [audience, setAudience] = useState();
    const [grades, setGrades] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [lastName, setLastName] = useState('');
    const [classroom, setClassroom] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validateMsg, setValidateMsg] = useState<{[key: string]: any}>({
        name        : null,
        grade       : null,
        lastName    : null,
        classroom   : null,
        username    : null,
        password    : null,
    });

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

    const setAudienceData = async () => {
        const result:any = await getAudiencesWithGrades(
          // user.token,
          // dispatch
        );
        if(!result.success) {
          enqueueSnackbar(result.msg, { variant: 'error' });
          return false;
        }
        setAudiences(result.data);
        return true;
    }

    const handleSubmit = () => {
        if (!formValidation()) return;
        props.close();
    }

    const handleRemove = () => {

    }

    const handleViewReport = () => {

    }

    const handleAddToGroup = () => {

    }

    const handleFormChange = (field: string, errMsg: string) => {
        setValidateMsg({...validateMsg, [field]: errMsg});
    }

    useEffect(() => {
        setAudienceData();
    },[])
    return (
      <Container>
          <CardDialog
                isOpen        = {props.isOpen}
                open          = {props.close}
                title         = {dictionary[language]?.newClassroom}
                dialogContent = {
                    <div >
                        <Grid container spacing={4}>
                            <Grid item xs={4}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Button
                                        value       = {dictionary[language]?.viewProgressReport}
                                        bgColor     = {BasicColor.white}
                                        color       = {BasicColor.blue}
                                        borderColor = {BasicColor.blue}
                                        onClick     = {handleViewReport}
                                        align       = {'right'}
                                        fullWidth   = { true }
                                        borderWidth = {1}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={4}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label       = {dictionary[language]?.name}
                                            onChange    = {(e: any) => {
                                                handleFormChange('name', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                                                setName(e.target.value)
                                            }}
                                            error       = {!!validateMsg.name}
                                            helperText  = {validateMsg.name}
                                            value       = {name}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label       = {dictionary[language]?.lastName}
                                            onChange    = {(e: any) => {
                                                handleFormChange('lastName', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                                                setLastName(e.target.value)
                                            }}
                                            error       = {!!validateMsg.lastName}
                                            helperText  = {validateMsg.lastName}
                                            value       = {lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label       = {dictionary[language]?.username}
                                            onChange    = {(e: any) => {
                                                handleFormChange('username', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                                                setUsername(e.target.value)
                                            }}
                                            error       = {!!validateMsg.username}
                                            helperText  = {validateMsg.username}
                                            value       = {username}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label       = {dictionary[language]?.password}
                                            onChange    = {(e: any) => {
                                                handleFormChange('password', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                                                setPassword(e.target.value)
                                            }}
                                            error       = {!!validateMsg.password}
                                            helperText  = {validateMsg.password}
                                            value       = {password}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                        <InputLabel id='select-grade-label'>
                                            {dictionary[language]?.grade}
                                        </InputLabel>
                                        <Select
                                            labelId  ='select-grade-label'
                                            id       = 'select-grade'
                                            value    = {grade ? grade : {}}
                                            label    = {dictionary[language]?.grade}
                                            className= {`${classes.select} err-border`}
                                            onChange = {(e: any) => {
                                                setGrade(e.target.value);
                                                validateMsg.grade = '';
                                                setValidateMsg({ ...validateMsg });
                                            }}
                                            sx={
                                                validateMsg.grade? {
                                                    '& fieldset': {
                                                        borderColor: `${BasicColor.red} !important`,
                                                    },
                                                } : {}
                                            }
                                            displayEmpty={true}
                                        >
                                            {grades?.length > 0 && grades.map((value: any, index: number) => (
                                            <MenuItem value={value} key={index}>
                                                {value.name}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                        <div className='err-text'>{validateMsg.grade}</div>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                        <InputLabel id='select-classroom-label'>
                                            {dictionary[language]?.classroom}
                                        </InputLabel>
                                        <Select
                                            labelId  ='select-classroom-label'
                                            id       = 'select-classroom'
                                            value    = {classroom ? classroom : {}}
                                            label    = {dictionary[language]?.classroom}
                                            className= {`${classes.select} err-border`}
                                            onChange = {(e: any) => {
                                                setClassroom(e.target.value);
                                                validateMsg.classroom = '';
                                                setValidateMsg({ ...validateMsg });
                                            }}
                                            sx={
                                                validateMsg.classroom? {
                                                    '& fieldset': {
                                                        borderColor: `${BasicColor.red} !important`,
                                                    },
                                                } : {}
                                            }
                                            displayEmpty={true}
                                        >
                                            {classrooms?.length > 0 && classrooms.map((value: any, index: number) => (
                                            <MenuItem value={value} key={index}>
                                                {value.name}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                        <div className='err-text'>{validateMsg.classroom}</div>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            value     = {'+ ' + dictionary[language]?.addToAGroup}
                                            color     = {BasicColor.blue}
                                            bgColor   = {BasicColor.white}
                                            onClick   = {handleAddToGroup}
                                            fullWidth = { true }
                                            variant   = {'text'}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Button
                                    value     = {dictionary[language]?.removeStudent}
                                    color     = {BasicColor.red}
                                    bgColor   = {BasicColor.white}
                                    onClick   = {handleRemove}
                                    align     = {'left'}
                                    fullWidth = { true }
                                    variant   = {'text'}
                                />
                                <Button
                                    value     = {dictionary[language]?.save}
                                    bgColor   = {BasicColor.green}
                                    onClick   = {handleSubmit}
                                    align     = {'right'}
                                    fullWidth = { true }
                                />
                            </Grid>
                        </Grid>
                    </div>
                }
            />
      </Container>
    )
}

export default AddNewStudent
