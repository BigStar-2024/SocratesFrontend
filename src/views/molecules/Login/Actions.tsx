import { FC } from 'react';
import styled from 'styled-components';
import { Divider } from 'views/atoms/Divider';
import { ButtonColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';
import Button from 'views/molecules/MuiButton';
import { BasicColor } from 'views/Color';
import GoogleIcon from '@mui/icons-material/Google';

type LoginActionsProps = {
  googleText: string;
  googleColor: ButtonColor;
  googleAction: () => void;
  or: string;
  loginText: string;
  loginColor: ButtonColor;
  loading: boolean;
  disabled?: boolean;
  loginAction: () => void;
};

export const Actions: FC<LoginActionsProps> = ({
  googleText,
  googleColor,
  googleAction,
  or,
  loginText,
  loginColor,
  loginAction,
  loading,
  disabled = false
}) => {
  return (
    <StyledActions>

      <Action>
        <Button
          value={loading ? 'Loading...' : loginText}
          bgColor={loginColor}
          color={BasicColor.white}
          onClick={loginAction}
          fullWidth={true}
          loading={loading}
        />
      </Action>
      <Divider value={or} />
      <Action>
        <Button
          value={googleText}
          bgColor={googleColor}
          color={BasicColor.black}
          onClick={googleAction}
          fullWidth={true}
          loading={loading}
          disabled={disabled}
          startIcon={<GoogleIcon />}
        />
      </Action>

    </StyledActions>
  );
};

const StyledActions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-left: 3rem;
  margin-right: 3rem;
  @media (min-width: ${ScreenSize.desktop}) {
    grid-template-columns: 1fr 0 1fr;
    grid-gap: 20px;
    // direction: rtl;
    margin-top: 1rem;
    margin-left: 0;
  }
`;

export const Action = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  @media (min-width: ${ScreenSize.phone}) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;
