import { FC }         from 'react';
import styled         from 'styled-components';
import ribbon         from 'views/assets/ribbon.svg';
import { ScreenSize } from 'constants/screenSize';
import { TypoHeader } from 'views/atoms/Text';
import dark_green_ribbon_sharp from 'views/assets/others/dark_green_ribbon_sharp.svg'

export const PageTitle: FC<{title: string}> = ({title}) => {
  return (
    <CardTitle>
      <TypoHeader style={{margin: 0}}>{title}</TypoHeader>
    </CardTitle>
  );
};
export const ParentPageTitle: FC<{title: string}> = ({title}) => {
  return (
    <ParentTitleContainer>
      <TypoHeader style={{margin: 0, color: 'white'}}>{title}</TypoHeader>
    </ParentTitleContainer>
  );
};

const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  background-image: url(${ribbon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  padding: 25px 50px;
  margin: 50px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: ${ScreenSize.phone}) {
    width: 100%;
    margin: 0;
    padding: 10px 0 10px 0;
    background-image: none;
    background-color: orange;
  }
`;

const ParentTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  background-image: url(${dark_green_ribbon_sharp});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  padding: 15px;
  margin-top: 50px;

  @media screen and (max-width: ${ScreenSize.phone}) {
    width: 100%;
    margin: 0;
    padding: 10px 0 10px 0;
    background-image: none;
    background-color: orange;
  }
`;
