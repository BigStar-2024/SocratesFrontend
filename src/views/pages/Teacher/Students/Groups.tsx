import { FC, useEffect, useState, useContext } from 'react';
import { useSelector }          from 'react-redux';
import { LoadingContext }       from 'react-router-loading';
import { useSnackbar }          from 'notistack';
import { loadStripe }           from '@stripe/stripe-js';
import { TeacherPgContainer }   from 'views/molecules/TeacherPgContainer/TeacherPgContainer';
import GroupsPanel              from 'views/molecules/Classroom/GroupsPanel'
import AddClassroomForm         from 'views/molecules/Classroom/AddClassroomForm'
import ChooseNewStudentTypeDlg  from 'views/molecules/Classroom/ChooseNewStudentTypeDlg'
import AddExistStudentDlg       from 'views/molecules/Classroom/AddExistStudent'
import AddNewStudent            from 'views/molecules/Classroom/AddNewStudent'
import { dictionary }           from './dictionary'
import { useHistory }           from 'react-router-dom';
import { TabContainer, Tab, SelectedTab } from './Style'
const data = [
  {
    name: 'armin',
    type: 'normal',
    grade: 'greade',
    lastName: 'last name',
    classroom: 'classroom',
    username: 'user name',
  },{
    name: 'armin',
    type: 'normal',
    grade: 'greade',
    lastName: 'last name',
    classroom: 'classroom',
    username: 'user name',
  },{
    name: 'armin',
    type: 'normal',
    grade: 'greade',
    lastName: 'last name',
    classroom: 'classroom',
    username: 'user name',
  },{
    name: 'armin',
    type: 'normal',
    grade: 'greade',
    lastName: 'last name',
    classroom: 'classroom',
    username: 'user name',
  },
]

const Students: FC = () => {
  const loadingContext    = useContext(LoadingContext);
  const {enqueueSnackbar} = useSnackbar();
  const user              = useSelector((state: any) => state.user);
  const guardian          = useSelector((state: any) => state.guardian);
  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : 'en-us'
  const history           = useHistory();

  const [isOpenNewForm, setIsOpenNewForm] = useState(false);
  const [isOpenNewType, setIsOpenNewType] = useState(false);
  const [isExistingNewAccountDlgOpen, setIsExistingNewAccountDlgOpen] = useState(false);
  const [isAddNewAccountDlgOpen, setIsAddNewAccountDlgOpen]           = useState(false);

  const onNew = () => {
    console.log('will open')
    setIsOpenNewType(true)
  }

  const onStudent = (classroom: any) => {

  }
  useEffect(() => {

    if(window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();

  }, []);

  return (
    <TeacherPgContainer onlyLogoImgNav={true} title={dictionary[language]?.classroom}>
      <>
      <TabContainer>
        <Tab onClick={() => history.push('/teacher/students')}>{dictionary[language]?.students}</Tab>
        <SelectedTab onClick={() => history.push('/teacher/groups')}>{dictionary[language]?.group}</SelectedTab>
      </TabContainer>

      <ChooseNewStudentTypeDlg
        isOpen={isOpenNewType}
        close={() => setIsOpenNewType(false)}
        openExistingNewAccountDlg = {() => setIsExistingNewAccountDlgOpen(true)}
        openNewAccountDlg = {() => setIsAddNewAccountDlgOpen(true)}
      />
      <AddExistStudentDlg  isOpen={isExistingNewAccountDlgOpen} close={() => setIsExistingNewAccountDlgOpen(false)}/>
      <AddNewStudent isOpen={isAddNewAccountDlgOpen} close={() => setIsAddNewAccountDlgOpen(false)} />
      {/* <AddClassroomForm isOpen={isOpenNewForm} close={() => setIsOpenNewForm(false)} /> */}
      <GroupsPanel data={data} onNew={onNew} onStudent={onStudent}/>
      </>
    </TeacherPgContainer>
  );
};
export default Students
