import { FC }                      from 'react';
import { ButtonColor, BasicColor } from 'views/Color';
import { makeStyles }              from '@mui/styles'
import TextField                   from '@mui/material/TextField';

type MuiTextFieldProps = {
  value?: string;
  InputProps?: any;
  variant?: any;
  focused?: boolean;
  error?: boolean | any;
  helperText?: string | undefined | null;
  label?: string;
  bgColor?: ButtonColor | string | BasicColor;
  radius?: number
  className?: string;
  borderColor?: ButtonColor | BasicColor | string;
  type?: string;
  disabled?: boolean;
  maxRows?: number;
  height?: number;
  onHover?: (e: any) => void;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
};

const MuiTextField: FC<MuiTextFieldProps> = ({
  value,
  InputProps,
  focused,
  error,
  helperText,
  label,
  variant='outlined',
  bgColor,
  borderColor,
  radius=25,
  className='',
  type='text',
  disabled=false,
  maxRows=1,
  height=0,
  onHover,
  onClick,
  onChange
}) => {

    const useStyles = makeStyles({
        input: {
            '& fieldset': {
                borderColor: borderColor || bgColor || BasicColor.brightBlue,
                borderRadius: radius,
                borderWidth: '2px'
            },
            '& MuiFormControl-root': {
                borderRadius: radius,
                borderWidth: '2px'
            },
            '& input': {
                backgroundColor: variant !== 'outlined' ? bgColor || BasicColor.greenSoft : 'white',
                borderRadius: radius,
                borderWidth: '2px'
            },
            '& .MuiInputBase-input': {
                backgroundColor: variant !== 'outlined' ? bgColor || BasicColor.greenSoft : 'white',
                borderRadius: radius,
                borderWidth: '2px'
            },
            '& .MuiInputBase-root': height > 0 ? {
              height: height,
              justifyContent: 'start',
              alignItems: 'start',
            } : {}
        }
    })

    const classes = useStyles();

  return (
    <TextField
        variant={variant}
        label={label}
        className={`${classes.input} ${className}`}
        focused={focused}
        InputProps={InputProps}
        error={error}
        helperText={helperText}
        onClick={onClick}
        onMouseOver={onHover}
        onChange={onChange}
        fullWidth
        value={value}
        type={type}
        disabled={disabled}
        maxRows={maxRows}
        multiline={maxRows > 1 ? true : false}
    />
  );
};
export default MuiTextField

