import { FC }               from 'react';
import { TopMenu }          from 'views/organisms/Menu/TopMenu';
import { MobileMenu }       from 'views/organisms/Menu/MobileMenu';
import avatarPlaceHolder    from 'views/assets/avatars/avatar1.svg';
import { useSelector }      from 'react-redux';
import { TopMenuContainer } from './Style';

export const StudentMenu: FC = ({ children }) => {
  const user    = useSelector((state: any) => state.user);
  const earning = useSelector((state: any) => state.earning);

  return (
    <div>
      <TopMenuContainer>
        <TopMenu
          rank         = {earning.rank}
          level        = {earning.level || 0}
          exp          = {earning.exp || 0}
          expMax       = {earning.expMax || 0}
          icon         = {user?.avatar || avatarPlaceHolder}
          userName     = {user?.username || 'None'}
          progress     = {earning.exp / earning.expMax * 100}
          energyCharge = {earning.energyCharge}
          balance      = {earning.balance || 0}
        />
      </TopMenuContainer>
      <div>
        {children}
      </div>
      <MobileMenu />
    </div>
  );
};

