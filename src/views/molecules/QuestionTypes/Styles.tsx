import styled from 'styled-components';
import { ScreenSize } from 'constants/screenSize';

export const BlackBoard = styled.div`
  background-color: #13705f;
  border: 7px solid #5c2100;
  border-radius: 16px;
  min-height: 400px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  @media (min-width: ${ScreenSize.tablet}) {
    margin: 1rem;
    height: auto;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    height: 100%;
  }
`;
export const AnswersContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    flex-direction: row;
    grid-gap: 10px;
  }
`;

export const ImageAssetContainer = styled.div<{
  imageLength?: number;
}>`
  display: ${(props: any) => (props.imageLength > 0 ? 'grid' : 'none')};
  grid-template-columns: repeat(auto-fit, minmax(110px, 300px));
  justify-content: center;
  width: 100%;
  grid-gap: 10px;
  margin: 10px auto;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    width: 50%;
  }
`;
export const ImageAsset = styled.img`
  width: 100%;
`;
export const QuestionContainer = styled.div`
  width: 90%;
  margin: 15px auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  // @media screen and (min-width: ${ScreenSize.desktop}) {
  //   justify-content: left;
  // }
`;
export const BlockAnswers = styled.div<{
  isAnswered: boolean;
}>`
  width: 100%;
  height: 100%;
  position: absolute;
  padding-left: 5px;
  display: ${props => (props.isAnswered ? 'initial' : 'none')};
`;
export const TextOptionsList = styled.div`
  width: 90%;
  margin: 20px auto;
  position: relative;
  text-align: left;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    height: 50%;
    margin: 20px auto;
    width: 70%;
  }
`;

export const AssistorContainer = styled.div`
  width: 95%;
  max-width: 400px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 30px auto;
`;
export const AnswerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
