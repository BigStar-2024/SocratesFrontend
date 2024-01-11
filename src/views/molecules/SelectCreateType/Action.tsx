import { FC }          from 'react';
import styled          from 'styled-components';
import { Divider }     from 'views/atoms/Divider';
import { ButtonColor } from 'views/Color';
import { ScreenSize }  from 'constants/screenSize';
import Button          from 'views/molecules/MuiButton';
import { BasicColor }  from 'views/Color';
import { dictionary }  from './dictionary'
import { useSelector } from 'react-redux'
type LoginActionsProps = {
    createClassAction: () => void;
    createSchoolAction: () => void;
};

export const Actions: FC<LoginActionsProps> = ({
  createClassAction,
  createSchoolAction,
}) => {

    let language:string = useSelector((state: any) => state.user.language);
    language            = language? language : 'en-us'

  return (
    <StyledActions>

      <Action>
        <Button
          value={dictionary[language]?.createClassroomAccount}
          bgColor={BasicColor.yellow}
          color={BasicColor.black}
          onClick={createClassAction}
          fullWidth={true}
        />
      </Action>
      <Action>
        <Button
          value={dictionary[language]?.createSchoolAccount}
          bgColor={BasicColor.aqua}
          color={BasicColor.black}
          onClick={createSchoolAction}
          fullWidth={true}
        />
      </Action>

    </StyledActions>
  );
};

const StyledActions = styled.div`
  display: flex;
  justify-content: space-around;

  @media (min-width: ${ScreenSize.desktop}) {
    // direction: rtl;
    margin-top: 1rem;
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
