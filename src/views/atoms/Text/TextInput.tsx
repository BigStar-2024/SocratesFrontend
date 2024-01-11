import { TextField } from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';
import { BasicColor } from 'views/Color';

type TextInputProps = {
  label: string;
  validate?: (text: string) => boolean;
  errMsg?: string;
  isSecret?: boolean;
  onChange?: (e: any) => void;
};

export const TextInput: FC<TextInputProps> = ({
  label,
  // validate = (_: string) => true || _,
  // errMsg = '',
  isSecret = false,
  onChange
}) => {
  //const [value, setValue] = useState('');
  // const [isValid, setIsValid] = useState<boolean>(true);
  /* useEffect(() => {
     if (validate(value) && isValid === false) {
       setIsValid(true);
     }
     if (!validate(value) && isValid === true) {
       setIsValid(false);
     }
   }, [value]);*/

  return (
    <>
      {/* <Wrapper isValid={true}> */}
      {/* <Label>{label}</Label> */}
      <TextField
        onChange={onChange}
        fullWidth
        label={label}
        type={isSecret ? 'password' : 'text'}
      />
      {/* <StyledInput
          onChange={onChange}
          type={isSecret ? 'password' : 'text'}
        /> */}
      {/* </Wrapper> */}
      {/* <Warning>{!isValid ? errMsg : ''}</Warning> */}
    </>
  );
};

const StyledInput = styled.input`
  border: none;
  outline: 0;
  padding: 20px 8px 10px;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  border-radius: 8px;
`;

const Wrapper = styled.div<{ isValid: boolean }>`
  background-color: ${BasicColor.white};
  font-weight: 500;
  height: 47px;
  font-size: 13px;
  line-height: 16px;
  color: ${BasicColor.gray60};
  border: ${p =>
    p.isValid
      ? `1px solid ${BasicColor.white}`
      : `1px solid ${BasicColor.yellow}`};
  box-shadow: ${p =>
    p.isValid ? 'none' : '0px 4px 4px rgba(199, 83, 80, 0.3)'};
  border-radius: 8px;
  margin: 5px 0 5px 0;
`;

const Label = styled.label`
  position: absolute;
  padding: 3px 8px;
`;

