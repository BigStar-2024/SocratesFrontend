import { FC, useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TeacherPgContainer }   from 'views/molecules/TeacherPgContainer/TeacherPgContainer';
import { BarChart }          from 'views/molecules/Chart/BarChart';
import MarkTable             from 'views/molecules/Table/MarkTable';
import { LoadingContext }    from 'react-router-loading';
import query                 from 'api/queries/get';
import { useSelector }       from 'react-redux';
import { TopicReport, AreasOfKnowledge } from 'api/fragments/topicFragments';

interface StudentIdParam {
  studentId: string;
}

export const ProgressStudent: FC = () => {
  const { studentId } = useParams<StudentIdParam>();
  const loadingContext = useContext(LoadingContext);
  const user           = useSelector((state: any) => state.user);
  const guardian       = useSelector((state: any) => state.guardian);
  const currentStudent  = guardian.guardianstudentSet.find((element: any) => element.student.id === studentId)

  const [student, setStudent] = useState<any>();
  const [activeSubjectId, setActiveSubjectId]   = useState<number>(-1);
  const [areasOfKnowledge, setAreasOfKnowledge] = useState<any[]>([]);
  const [data, setData]                         = useState<any[]>([]);
  useEffect(() => {

    if(window.Tawk_API?.onLoaded) if(window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();

    (async () => {
      // Get All Subject
      const res:any = await query('', AreasOfKnowledge(), user.token).catch(e => ({success: false}));
      if(res.success === false) {
        return
      }
      const result:any = await res.json();
      if(result.errors && !result.data) {
        alert(result.errors[0].message);
      } else {
        setAreasOfKnowledge(result.data.areasOfKnowledge)
        let iii = 4;
        for (let i = 0; i < result.data.areasOfKnowledge.length; i ++) {
            if (result.data.areasOfKnowledge[i].name === 'Sight Words') {
                iii = i;
                break;
            }
        }
        setActiveSubjectId(result.data.areasOfKnowledge[iii].id)
      }
    })();
  }, [user]);
  useEffect(() => {
    if (activeSubjectId !== -1 && parseInt(studentId) > 0) {
      (async () => {
        // Get Topic Report
        const res:any = await query('', TopicReport(parseInt(studentId), activeSubjectId), user.token).catch(e => ({success: false}));
        if(res.success === false) {
          return
        }
        const result:any = await res.json();
        if(result.errors && !result.data) {
          alert(result.errors[0].message);
        } else {
          setData(result.data);
        }
        loadingContext.done();
      })();
    }
  }, [activeSubjectId, studentId]);
  useEffect(() => {
    for (const guardianStudent of guardian.guardianstudentSet) {
      if (guardianStudent?.student.id === studentId) {
        setStudent(guardianStudent?.student)
      }
    }
  }, []);
  return (
    <TeacherPgContainer onlyLogoImgNav={true}>
      <div style={{
        width: '100%'
      }}>
        <BarChart student={student} studentId={studentId} />
        {/* <BarChart student={student}  /> */}
        <MarkTable
          areasOfKnowledge={areasOfKnowledge}
          data={data}
          activeSubjectId={activeSubjectId}
          onChangeActiveIdHandler={setActiveSubjectId}
        />
      </div>
    </TeacherPgContainer>
  );
};

export default ProgressStudent;
