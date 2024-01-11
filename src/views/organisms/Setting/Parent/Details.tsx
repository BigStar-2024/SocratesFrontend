import { FC, useState } from 'react';
import styled from 'styled-components';
import { LSTitle, LSShadowContainer } from 'views/molecules/Setting/utils/Style';
import { LSDialog } from 'views/molecules/Setting/LSDialog';
import { AddSimplePlanForm } from 'views/molecules/Setting/AddSimplePlanFormNew';
import { useDialog, useAddDialog } from 'views/molecules/Setting/utils/useDialog';
import { PlanList } from 'views/molecules/Setting/PlanList';
import { CancelMembershipForm } from 'views/molecules/Setting/CancelMembershipForm';
import { useSelector } from 'react-redux';
import { dictionary } from './dictionary'
import { Button, Box } from '@mui/material';
export const MembershipDetail: FC = () => {

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
            <LSDialog // Add a new plan dialog
              isOpen={isAddOpen}
              open={openAdd}
              title={dictionary[language]?.addPlanPackage}
              dialogContent={
                <AddSimplePlanForm />
              }
            />
          </Box>
          <PlanList refresh={value} />
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
              <CancelMembershipForm
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
