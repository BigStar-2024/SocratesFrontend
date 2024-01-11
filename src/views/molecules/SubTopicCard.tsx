import { FC }         from 'react';
import styled         from 'styled-components';
import { UserInfo }   from 'views/atoms/Text/UserInfo';
import { Subheader }  from 'views/atoms/Text/Subheader';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';

type SubTopicCardProps = {
  onClick: () => void;
  name: string;
};
export const SubTopicCard: FC<SubTopicCardProps> = ({onClick, name}) => {
  return (
    <>
      <SubTopicStyle onClick={onClick}>
        <SubTopicTextContainer>
          <SubTopicTitle isDark={true}>{name}</SubTopicTitle>
          <SubTopicDescription isDark={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </SubTopicDescription>
        </SubTopicTextContainer>
      </SubTopicStyle>
    </>
  );
};

const SubTopicStyle = styled.div`
  width: 140px;
  height: 160px;
  background-color: ${BasicColor.gray20};
  border-radius: 10px;
  cursor: pointer;
  &: hover {
    background-color: ${BasicColor.gray40};
  }
  @media screen and (min-width: ${ScreenSize.tablet}) {
    width: 210px;
  }
`;
const SubTopicTextContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
`;
const SubTopicTitle = styled(Subheader)`
  font-weight: 700;
  font-size: 15px;
  padding-top: 10px;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    font-size: 17px;
  }
`;
const SubTopicDescription = styled(UserInfo)`
  font-weight: 600;
  font-size: 12px;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    font-size: 13px;
  }
`;
