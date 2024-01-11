import { FC }               from 'react';
import { TopMenu }          from 'views/organisms/Menu/TeacherTopMenu';
import { MobileMenu }       from 'views/organisms/Menu/MobileMenu';
import avatarPlaceHolder    from 'views/assets/avatars/avatar1.svg';
import { useSelector }      from 'react-redux';
import { TopMenuContainer } from './Style';

export const TeacherMenu: FC = ({ children }) => {
  const user    = useSelector((state: any) => state.user);
  const earning = useSelector((state: any) => state.earning);

  return (
    <div>
      <TopMenuContainer>
        <TopMenu
        />
      </TopMenuContainer>
      <div>
        {children}
      </div>
      <MobileMenu />
    </div>
  );
};

export default TeacherMenu;

