import { FC, useState }   from 'react';
import { ScreenSize }     from 'constants/screenSize';
import styled             from 'styled-components';
import drawer_accessories from 'views/assets/drawers/drawer_accessories.png';
import drawer_head        from 'views/assets/drawers/drawer-head.png';
import drawer_clothes     from 'views/assets/drawers/drawer_clothes.png';
import drawer_pants       from 'views/assets/drawers/drawer_pants.png';
import floor              from 'views/assets/avatars/floor.png';
import { useSelector }        from 'react-redux';
import { dictionary }   from 'views/pages/Student/Avatar/dictionary'

interface AtomDrawerProps {
  onAtomClick?: (atomId: number) => (void)
}
export const AtomsDrawer: FC<AtomDrawerProps> = ({ onAtomClick }) => {

  const [current, setCurrent] = useState(0)

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  const setCurrentAtomId = (val: any) => {
    if (val < 4) {
      onAtomClick ? onAtomClick(val) : null
      setCurrent(val)
    }
  };

  return (
    <DrawerContainer>
      <Drawer>
        <DrawerItem>
          <CenteredRoundIcon onClick={() => setCurrentAtomId(0)} style={0 === current ? { background: 'yellow' } : {}}>
            <img src={drawer_accessories} />
          </CenteredRoundIcon>
        </DrawerItem>
        <DrawerItem>
          <CenteredRoundIcon onClick={() => setCurrentAtomId(1)} style={1 === current ? { background: 'yellow' } : {}}>
            <img src={drawer_head} />
          </CenteredRoundIcon>
        </DrawerItem>
        <DrawerItem>
          <CenteredRoundIcon onClick={() => setCurrentAtomId(2)} style={2 === current ? { background: 'yellow' } : {}}>
            <img src={drawer_clothes} />
          </CenteredRoundIcon>
        </DrawerItem>
        <DrawerItem>
          <CenteredRoundIcon onClick={() => setCurrentAtomId(3)} style={3 === current ? { background: 'yellow' } : {}}>
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
  @media screen and (max-width: ${ScreenSize.phone}) {
    display: none;
  }
`

const CenteredRoundIcon = styled.div`
  border-radius: 100%;
  background-color: #fff;
  width: 100px;
  height: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    transform: scale(0.8);
  }
  @media screen and (max-width: ${ScreenSize.phone}) {
    width: calc(100vw / 4);
    height: auto;
    img {
      width: calc( 100vw / 5 );
      height: calc( 100vw / 5 );
    }
  }
`;

const DrawerItem = styled.div`
  background: #A66B44;
  display: flex;
  justify-content: center;
  width: 120px;
  @media screen and (max-width: ${ScreenSize.phone}) {
    width: calc((100vw - 30px) / 4);
    height: calc((100vw - 30px) / 4);
    // width: 100%;
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
    grid-template-rows: 1fr;
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
    column-gap: 10px;
    width: 100%;
  }
`
const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
`
