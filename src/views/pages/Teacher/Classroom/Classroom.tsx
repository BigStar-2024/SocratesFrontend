import { FC, useEffect, useState, useContext }    from 'react';
import { useSelector }          from 'react-redux';
import { LoadingContext }       from 'react-router-loading';
import { useSnackbar }          from 'notistack';
import { loadStripe }           from '@stripe/stripe-js';
import { TeacherPgContainer }   from 'views/molecules/TeacherPgContainer/TeacherPgContainer';
import ClassroomPanel           from 'views/molecules/Classroom/ClassroomPanel'
import AddClassroomForm         from 'views/molecules/Classroom/AddClassroomForm'
import { dictionary }           from './dictionary'
const data = [
  {
    name: 'arminssssssssssss s'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  },
  {
    name: 'aaron'
  }
]

const Classroom: FC = () => {
  const loadingContext    = useContext(LoadingContext);
  const {enqueueSnackbar} = useSnackbar();
  const user              = useSelector((state: any) => state.user);
  const guardian          = useSelector((state: any) => state.guardian);
  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : 'en-us'

  const [isOpenNewForm, setIsOpenNewForm] = useState(false);

  const onNew = () => {
    console.log('will open')
    setIsOpenNewForm(true)
  }

  const onClassroom = (classroom: any) => {

  }
  useEffect(() => {

    if(window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();

  }, []);

  return (
    <TeacherPgContainer onlyLogoImgNav={true} title={dictionary[language]?.classroom}>
      <>
      <AddClassroomForm isOpen={isOpenNewForm} close={() => setIsOpenNewForm(false)} />
      <ClassroomPanel data={data} onNew={onNew} onClassroom={onClassroom}/>
      </>
    </TeacherPgContainer>
  );
};
export default Classroom
