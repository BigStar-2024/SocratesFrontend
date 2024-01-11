import { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Route, Switch } from 'react-router-loading';
import { fadeIn } from 'react-animations';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { LogIn } from 'views/pages/Login/Login';
import { Welcome } from 'views/pages/Welcome/Welcome';
import { Avatar } from 'views/pages/Student/Avatar/Avatar';
import { MyProfile } from 'views/pages/Student/Settings/MyProfile';
import { Backpack } from 'views/pages/Student/Backpack/Backpack';
import { Games } from 'views/pages/Student/Games/Games';
import { GamesMenu } from 'views/pages/Student/Games/GamesMenu/GamesMenu';
import { ConfirmAccount } from 'views/pages/ConfirmAccount/ConfirmAccount';
import { KnowledgeMap } from 'views/pages/Student/KnowledgeMap/KnowledgeMap';
import { SubjectsMenu } from 'views/pages/Student/Menus/SubjectMenu/SubjectsMenu';
import { TopicsMenu } from 'views/pages/Student/Menus/TopicsMenu/TopicsMenu';
import { Wardrobe } from 'views/pages/Student/Avatar/Wardrobe';
import { Payment } from 'views/pages/Parent/Payment/Payment';
import CreateParent from 'views/pages/Parent/CreateParent/CreateParent';
import KidsList from 'views/pages/Parent/KidsList/KidsList';
import { Store } from 'app/configureStore';
import { Settings } from 'views/pages/Parent/Settings/Settings';
// import { Report }                from 'views/pages/Parent/Report/Report';
import { Bank } from 'views/pages/Student/Bank/Bank';
import { Cards } from 'views/pages/Student/Collectibles/ByCards';
import { MyCardCollection } from 'views/pages/Student/Collectibles/MyCards';
import NewKids from 'views/pages/Parent/NewKids/UpdatedNewKids';
import { Spinner } from 'views/atoms/Spinner';
import { ParentReporting } from 'views/pages/Parent/KidReport/Reporting';
import { KidsTreasureTrack } from 'views/pages/Student/TreasureTrack/TreasureTrack';
import { KidsProgress } from 'views/pages/Student/Progress/Progress';
//teacher center
import TeacherSignup from 'views/pages/Teacher/TeacherSignup/TeacherSignup';
import SchoolSignup from 'views/pages/Teacher/SchoolSignup/SchoolSignup'
import TeacherPayment from 'views/pages/Teacher/Payment/Payment'
import Classroom from 'views/pages/Teacher/Classroom/Classroom'
import Students from 'views/pages/Teacher/Students/Students'
import Groups from 'views/pages/Teacher/Students/Groups'
import AddStudent from 'views/pages/Teacher/AddStudent/AddStudent';
import Assignment from 'views/pages/Teacher/Assignment/Assignment';
import Results from 'views/pages/Teacher/Results/Results';
import ProgressStudent from 'views/pages/Teacher/ProgressStudent/ProgressStudent';
import { AIQuestion } from 'views/pages/Student/Question/AIQuestions';
import ControlAOK from 'views/pages/Teacher/ControlAOK/ControlAOK';
// import SettingForm from 'views/molecules/Classroom/SettingForm'
import TeacherSettings from 'views/pages/Teacher/Settings/Settings'
import 'animate.css';
import Certificates from 'views/pages/Teacher/Certificates/Certificates';
import { GameIframe } from 'views/pages/Student/Games/GameIframe';
import { ProgressReview } from 'views/pages/Student/Progress/ProgressReview';
import { Error404 } from 'views/pages/Welcome/Error404';
import { TeacherCreateAccount } from 'views/pages/Teacher/SelectCreateType/TeacherCreateAccount';


const PrivateRoute = ({ requireAuth = true, loading = false, ...rest }) => {
  const user = useSelector((state: Store) => state.user);
  const isAuthenticated = !!user?.token;
  return loading ? (
    <Route loading {...rest}>
      {requireAuth ? (
        isAuthenticated ? (
          rest.children
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      ) : (
        rest.children
      )}
    </Route>
  ) : (
    <Route {...rest}>
      {requireAuth ? (
        isAuthenticated ? (
          rest.children
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      ) : (
        rest.children
      )}
    </Route>
  );
};


export function Routes() {
  const location = useLocation();
  const FadeIn = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`} ;
  `;

  useEffect(() => {
    if (window.Tawk_API?.onLoaded) window.Tawk_API?.hideWidget();
  }, [location])
  return (
    <FadeIn>
      <Switch loadingScreen={Spinner} location={location}>
        <PrivateRoute exact path="/" requireAuth={false}>
          <Welcome />
        </PrivateRoute>
        <PrivateRoute path="/login" requireAuth={false}>
          <LogIn />
        </PrivateRoute>
        <PrivateRoute
          loading={true}
          path="/question/:mode/:aokId"
          requireAuth={false}
        >
          {/* <Question /> */}
          <AIQuestion />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/avatar" >
          <Avatar />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/wardrobe" >
          <Wardrobe />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/collectibles/cards">
          <Cards />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/collectibles/mycards">
          <MyCardCollection />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/bank">
          <Bank />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/profile">
          <MyProfile />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/home">
          <KidsTreasureTrack />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/progress">
          <KidsProgress />
        </PrivateRoute>
        <PrivateRoute loading={true} exact path="/review">
          <ProgressReview />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/backpack">
          <Backpack />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/games/categories">
          <Games />
        </PrivateRoute>
        <PrivateRoute loading={true} exact path="/games/:category">
          <GamesMenu />
        </PrivateRoute>
        <PrivateRoute loading={true} exact path="/games/:token/:gamePath">
          <GameIframe />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/map">
          <KnowledgeMap />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/confirmation">
          <ConfirmAccount />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/subjects">
          <SubjectsMenu />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/topic/:topicId">
          <TopicsMenu />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/parent/setting">
          <Settings />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/student/settings">
          <Settings />
        </PrivateRoute>
        {/* <PrivateRoute loading={true} path="/parent/report">
            <Report />
          </PrivateRoute> */}
        <PrivateRoute
          loading={true}
          path="/parent/reporting/:studentId"
        >
          <ParentReporting />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/parent/payment">
          <Payment />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/parent/create" requireAuth={false}>
          <CreateParent />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/kids/list">
          <KidsList />
        </PrivateRoute>
        <PrivateRoute loading={true} path="/kids/new">
          <NewKids />
        </PrivateRoute>

        <PrivateRoute loading={false} requireAuth={false} path="/teacher/selectCreateType">
          <TeacherCreateAccount />
          {/* <SelectCreateType /> */}
        </PrivateRoute>
        <PrivateRoute loading={false} requireAuth={false} path="/teacher/teacherSignup">
          <TeacherSignup />
        </PrivateRoute>
        <PrivateRoute loading={true} requireAuth={false} path="/teacher/schoolSignup">
          <SchoolSignup />
        </PrivateRoute>
        <PrivateRoute loading={true} requireAuth={false} path="/teacher/payment/:productType">
          <TeacherPayment />
        </PrivateRoute>
        <PrivateRoute loading={false} requireAuth={false} path="/teacher/classroom">
          <Classroom />
        </PrivateRoute>
        <PrivateRoute loading={false} requireAuth={false} path="/teacher/students">
          <Students />
        </PrivateRoute>
        <PrivateRoute loading={false} requireAuth={false} path="/teacher/settings">
          <TeacherSettings />
        </PrivateRoute>
        <PrivateRoute loading={false} requireAuth={false} path="/teacher/certificates">
          <Certificates />
        </PrivateRoute>
        <PrivateRoute loading={false} requireAuth={false} path="/teacher/groups">
          <Groups />
        </PrivateRoute>
        <PrivateRoute loading={false} requireAuth={false} path="/teacher/addStudent" component={AddStudent} />
        <Route path="/teacher/control-aok">
          <ControlAOK />
        </Route>
        {/* {process.env.NODE_ENV === 'development' ? ( */}
        <Route path="/assignment">
          {/* <SettingForm isOpen={true} close={()=>{}}/> */}
          <Assignment />
        </Route>
        <Route path="/results">
          {/* <SettingForm isOpen={true} close={()=>{}}/> */}
          <Results />
        </Route>
        <Route path="/teacher-progress">
          <ProgressStudent />
        </Route>
        {/* ) : null} */}
        <Route path="*" component={Error404} />
        {/* <Redirect from="/" to="/login" /> */}
      </Switch>
    </FadeIn>
  );
}
