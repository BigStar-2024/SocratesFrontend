import { FC, useEffect, useState, useContext }    from 'react';
import { useSelector }          from 'react-redux';
import { LoadingContext }       from 'react-router-loading';
import { TeacherPgContainer }   from 'views/molecules/TeacherPgContainer/TeacherPgContainer';
import { dictionary }           from './dictionary';
import { TopicReport, AreasOfKnowledge } from 'api/fragments/topicFragments';
import query                 from 'api/queries/get';
import { TableContainer, Table, Table2 } from './style';
import Button                    from 'views/molecules/MuiButton';

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
        <TableContainer>
          <Table>
            <thead>
              <th>Name of the Assignement</th>
              <th>Area of Knowledge</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>State</th>
              <th>Results</th>
            </thead>
            <tbody>
              {[1,2,3,4,5].map((singleRow, _id) => {
                return (
                  <tr>
                    <td>Name of the Assignement</td>
                    <td>Financial Literacy</td>
                    <td>04/05/2022</td>
                    <td>04/05/2022</td>
                    <td>In progress</td>
                    <td>0/10 - 0%</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Table2>
            <thead>
              <th style={{

              }}>Name of the Student</th>
              <th style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <p style={{
                  color: "#3F3F3F"
                }}>Progress(</p>
                <p style={{
                  color: "#21B95C"
                }}>correct</p>
                <p>/</p>
                <p style={{
                  color: "#EC5858"
                }}>incorrect</p>
                <p>/</p>
                <p style={{
                  color: "#F4C222"
                }}>not anser</p>
                <p style={{
                  color: "#3F3F3F"
                }}>)</p>
              </th>
              <th>State</th>
              <th>Resutls</th>
              <th>Actions</th>
            </thead>
            <tbody>
              <tr style={{
                verticalAlign: 'middle'
              }}>
                <td style={{
                  textAlign: 'center'
                }}>Lois Lane</td>
                <td>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: "30%",
                      height: "1.2rem",
                      background: "#21B95C",
                    }} />
                    <div style={{
                      width: "30%",
                      height: "1.2rem",
                      background: "#EC5858",
                    }} />
                    <div style={{
                      width: "30%",
                      height: "1.2rem",
                      background: "#F4C222",
                    }} />
                  </div>
                </td>
                <td style={{
                  textAlign: 'center'
                }}>Completed </td>
                <td style={{
                  textAlign: 'center'
                }}>15-20 - 80%</td>
                <td style={{
                  textAlign: 'center'
                }}>
                  <Button width={24} height={24} value='Finish' />
                  <Button width={24} height={24} value='Extend' />
                </td>
              </tr>
            </tbody>
          </Table2>
        </TableContainer>
      </>
    </TeacherPgContainer>
  );
};
export default Assignment
