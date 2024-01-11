import { FC, useState } from 'react';
import styled from 'styled-components';
import { Box, Button } from '@mui/material';
import { LSTitle, LSShadowContainer } from 'views/molecules/Setting/utils/Style';
import { LSDialog } from 'views/molecules/Setting/LSDialog';
import { useDialog, useAddDialog } from 'views/molecules/Setting/utils/useDialog';
import { TeacherCancelMembershipForm } from './Forms/TeacherCancelMembershipForm';
import { useSelector } from 'react-redux';
import { dictionary } from './dictionary'
import { TeacherPlanList } from './Forms/TeacherPlanList';
import { TeacherAddSimplePlanForm } from './Forms/TeacherAddSimplePlanForm';
export const TeacherMembershipDetail: FC = () => {

  const { isOpen, open } = useDialog()
  const { isAddOpen, openAdd } = useAddDialog()
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  // State to refresh component
  const [value, setValue] = useState(false);
  const refresh = () => {
    // it re-renders the component
    setValue(!value);
  }

  return (
    <Box>
      <LSShadowContainer >
        <LSTitle>
          {dictionary[language]?.membershipDetails}
        </LSTitle>
        <Box >
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
            <LSDialog
              isOpen={isAddOpen}
              open={openAdd}
              title={dictionary[language]?.addPlanPackage}
              // fullWidth='true'
              // contentText={dictionary[language]?.chooseTheNewPlan}
              dialogContent={
                <TeacherAddSimplePlanForm
                  open={openAdd}
                  refresh={refresh}
                />
              }
            />
          </Box>
          <TeacherPlanList refresh={value} />
          <BtnContainer >
            <Button onClick={openAdd}>
              {dictionary[language]?.addAPlan}
            </Button>
            <Button onClick={open}>
              {dictionary[language]?.cancelMembership}
            </Button>
          </BtnContainer>
          <LSDialog
            isOpen={isOpen}
            open={open}
            title={dictionary[language]?.cancelMembership}
            contentText={dictionary[language]?.thankYouForYourPlan}
            dialogContent={
              <TeacherCancelMembershipForm
                open={open}
                refresh={refresh}
              />
            }
          />
        </Box>
      </LSShadowContainer>
    </Box>
  );
}
const BtnContainer = styled.div`
display: flex;
padding: 20px;
flex-direction: column;
align-items: flex-start;
@media screen and (max-width: 540px) {
  width: 100%;
}
`
