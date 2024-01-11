import { FC, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { USER_SET_LANGUAGE } from 'app/types';
import { LANGUAGES } from 'constants/common';

export const dictionary: any = Object.freeze({
  'en-us': {
    language: 'Language',
  },
  'th': {
    language: 'ภาษา',
  },
  'es-mx': {
    language: 'Español',
  }
});


export const LanguageSelect: FC = () => {
  const [lang, setLang] = useState('');
  const dispatch = useDispatch()
  let language = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  const handleChange = (event: SelectChangeEvent) => {
    dispatch({ type: USER_SET_LANGUAGE, payload: event.target.value });
    //   TODO: Send backend  mutation to set language
    // const res: any = await doUpdateUserLanguage(e.target.value as string, user.token)
    // if (res.success) {
    //     enqueueSnackbar('Update language successfully!', { variant: 'success' });
    // } else {
    //     enqueueSnackbar(res.msg, { variant: 'error' });

    // }
    setLang(event.target.value);
  };

  return (
    // <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{dictionary[language]?.language}</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={lang || 'en-us'}
          label={dictionary[language]?.language}
          onChange={handleChange}
        >
          {
            LANGUAGES.map((lang) => (
              <MenuItem key={lang.id} value={lang.value}>{lang.label}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    // </Box>
  );
}
