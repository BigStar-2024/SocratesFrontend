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

const AddExistStudent = (props: any) => {
    let language:string = useSelector((state: any) => state.user.language);
    language            = language? language : 'en-us'

    const { enqueueSnackbar } =  useSnackbar();
    const classes             = useStyles();

    const [username, setUsername]   = useState('');
    const [password, setPassword]   = useState('')

    const [validateMsg, setValidateMsg] = useState<{[key: string]: any}>({
        username   : null,
        password   : null,
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

    const handleSubmit = () => {
        if (!formValidation()) return;
        props.close();
    }

    const handleFormChange = (field: string, errMsg: string) => {
        setValidateMsg({...validateMsg, [field]: errMsg});
    }

    useEffect(() => {
    },[])
    return (
      <Container>
          <CardDialog
                isOpen        = {props.isOpen}
                open          = {props.close}
                title         = {dictionary[language]?.newClassroom}
                dialogContent = {
                    <div >
                        <h1>{dictionary[language]?.addingANewStudent}</h1>
                        <h2>{'(' + dictionary[language]?.existingAccountSocrates + ')'}</h2>
                        <h3>{dictionary[language]?.pleaseIntroduceNestInformation}</h3>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
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
                            <Grid item xs={12} md={12} lg={12}>
                                <Button
                                    value     = {dictionary[language]?.addAcctAndToTheClass}
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

export default AddExistStudent
