import { FC, useContext, useEffect } from 'react';
import { useHistory }     from 'react-router-dom';
import { LoadingContext } from 'react-router-loading';
import backpackHook       from 'views/assets/backpack-hook.svg';
import { BackpackButton } from 'views/atoms/BackpackButton';
import avatarButton       from 'views/assets/avatar-button.svg';
import cardsButton        from 'views/assets/cards-button.svg';
import controlButton      from 'views/assets/control-button.svg';
import backpackFace       from 'views/assets/backpack-face.svg';
import backpackLeft       from 'views/assets/backpack-left.svg';
import backpackRight      from 'views/assets/backpack-right.svg';
import { StudentMenu }    from 'views/pages/Student/Menus/StudentMenu';
import { useSelector }    from 'react-redux';

import {
  Wrapper,
  AvatarButtonContainer,
  BackpackBase,
  BackpackButtonsContainer,
  BackpackContainer,
  BackpackFace,
  BackpackHook,
  BackpackDecorationLeft,
  BackpackDecorationRight,
  BackPackStyles,
  ControlButtonContainer,
  HookBracket,
} from './Styles';

export const Backpack: FC = () => {

  const loadingContext  = useContext(LoadingContext);
  const history         = useHistory();

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  useEffect(() => {
    loadingContext.done();
  }, []);
  return (
    <>
      <Wrapper>
        <StudentMenu>
          <BackpackContainer>
            <BackPackStyles>
              <BackpackDecorationLeft src={backpackLeft} />
              <HookBracket>
                <BackpackHook src={backpackHook} />
              </HookBracket>
              <BackpackDecorationRight src={backpackRight} />
              <BackpackBase>
                <BackpackButtonsContainer>
                  <AvatarButtonContainer>
                    <BackpackButton
                      onClick ={() => history.push('/avatar')}
                      image   ={avatarButton}
                      width   ={60}
                      height  ={130}
                    />
                  </AvatarButtonContainer>
                  <BackpackButton
                    // onClick={() => history.push('/collectibles/category_1')}
                    onClick ={() => history.push('/collectibles/cards')}
                    image   ={cardsButton}
                    width   ={100}
                    height  ={70}
                  />
                  <ControlButtonContainer>
                    <BackpackButton
                      onClick ={() => history.push('/games/categories')}
                      image   ={controlButton}
                      width   ={100}
                      height  ={70}
                    />
                  </ControlButtonContainer>
                </BackpackButtonsContainer>
                <BackpackFace src={backpackFace} />
              </BackpackBase>
            </BackPackStyles>
          </BackpackContainer>
        </StudentMenu>
      </Wrapper>
    </>
  );
};
