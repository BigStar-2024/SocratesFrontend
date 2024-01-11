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
import questionMarkInCircle      from 'views/assets/questionmark-in-circle.svg'
const AddClassroomForm = (props: any) => {
    let language:string = useSelector((state: any) => state.user.language);
    language            = language? language : 'en-us'

    const classes =              useStyles();

    const handleCreateNewAccount = () => {
        props.openNewAccountDlg();
        props.close();
    }
    const handleCreateExistAccount = () => {
        props.openExistingNewAccountDlg();
        props.close();
    }

    useEffect(() => {
    },[])
    return (
      <Container>
          <CardDialog
                isOpen        = {props.isOpen}
                open          = {props.close}
                dialogContent = {
                    <div className="flex-col p-l-50 p-r-50 p-t-10 p-b-50 justify-center align-center">
                        <img src={questionMarkInCircle} style={{maxWidth:'210px'}}/>
                        <h1 className="p-b-20">{dictionary[language]?.newStudent + ' ?'}</h1>
                        <div className="flex">
                            <Button
                                value     = {dictionary[language]?.createNewAccount}
                                bgColor   = {BasicColor.blue}
                                onClick   = {handleCreateNewAccount}
                                align     = {'left'}
                                fullWidth = { true }
                                className = 'm-r-40'
                            />
                            <Button
                                value     = {dictionary[language]?.createExistAccount}
                                bgColor   = {BasicColor.green}
                                onClick   = {handleCreateExistAccount}
                                align     = {'right'}
                                fullWidth = { true }
                            />
                        </div>
                    </div>
                }
            />
      </Container>
    )
}

export default AddClassroomForm
