import { FC }          from 'react';
import styled          from 'styled-components';
import { BasicColor }  from 'views/Color';
import { Header }      from 'views/atoms/Text/Header';
import { GeneralText } from 'views/atoms/Text/GeneralText';
import { TopicCard }   from './TopicCard';
import { ScreenSize }  from 'constants/screenSize';

type TopicPresentationProps = {
  title: string;
  image: string;
};

export const TopicPresentation: FC<TopicPresentationProps> = ({
  title,
  image,
}) => {
  return (
    <>
      <TopicPresentationStyles>
        <TopicPresentationText>
          <Header isDark={true}>{title}</Header>
          <TopicDescription>
            <GeneralText isDark={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A ipsum,
              et viverra diam imperdiet. Suspendisse neque vulputate justo nec
              egestas est.
            </GeneralText>
          </TopicDescription>
        </TopicPresentationText>
        <TopicCard
          image={image}
          background={BasicColor.orange}
          subject={title}
          isButton={false}
          isActive={true}
        />
      </TopicPresentationStyles>
    </>
  );
};

const TopicPresentationStyles = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    width: 70%;
  }
`;
const TopicPresentationText = styled.div`
  width: 50%;
`;
const TopicDescription = styled.div`
  margin-top: 10px;
`;
