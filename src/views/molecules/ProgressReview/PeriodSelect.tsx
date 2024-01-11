import { FC, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { REVIEW_PERIODS } from 'constants/common';

interface PeriodSelectProps {
  update: (params: any) => void
}

export const PeriodSelect: FC<PeriodSelectProps> = ({
  update
}) => {
  const [period, setPeriod] = useState<any>({});
  let language = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  const handleChange = (event: SelectChangeEvent) => {
    const temp = REVIEW_PERIODS.find(element => element.id === event.target.value)
    setPeriod(temp);
    update(temp?.value)
  };

  return (
    <FormControl >
      <Select
        labelId="language-select-label"
        id="language-select"
        value={period.id || 'today'}
        onChange={handleChange}
        sx={{ minWidth: 100 }}
      >
        {
          REVIEW_PERIODS.map((period) => (
            <MenuItem key={period.id} value={period.id}>{period.label[language as keyof Object]}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
