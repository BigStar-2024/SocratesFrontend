import { FC, useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ParentPgContainer } from 'views/molecules/ParentPgContainer/ParentPgContainer';
import { BarChart } from 'views/molecules/Chart/BarChart';
import MarkTable from 'views/molecules/Table/MarkTable';
import { LoadingContext } from 'react-router-loading';
import query from 'api/queries/get';
import { useSelector } from 'react-redux';
import { TopicReport, AreasOfKnowledge } from 'api/fragments/topicFragments';
import { useQuery } from 'react-query'
import { doFetchStudentById } from 'app/actions/guardianActions';

interface StudentIdParam {
  studentId: string;
}

export const ParentReporting: FC = () => {
  const user = useSelector((state: any) => state.user);
  const { studentId } = useParams<StudentIdParam>();
  const { data: student } = useQuery(['fetch-kids-list', studentId, user.token], () => doFetchStudentById(+studentId, user.token))

  const loadingContext = useContext(LoadingContext);
  const [activeSubjectId, setActiveSubjectId] = useState<number>(-1);
  const [areasOfKnowledge, setAreasOfKnowledge] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {

    if (window.Tawk_API?.onLoaded) if (window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();

    (async () => {
      // Get All Subject
      const res: any = await query('', AreasOfKnowledge(), user.token).catch(e => ({ success: false }));
      if (res.success === false) {
        return
      }
      const result: any = await res.json();
      if (result.errors && !result.data) {
        alert(result.errors[0].message);
      } else {
        setAreasOfKnowledge(result.data.areasOfKnowledge)
        let iii = 4;
        for (let i = 0; i < result.data.areasOfKnowledge.length; i++) {
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
        const res: any = await query('', TopicReport(parseInt(studentId), activeSubjectId), user.token).catch(e => ({ success: false }));
        if (res.success === false) {
          return
        }
        const result: any = await res.json();
        console.log(result);
        if (result.errors && !result.data) {
          alert(result.errors[0].message);
        } else {
          setData(result.data);
        }
        loadingContext.done();
      })();
    }
  }, [activeSubjectId, studentId]);

  return (
    <ParentPgContainer onlyLogoImgNav={false}>
      {student &&
        <div style={{
          width: '100%'
        }}>
          <BarChart student={student} studentId={studentId} />
          <MarkTable
            areasOfKnowledge={areasOfKnowledge}
            data={data}
            activeSubjectId={activeSubjectId}
            onChangeActiveIdHandler={setActiveSubjectId}
          />
        </div>
      }
    </ParentPgContainer>
  );
};
