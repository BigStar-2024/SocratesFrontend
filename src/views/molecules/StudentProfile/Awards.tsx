import { FC }           from 'react';
import { ProfileTitle } from 'views/molecules/ProfileTitle';
import {useSelector}    from 'react-redux'
import { dictionary }   from 'views/pages/Student/Settings/dictionary'
export const Awards: FC = () => {

  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : 'en-us'

  return (
    <>
      <ProfileTitle title={dictionary[language]?.awards} />
    </>
  );
};

