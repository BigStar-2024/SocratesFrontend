import { FC, useEffect, useState } from 'react';
import classroomMark from 'views/assets/packageIcons/classroomMark.svg'
import schoolMark from 'views/assets/packageIcons/schoolMark.svg'
import Button from 'views/molecules/MuiButton'
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from 'views/molecules/MuiTextField';
import { BasicColor } from 'views/Color';
import { useSelector } from 'react-redux';
import { dictionary } from './dictionary'
import cDictionary from 'constants/commonDictionary';
import {
  TeacherContainer,
  TeacherHeader,
  Avatar,
  PriceContainer,
  Price,
  Plan,
  TeacherBody,
  Mask,
  Tip,
  TeacherBtnContainer
} from './Style'

type PackagePanelProps = {
  type: string;
  price: any;
  disabled?: boolean;
  isSpecialCode: boolean;
  onChange: (childrenCount: number, plan: string, sponsorEmail: string) => void;
  language: string
};
const TeacherPackagePanel: FC<PackagePanelProps> = ({ type, price, isSpecialCode, disabled = false, onChange, language }) => {
  const [childrenCount, setChildrenCount] = useState(0);
  const [sponsorEmail, setSponsorEmail] = useState('')
  const [plan, setPlan] = useState('month');
  //   let temp:any = [];
  //   temp = [...paths];
  //   if(isChecked) temp.push(path)
  //   else temp.pop(path)
  //   setPaths(temp)
  // }

  useEffect(() => {
    onChange(childrenCount, plan, sponsorEmail);
  }, [childrenCount, plan, sponsorEmail]);

  return (
    <TeacherContainer>
      {disabled && (<Mask />)}
      <TeacherHeader>
        <Avatar src={type === 'School' ? schoolMark : classroomMark} />
        <b className="font-c-white">{type}</b>
      </TeacherHeader>
      <TeacherBody>
        <Tip>
          <b>{dictionary[language]?.classroomPlanInclude} : </b>
          {dictionary[language]?.classroomPlanDescription}
        </Tip>
        <TeacherBtnContainer>
          {!isSpecialCode &&
            <div className="flex flex-col p-t-10 p-b-15 font-s-20 font-w-7 w-250">
              <b>{cDictionary[language]?.choose_your_plan}</b>
              <br />
              <div className="flex flex-row" style={{ flexWrap: 'unset' }}>
                <Button bgColor={BasicColor.blue} zIndex={plan === 'month' ? 2 : 0} fontSize={16} height={40} value={dictionary[language]?.monthly} onClick={() => { setPlan('month') }} />
                <Button fontSize={16} height={40} zIndex={1} variant="outlined" color="black" borderColor="black" value={dictionary[language]?.yearly} margin="0 0 0 -50px" onClick={() => { setPlan('year') }} />
              </div>
            </div>
          }
          <div className="flex flex-col p-t-10 p-b-15 font-s-20 font-w-7 w-250">
            <b>{
              type === 'School' ?
                cDictionary[language]?.number_of_schools :
                dictionary[language]?.numberOfChildren}</b>
            <br />
            <div className="flex flex-row">
              <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button variant="outlined" color="black" borderColor="black" radius={0} fontSize={24} height={35} width={35} value="-" onClick={() => childrenCount > 0 && setChildrenCount(childrenCount - 1)} />
                <Button variant="outlined" color="black" borderColor="black" radius={0} fontSize={24} height={35} width={35} value={'' + childrenCount} />
                <Button variant="outlined" color="black" borderColor="black" radius={0} fontSize={24} height={35} width={35} value="+" onClick={() => setChildrenCount(childrenCount + 1)} />
              </ButtonGroup>
            </div>
          </div>
        </TeacherBtnContainer>
        <div className="flex flex-row justify-space-around w-100">
          <TextField
            label={dictionary[language]?.requestFromSponsor}
            onChange={(e: any) => {
              setSponsorEmail(e.target.value);
            }}
            value={sponsorEmail}
            disabled={true}
          />
        </div>
        {!isSpecialCode &&
          <PriceContainer>
            <Price> $ {price}</Price>
            <Plan>/{plan}</Plan>
          </PriceContainer>
        }
      </TeacherBody>
    </TeacherContainer>
  );
};
export default TeacherPackagePanel;
