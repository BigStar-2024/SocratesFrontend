import { FC, useEffect, ReactChildren, ReactChild } from 'react';
import { ParentPgNav }                              from 'views/molecules/ParentPgNav/ParentPgNav'
import colorpanel                                   from 'views/assets/colorPannel.svg';
import mess                                         from 'views/assets/mess.svg';
import planet                                       from 'views/assets/planet.svg';
import noteBook                                     from 'views/assets/note-book.svg';
import islandGreen                                  from 'views/assets/island-green.svg';
import islandYellow                                 from 'views/assets/island-yellow.svg';
import gateway                                      from 'views/assets/gateway.svg';
import triangle                                     from 'views/assets/triangle.svg';
import pencil                                       from 'views/assets/pencil.svg'
import {
  Container,
  IslandGreen,
  IslandYellow,
  Planet,
  Mess,
  ColorPanel,
  Triangle,
  Pencil,
  GateWay,
  NoteBook,
  Center
} from './Style'

type ParentPgContainerProps = {
  onlyLogoImgNav: boolean;
  children: ReactChild | ReactChildren;
};

export const ParentPgContainer: FC<ParentPgContainerProps> = ({onlyLogoImgNav, children=(<></>)}) => {

  useEffect(() => {
  }, []);
  return (
    <Container>
      <IslandGreen src={islandGreen} />
      <IslandYellow src={islandYellow} />
      <Planet src={planet} />
      <Mess src={mess} />
      <ColorPanel src={colorpanel} />
      <Triangle src={triangle} />
      <Pencil src={pencil} />
      <GateWay src={gateway} />
      <NoteBook src={noteBook} />
      <ParentPgNav onlyLogoImg={onlyLogoImgNav}/>
      <Center>{children}</Center>
    </Container>
  );
};
