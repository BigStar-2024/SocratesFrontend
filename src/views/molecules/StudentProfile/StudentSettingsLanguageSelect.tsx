import { FC } from 'react';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import { LANGUAGES } from 'constants/common';
import { USER_SET_LANGUAGE } from 'app/types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { doUpdateUserLanguage } from 'app/actions';
import { useSnackbar } from 'notistack';

export const LanguageSelect: FC = () => {

    const dispatch = useDispatch()
    const language = useSelector((state: any) => state.user.language);
    const user = useSelector((state: any) => state.user)
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = async (e: SelectChangeEvent) => {
        dispatch({ type: USER_SET_LANGUAGE, payload: e.target.value as string });
        //   TODO: Send backend  mutation to set language
        const res: any = await doUpdateUserLanguage(e.target.value as string, user.token)
        if (res.success) {
            enqueueSnackbar('Update language successfully!', { variant: 'success' });
        } else {
            enqueueSnackbar(res.msg, { variant: 'error' });

        }
    };

    return (
        <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={language}
                    onChange={handleChange}
                >
                    {
                        LANGUAGES.map((lang) => (
                            <FormControlLabel key={lang.id} value={lang.value} control={<Radio />} label={lang.label} />
                        ))
                    }
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
