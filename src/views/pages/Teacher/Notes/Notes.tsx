import { FC, useEffect, useState, useContext }    from 'react';
import { useSelector }          from 'react-redux';
import { LoadingContext }       from 'react-router-loading';
import { useSnackbar }          from 'notistack';
import { loadStripe }           from '@stripe/stripe-js';
import { TeacherPgContainer }   from 'views/molecules/TeacherPgContainer/TeacherPgContainer';
import ClassroomPanel           from 'views/molecules/Classroom/ClassroomPanel'
import AddClassroomForm         from 'views/molecules/Classroom/AddClassroomForm'
import ContentForm              from 'views/molecules/Notes/ContentForm'
import StudentLists             from 'views/molecules/Notes/StudentLists'
import { dictionary }           from './dictionary'
const data = [
  {
    name: 'aaron',
    isChecked: false
  }, {
    name: 'aaron',
    isChecked: false
  }, {
    name: 'aaron',
    isChecked: false
  }, {
    name: 'aaron',
    isChecked: false
  }, {
    name: 'aaron',
    isChecked: false
  }, {
    name: 'aaron',
    isChecked: false
  }, {
    name: 'aaron',
    isChecked: false
  }, {
    name: 'aaron',
    isChecked: false
  },
]

const Notes: FC = () => {
  const loadingContext    = useContext(LoadingContext);
  const {enqueueSnackbar} = useSnackbar();
  const user              = useSelector((state: any) => state.user);
  const guardian          = useSelector((state: any) => state.guardian);
  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : 'en-us'

  const [data, setData]   = useState<any>([]);
  const [isOpenNewForm, setIsOpenNewForm] = useState(false);

  const onNew = () => {
    console.log('will open')
    setIsOpenNewForm(true)
  }

  const onClassroom = (classroom: any) => {

  }
  useEffect(() => {

    if(window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();
    setData([
      {
        name: 'aaron',
        isChecked: false
      }, {
        name: 'aaron',
        isChecked: false
      }, {
        name: 'aaron',
        isChecked: false
      }, {
        name: 'aaron',
        isChecked: false
      }, {
        name: 'aaron',
        isChecked: false
      }, {
        name: 'aaron',
        isChecked: false
      }, {
        name: 'aaron',
        isChecked: false
      }, {
        name: 'aaron',
        isChecked: false
      },
    ])
  }, []);

  return (
    <TeacherPgContainer onlyLogoImgNav={true} title={dictionary[language]?.notes}>
      <div className="flex">
        <ContentForm />
        <StudentLists data={data} setData={setData} />
      </div>
    </TeacherPgContainer>
  );
};
export default Notes
