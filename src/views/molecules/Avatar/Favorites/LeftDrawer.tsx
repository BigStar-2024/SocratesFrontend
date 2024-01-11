import { FC }             from 'react';
import { ScreenSize }     from 'constants/screenSize';
import styled             from 'styled-components';
import drawer_accessories from 'views/assets/drawers/drawer_accessories.png';
import drawer_head        from 'views/assets/drawers/drawer-head.png';
import drawer_clothes     from 'views/assets/drawers/drawer_clothes.png';
import drawer_pants       from 'views/assets/drawers/drawer_pants.png';
import floor              from 'views/assets/avatars/floor.png';
import { useSelector }        from 'react-redux';
import { dictionary }   from 'views/pages/Student/Avatar/dictionary'

export const LeftDrawer: FC = () => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  return (
    <DrawerContainer>
      <Drawer>
        <DrawerItem>
          <CenteredRoundIcon >
            <img src={drawer_accessories} />
          </CenteredRoundIcon>
        </DrawerItem>
        <DrawerItem>
          <CenteredRoundIcon >
            <img src={drawer_head} />
          </CenteredRoundIcon>
        </DrawerItem>
        <DrawerItem>
          <CenteredRoundIcon >
            <img src={drawer_clothes} />
          </CenteredRoundIcon>
        </DrawerItem>
        <DrawerItem>
          <CenteredRoundIcon >
            <img src={drawer_pants} />
          </CenteredRoundIcon>
        </DrawerItem>
      </Drawer>
      <Floor src={floor} />
    </DrawerContainer>
  );
};

const Floor = styled.img`
  margin-left: -10px;
  margin-right: -10px;
  width: calc( 100% + 20px);
  height: 15px;
`

const CenteredRoundIcon = styled.div`
  border-radius: 100%;
  background-color: #fff;
  width: 100px;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  img {
    transform: scale(0.8);
  }
`;

const DrawerItem = styled.div`
  background: #A66B44;
  display: flex;
  justify-content: center;
  width: 120px;
  @media screen and (max-width: ${ScreenSize.phone}) {
    width: calc((100vw - 50px ) / 4);
  }
`
const Drawer = styled.div`
  display: grid;
  padding: 10px 15px 10px 15px;
  grid-template-rows: repeat(4, 1fr);
  background: rgb(92,43,12);
  background: linear-gradient(90deg, rgba(92,43,12,1) 0%, rgba(205,112,53,1) 4%, rgba(92,43,12,1) 15%, rgba(92,43,12,1) 94%, rgba(174,93,42,1) 99%);
  row-gap: 10px;
  @media screen and (max-width: ${ScreenSize.phone}) {
  }
`
const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${ScreenSize.phone}) {
    display: none;
  }
`
