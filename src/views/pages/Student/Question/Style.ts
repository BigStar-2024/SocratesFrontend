
import styled from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import background from 'views/assets/colored-shapes-bg.svg';
import { BasicColor } from 'views/Color';

export const Wrapper = styled.div`
  background-image   :  url(${background});
  background-repeat  :  no-repeat;
  background-size    :  cover;
  @media (max-width  : ${ScreenSize.tablet}) {
    height: 100vh;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    height: 100vh;
  }
`;

export const ProgressWrapper = styled.div`
  position: sticky;
  position: -webkit-sticky;
  z-index: 100;
  display         : flex;
  justify-content : center;
`;

export const Options = styled.div`
  display              : grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (min-width: ${ScreenSize.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const OptionWrapper = styled.div`
  padding-top    : 40px;
  padding-bottom : 40px;
`;

export const Option = styled.img`
  @media (min-width: ${ScreenSize.tablet}) {
    width: 8rem;
  }
`;

export const AnswerWrapper = styled.div`
  background-color    : #3f3f3f;
  border-radius       : 16px;
  padding             : 1rem;
  margin              : 1rem;
  padding-top         : 2rem;
  display             : grid;
  grid-template-rows  : auto auto auto;
  @media (min-width: ${ScreenSize.tablet}) {
    margin              : 1rem;
    margin-top          : 5rem;
    margin-bottom       : 7rem;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    margin: 1rem;
  }
`;

export const Container = styled.div`
  width           : 90%;
  display         : flex;
  flex-direction  : column;
  justify-content : center;
  margin          : 0 auto;
  text-align      : center;

  @media (min-width: ${ScreenSize.tablet}) {
    // margin-top: 120px;
    max-width: 1366px;
  }
`;

export const Answers = styled.div`
  display              : grid;
  grid-template-columns: 1fr 1fr;
  grid-gap             : 1rem;
  margin-top           : 1rem;
  @media (min-width: ${ScreenSize.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const AnswerForm = styled.form`
  grid-column : 1/3;
  width       : 100%;
  margin      : 0 auto;
`;
export const Submit = styled.div`
  padding-left    : 2rem;
  padding-right   : 2rem;
  padding-bottom  : 0;
  padding-top     : 1rem;
`;

export const CongratsDgContainer = styled.div`
  display         : flex;
  align-items     : center;
  overflow        : hidden;
  flex-direction  : column;
  width           : 50vw;
  height          : 80vh;
  justify-content : space-evenly;

  .background {
    position: absolute;
    inset   :    -5px;
  }

  .icons-container {
    width           : 500px;
    display         : flex;
    flex-direction  : row;
    justify-content : space-around;
    z-index         : 2;
  }

  img {
    z-index : 1;
    width   : 150px;
    @media (max-width: ${ScreenSize.phone}) {
      width: 30vw;
    }
  }

  button {
    background   : ${BasicColor.shadeBrown};
    border       : 0;
    border-radius: 20px;
    color        : white;
    height       : 45px;
    padding      : 0 20px 0 20px;
    z-index      : 1;
    font-size    : 18px;
    @media (max-width: ${ScreenSize.phone}) {
      padding: 0 10px 0 10px;
    }
    &:hover {
      pointer    : cursor;
      box-shadow : 0 1px 1rem -3px orange;
      cursor     : pointer;
    }
  }
`;
