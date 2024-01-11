import { FC } from 'react';
import { ScreenSize } from 'constants/screenSize';
import styled from 'styled-components';
import { BasicColor } from 'views/Color';
import SocratesImg from 'views/assets/socrates.svg';
import dictionary from 'constants/commonDictionary';
import { Link } from '@mui/material';

const ContactBox: FC<{ language: string }> = ({ language }) => {

  return (
    <ContactContainer>
      <ContactHeader>
        <img src={SocratesImg} className='p-l-20 p-r-10' />
        <div className='font-s-60 line-h-75 font-w-6 text-center p-r-25'>
          {dictionary[language]?.welcome} <br />
          {dictionary[language]?.to_socrates}
        </div>
      </ContactHeader>
      <ContactBody>
        <div className="font-w-8 font-s-30 line-h-35 p-b-25">
          {dictionary[language]?.contact_us}
        </div>
        <div className='flex-col'>
          <div className="font-w-7 font-s-35 p-b-20">
            {dictionary[language]?.we_are_happy_to_help_you}
          </div>
          <div className="flex justify-space-between">
            <Link href='https://www.withsocrates.com/contact/' variant='body1' >{dictionary[language]?.contact_us}</Link>
            <Link href='https://www.withsocrates.com/faq/' variant='body1' >{dictionary[language]?.faq}</Link>
            <Link href='https://www.withsocrates.com/membership/' variant='body1' >{dictionary[language]?.plans}</Link>
          </div>
        </div>
      </ContactBody>
    </ContactContainer>
  );
};
export default ContactBox;

const ContactContainer = styled.div`
    width      : 510px;
    display        : flex;
    flex-direction : column;
    border-width   : 1px;
    border-color   : ${BasicColor.blue};
    border-style   : solid;
    @media screen and (max-width: ${ScreenSize.tablet}) {
      display: none;
    }
`;


const ContactHeader = styled.div`
    background-color : white;
    display          : flex;
    flex-direction   : row;
    justify-content  : center;
    align-items      : center;
    padding-top      : 25px;
    padding-bottom   : 25px;
`;

const ContactBody = styled.div`
    background-color : ${BasicColor.blue};
    display          : flex;
    flex-direction   : column;
    justify-content  : center;
    align-items      : center;
    flex-grow        : 1;
    color            : white;
`;
