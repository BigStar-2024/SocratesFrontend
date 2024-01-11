import { FC, useState }            from 'react';
import styled                      from 'styled-components';
import { Modal }                   from 'views/atoms/Modal';
import { BasicColor, ButtonColor } from 'views/Color';
import { ScreenSize }              from 'constants/screenSize';
import level                       from 'views/assets/level-up.svg';
import { LevelUp }                 from 'views/atoms/Text/LevelUp';
import { Button }                  from 'views/molecules/Button';
import { Icon }                    from 'views/atoms/Icon/Icon';
import { TypoIcon }                from 'views/atoms/Text';
import coin                        from 'views/assets/coin.svg';
import lightning                   from 'views/assets/lightning.svg';
import { IconSize }                from 'views/atoms/Icon/Size';
import { Typography }              from 'views/atoms/Text/typography';


export const LevelUpModal: FC = () => {
  const [isClosed, setIsClosed] = useState(false);
  const handleClose = () => {
    setIsClosed(!isClosed)
  }

  return <>
    {isClosed ? null
      :
      <Modal>
        <LevelUpContent>
          <LevelUpStyles>
            <CloseButton onClick={handleClose}>X</CloseButton>
            <LevelUpDisplay>
              <LevelUpImage src={level} />
              <LevelUpTitle>Level up!</LevelUpTitle>
            </LevelUpDisplay>
            <ButtonContainer>
              <Button value='Continue' color={ButtonColor.signUp} onClick={handleClose} />
            </ButtonContainer>
            <RewardsContainer>
              <Reward>
                <Icon image={coin} size={IconSize.small} />
                <TypoIcon >200 Tokens</TypoIcon>
              </Reward>
              <Reward>
                <Icon image={lightning} size={IconSize.small} />
                <TypoIcon >40 Energy</TypoIcon>
              </Reward>
            </RewardsContainer>
          </LevelUpStyles>
        </LevelUpContent>
      </Modal>

    }
  </>
};

const LevelUpContent = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  background-color: ${BasicColor.background40};
  @media screen and (min-width: ${ScreenSize.tablet}) {
    z-index: 10;
  }
`;
const LevelUpStyles = styled.div`
  width: 80%;
  height: 450px;
  margin: 0 auto;
  padding-top: 15px;
  position: relative;
  background-color: ${BasicColor.white};
  border-radius: 10px;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    height: 700px;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    padding: 10px;
    border-radius: 40px;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    width: 50%;
    height: 600px;
  }
`;
const LevelUpImage = styled.img`
  width: 180px;
  margin-top: 20px;
  margin-bottom: 10px;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    width: 310px;
    height: 370px;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    width: 250px;
    height: 300px;
  }
`;

const LevelUpDisplay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LevelUpTitle = styled(LevelUp)`
  font-size: 30px;
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  width: 70%;
  margin: 15px auto;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    width: 50%;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    width: 20%;
  }
`;

const RewardsContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;
const Reward = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 10px;
`;

const CloseButton = styled.div`
  font-size: 30px;
  font-weight: bold;
  font-family: ${Typography.primary};
  position: absolute;
  right: 5px;
  top: 0;
  border-radius: 10px;
  letter-spacing: 0.25px;
  cursor: pointer;
  @media screen and (min-width: ${ScreenSize.tablet}){
    right: 25px;
    font-size: 35px;
`;


