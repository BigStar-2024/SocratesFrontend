import { FC, useState } from 'react';
import { settingPage } from 'views/Theme';
import { Button, TextField, ThemeProvider } from '@mui/material';
import { LSGridRow, LSLabel } from 'views/molecules/Setting/utils/Style';
import { Grid } from '@mui/material';
import { LSButtonContainer } from 'views/molecules/Setting/utils/Style';
import { doUpdateGuardianEmailPassword } from 'app/actions/guardianActions';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { LoadingSpinner } from 'views/atoms/Spinner';
import { dictionary } from '../../Parent/dictionary'

interface DialogProps {
    open: () => (void)
}
export const TeacherPwdResetForm: FC<DialogProps> = ({ open }) => {

    const [pwd, setPwd] = useState({ password: '', confirm: '' })
    const { enqueueSnackbar } = useSnackbar();
    const [errorMsg, setErrorMsg] = useState('')
    const user = useSelector((state: any) => state.user);
    const [loading, setLoading] = useState(false)
    let language: string = useSelector((state: any) => state.user.language);
    language = language ? language : "en-us"
    // Whenever an input changes value, change the corresponding state variable
    const handleInputChange = (event: any) => {
        event.preventDefault();
        const target = event.target;
        setPwd({
            ...pwd,
            [target.name]: target.value,
        });
    }

    const validatePwd = () => {
        if (pwd.confirm !== pwd.password) {
            setErrorMsg(dictionary[language]?.passwordsDontMatch)
            return false
        } else if (pwd.password.length < 6) {
            setErrorMsg(dictionary[language]?.passwordShouldBeAtLeast6Letters)
            return false
        } else {
            setErrorMsg('')
            return true
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // // Verify that the passwords match
        // if (!validatePwd()) return

        // // Call Userfront.resetPassword()
        // setLoading(true)
        // const res: any = await doUpdateGuardianEmailPassword('', user.username, pwd.password, user.token)
        // if (res === null)
        //     enqueueSnackbar(dictionary[language]?.passwordResetError, { variant: 'error' })
        // else enqueueSnackbar(dictionary[language]?.passwordResetSuccess, { variant: 'success' });
        // setLoading(false)
        // open()
    }
    return (
        loading ?
            <LoadingSpinner />
            :
            <>
                <LSGridRow container spacing={3}>
                    <Grid item lg={4} xs={12}>
                        <LSLabel>
                            {dictionary[language]?.newPassword}
                        </LSLabel>
                    </Grid>
                    <Grid item lg={8} xs={12}>
                        <TextField
                            error={errorMsg ? true : false}
                            size='small'
                            id='outlined-password-input'
                            label={dictionary[language]?.newPassword}
                            type='password'
                            autoComplete='new-password'
                            value={pwd.password}
                            onChange={handleInputChange}
                            name='password'
                            aria-describedby="component-error-text"
                            helperText={errorMsg}
                        />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <LSLabel>
                            {dictionary[language]?.confirmPassword}
                        </LSLabel>
                    </Grid>
                    <Grid item lg={8} xs={12}>
                        <TextField
                            size='small'
                            id='outlined-password-confirm'
                            label={dictionary[language]?.confirm}
                            type='password'
                            value={pwd.confirm}
                            onChange={handleInputChange}
                            name='confirm'
                        />
                    </Grid>
                </LSGridRow>
                <LSButtonContainer>
                    <Button
                        type='submit'
                        variant='contained'
                        onClick={handleSubmit}
                    >
                        {dictionary[language]?.submit}
                    </Button>
                </LSButtonContainer>
            </>
    );
}

