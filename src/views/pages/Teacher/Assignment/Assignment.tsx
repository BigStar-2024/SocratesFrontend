import { FC, useEffect, useState, useContext }    from 'react';
import { useSelector }          from 'react-redux';
import { LoadingContext }       from 'react-router-loading';
import { TeacherPgContainer }   from 'views/molecules/TeacherPgContainer/TeacherPgContainer';
import { dictionary }           from './dictionary';
import { SubjectCard }          from 'views/atoms/SubjectCard';
import ElaOrignal               from 'views/assets/packageIcons/ela_original.svg';
import MathOrignal               from 'views/assets/packageIcons/math_original.svg';
import ScienceOrignal               from 'views/assets/packageIcons/science_original.svg';
import SightOrignal               from 'views/assets/packageIcons/sight_original.svg';
import FinancialOrignal               from 'views/assets/packageIcons/financial_original.svg';
import HealthOrignal               from 'views/assets/packageIcons/health_original.svg';
import { SubjectCardContainer, TableContainer, AssignPanelContainer, StudentPanel, AssignPanel, StudentItemContainer } from './style';
import MarkTable             from 'views/molecules/Table/MarkTable';
import { TopicReport, AreasOfKnowledge } from 'api/fragments/topicFragments';
import query                 from 'api/queries/get';
import AssignmentTable from 'views/molecules/Table/AssignmentTable';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import DateTimePicker            from 'react-datetime-picker';
import Button                    from 'views/molecules/MuiButton';
import {ButtonColor, BasicColor} from 'views/Color';

const Assignment: FC = () => {
  const loadingContext    = useContext(LoadingContext);
  const user              = useSelector((state: any) => state.user);
  const guardian          = useSelector((state: any) => state.guardian);
  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : "en-us"

  useEffect(() => {

    if(window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();

  }, []);

  const [activeSubjectId, setActiveSubjectId]   = useState<number>(-1);
  const [areasOfKnowledge, setAreasOfKnowledge] = useState<any[]>([]);
  const [data, setData]                         = useState<any[]>([]);

  const [students, setStudents]                 = useState<string[]>(["Lorena Sanchez","Lorena Sanchez","Lorena Sanchez","Lorena Sanchez","Lorena Sanchez","Lorena Sanchez","Lorena Sanchez"]);
  useEffect(() => {

    if(window.Tawk_API?.onLoaded) if(window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();

    (async () => {
      // Get All Subject
      const res:any = await query(``, AreasOfKnowledge(), user.token).catch(e => ({success: false}));
      if(res.success === false) {
        return
      }
      const result:any = await res.json();
      if(result.errors && !result.data) {
        alert(result.errors[0].message);
      } else {
        setAreasOfKnowledge(result.data.areasOfKnowledge)
      }
    })();
  }, [user]);
  const [date, setDate]   = useState<Date>();
  return (
    <TeacherPgContainer onlyLogoImgNav={true} title={dictionary[language]?.title}>
      <>
        <SubjectCardContainer>
            <SubjectCard bgColor='#EC5858' imgUrl={ElaOrignal} text='ELA' />
            <SubjectCard bgColor='#EC5858' imgUrl={MathOrignal} text='MATH' />
            <SubjectCard bgColor='#EC5858' imgUrl={ScienceOrignal} text='SCIENCE' />
            <SubjectCard bgColor='#EC5858' imgUrl={SightOrignal} text='SIGHT WORDS' />
            <SubjectCard bgColor='#EC5858' imgUrl={FinancialOrignal} text='FINANCIAL LITERACY' />
            <SubjectCard bgColor='#EC5858' imgUrl={HealthOrignal} text='HEALTH & SAFETY' />
        </SubjectCardContainer>
        <TableContainer>
          <AssignmentTable>
            <AssignPanelContainer>
              <StudentPanel>
                <StudentItemContainer>
                  <input type="checkbox" name="" id={`student-all`} />
                  <label htmlFor={`student-all`}>All Student</label>
                </StudentItemContainer>
                {students.map((student, id) => (
                  <StudentItemContainer>
                    <input type="checkbox" name="" id={`student-${id}`} />
                    <label htmlFor={`student-${id}`}>{student}</label>
                  </StudentItemContainer>
                ))}
              </StudentPanel>
              <AssignPanel>
                <TextField
                  style={{
                    width: "100%"
                  }}
                  label="Assignment Name (Optional)"
                  variant="standard"
                  color="warning"
                  focused
                  placeholder='Represent the value of a currency with an amount of a different currency'
                />
                <TextField
                  style={{
                    width: "100%",
                    marginTop: "1rem"
                  }}
                  label="Number of Questions"
                  variant="standard"
                  color="warning"
                  focused
                  placeholder='10'
                />
                <TextField
                  style={{
                    width: "100%",
                    marginTop: "1rem"
                  }}
                  label="Assignment Start Date"
                  variant="standard"
                  color="warning"
                  focused
                  placeholder='10'
                />
                <Box style={{
                  width: "100%",
                  marginTop: "1rem"
                }}>
                  <label htmlFor="">Assignment Start Date</label><br />
                  <DateTimePicker
                      value={date}
                      onChange={(e: any) => {
                          setDate(e);
                          console.log(e)
                      }}
                  />
                </Box>
                <Box style={{
                  width: "100%",
                  marginTop: "1rem"
                }}>
                  <label htmlFor="">Assignment End Date (Leave in blank for no end date)</label><br />
                  <DateTimePicker
                      value={date}
                      onChange={(e: any) => {
                          setDate(e);
                          console.log(e)
                      }}
                  />
                </Box>
                <Button
                  margin="10px 0px"
                  value     = {dictionary[language]?.assign}
                  bgColor   = {BasicColor.green}
                  // onClick   = {handleSubmit}
                  align     = {'left'}
                  fullWidth = { true }
                />
              </AssignPanel>
            </AssignPanelContainer>
          </AssignmentTable>
        </TableContainer>
      </>
    </TeacherPgContainer>
  );
};
export default Assignment
