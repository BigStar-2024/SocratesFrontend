import { FC }               from 'react';
import { useSelector }      from 'react-redux';
import { AvatarSelector }   from 'views/molecules/Avatar/Favorites/Favorites';
import { StudentMenu }      from 'views/pages/Student/Menus/StudentMenu';
import { PageTitle }        from 'views/molecules/PageTitle';
import { dictionary }       from './dictionary';
import { AvatarContainer, Wrapper
} from './Style';

export const Avatar: FC = () => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  return (
    <Wrapper>
      <StudentMenu>
        <AvatarContainer>
          <PageTitle title={dictionary[language]?.myAvatar} />
          <AvatarSelector />
        </AvatarContainer>
      </StudentMenu>
    </Wrapper>
  );
};
