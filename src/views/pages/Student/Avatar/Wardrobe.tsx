import { FC }                         from 'react';
import { useSelector }                from 'react-redux';
import { WardrobeSelector }           from 'views/molecules/Avatar/Wardrobe/WardrobeSelector';
import { AvatarContainer, Wrapper }   from './Style';
import { StudentMenu }                from 'views/pages/Student/Menus/StudentMenu';
import { PageTitle }                  from 'views/molecules/PageTitle';
import { dictionary }                 from './dictionary';

export const Wardrobe: FC = () => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  return (
    <Wrapper>
      <StudentMenu>
        <AvatarContainer>
          <PageTitle title={dictionary[language]?.wardrobe} />
          <WardrobeSelector />
        </AvatarContainer>
      </StudentMenu>
    </Wrapper>
  );
};
