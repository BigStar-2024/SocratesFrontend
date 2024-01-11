import { FC } from 'react';
import dictionary from 'constants/commonDictionary';

const FormBottomDescription: FC<{ language: string }> = ({ language }) => {

  return (
    <div className='p-t-30 font-s-15 inline'>
      {dictionary[language]?.by_click_create_agree}{' '}
      <div className='font-w-9 inline'>
        {dictionary[language]?.priviacy_policy}, {dictionary[language]?.terms_and_conditions}
      </div>{' '}
      {dictionary[language]?.and} <div className='font-w-9 inline'>{dictionary[language]?.children_privacy_policy}</div>
    </div>
  );
};
export default FormBottomDescription;
