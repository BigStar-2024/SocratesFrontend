import { useSelector }                from 'react-redux'
import { useState, useEffect }             from 'react'
import { Grid, FormControl, Select }                 from '@mui/material';
import { dictionary }           from './dictionary'
import addClassroomImgMark      from 'views/assets/addClassroom.svg'
import ClassroomItemImg         from 'views/assets/classroom-item.svg'
import {
    Container,
    useStyles,
    Formtitle,
    ClassroomItem,
    ClassroomMark,
    ClassroomText,
    FormLabel,
}             from './Style'
import { CardDialog } from 'views/molecules/StudentCard/MyCards/CardDialog';
import InputLabel                   from '@mui/material/InputLabel';
import TextField                    from 'views/molecules/MuiTextField';
import { getAudiencesWithGrades} from 'app/actions/audienceActions'
import { useSnackbar }           from 'notistack';
import MenuItem                  from '@mui/material/MenuItem';
import Button                    from 'views/molecules/MuiButton';
import {ButtonColor, BasicColor} from 'views/Color';
import commonDictionary          from 'constants/commonDictionary'
import Switch                    from 'views/molecules/MuiSwitch'
const SettingForm = (props: any) => {
    let language:string = useSelector((state: any) => state.user.language);
    language            = language? language : 'en-us'

    const { enqueueSnackbar } =  useSnackbar();
    const classes =              useStyles();

    const [audiences, setAudiences] = useState([]);
    const [audience, setAudience] = useState();
    const [className, setClassName] = useState('')
    const [validateMsg, setValidateMsg] = useState<{[key: string]: any}>({
        className   : null,
        audience    : null,
    });
    const [timezones, setTimezones] = useState([]);
    const [timezone, setTimezone] = useState('')

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
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Formtitle>{dictionary[language]?.classSettings}</Formtitle>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label       = {dictionary[language]?.language}
                                            onChange    = {(e: any) => {
                                                handleFormChange('className', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                                                setClassName(e.target.value)
                                            }}
                                            error       = {!!validateMsg.className}
                                            helperText  = {validateMsg.className}
                                            value       = {className}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormLabel>{dictionary[language]?.games}</FormLabel>
                                        <Switch></Switch>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label       = {dictionary[language]?.gameCost}
                                            onChange    = {(e: any) => {
                                                handleFormChange('className', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                                                setClassName(e.target.value)
                                            }}
                                            error       = {!!validateMsg.className}
                                            helperText  = {validateMsg.className}
                                            value       = {className}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id='select-timezone-label'>
                                                {dictionary[language]?.timeZone}
                                            </InputLabel>
                                            <Select
                                                labelId  ='select-timezone-label'
                                                id       = 'select-timezone'
                                                value    = {timezone ? timezone : {}}
                                                label    = {dictionary[language]?.grade}
                                                className= {`${classes.select} err-border`}
                                                onChange = {(e: any) => {
                                                    setTimezone(e.target.value);
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
                                                {timezones?.length > 0 && timezones.map((value: any, index: number) => (
                                                <MenuItem value={value} key={index}>
                                                    {value.name}
                                                </MenuItem>
                                                ))}
                                            </Select>
                                            <div className='err-text'>{validateMsg.grade}</div>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Formtitle>{dictionary[language]?.setSchoolHours}</Formtitle>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={2}>
                                        <Formtitle>{dictionary[language]?.monday}</Formtitle>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Formtitle>{dictionary[language]?.setSchoolHours}</Formtitle>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <Formtitle>{dictionary[language]?.setSchoolHours}</Formtitle>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Formtitle>{dictionary[language]?.setSchoolHours}</Formtitle>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <Formtitle>{dictionary[language]?.setSchoolHours}</Formtitle>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Formtitle>{dictionary[language]?.setSchoolHours}</Formtitle>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Formtitle>{dictionary[language]?.setSchoolHours}</Formtitle>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Formtitle>{dictionary[language]?.setSchoolHours}</Formtitle>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Formtitle>{dictionary[language]?.setSchoolHours}</Formtitle>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label       = {dictionary[language]?.classroomName}
                                    onChange    = {(e: any) => {
                                        handleFormChange('className', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                                        setClassName(e.target.value)
                                    }}
                                    error       = {!!validateMsg.className}
                                    helperText  = {validateMsg.className}
                                    value       = {className}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                <InputLabel id='select-audience-label'>
                                    {dictionary[language]?.selectYourCurriculum}
                                </InputLabel>
                                <Select
                                    labelId  ='select-audience-label'
                                    id       = 'select-audience'
                                    value    = {audience ? audience : {}}
                                    label    = {dictionary[language]?.selectYourCurriculum}
                                    className= {`${classes.select} err-border`}
                                    onChange = {(e: any) => {
                                        setAudience(e.target.value);
                                        validateMsg.audience = '';
                                        setValidateMsg({ ...validateMsg });
                                    }}
                                    sx={
                                        validateMsg.audience? {
                                            '& fieldset': {
                                                borderColor: `${BasicColor.red} !important`,
                                            },
                                        } : {}
                                    }
                                    displayEmpty={true}
                                >
                                    {audiences?.length > 0 && audiences.map((value: any, index: number) => (
                                    <MenuItem value={value} key={index}>
                                        {value.name}
                                    </MenuItem>
                                    ))}
                                </Select>
                                <div className='err-text'>{validateMsg.audience}</div>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Button
                                    value     = {dictionary[language]?.createClassroom}
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

export default SettingForm
