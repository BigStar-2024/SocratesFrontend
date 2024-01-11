import { FC }         from 'react';
import Avatar         from '@mui/material/Avatar';
import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { TypoTitle }  from 'views/atoms/Text';
import { BasicColor } from 'views/Color';
import { AvatarItemWithSkinTone } from 'views/molecules/Avatar/AvatarItemWithSkinTone';

interface AvatarProps {
  clothes?   : any,
  accessory? : any,
  head?      : any,
  skinTone?  : string,
  name       : string,
  size       : number
}

export const ImageAvatar: FC<AvatarProps> = ({ clothes, accessory, head, skinTone, name, size }) => {
  return (
    <Avatar alt="avatar" id='user-avatar' sx={{ border: 'solid gray 1px', background: 'white', width: size + 1, height: size + 1 }} >
      {head ?
        <div style={{ height: '100%', width: '100%', zIndex: 30, position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {clothes && <CurrentClothes src={clothes.image} style={{ width: size, marginTop: size * 2 / 3 }} />}
          <div style={{ width: size, height: size, position: 'absolute', marginTop: -size / 2, zIndex: 2 }}>
            <AvatarItemWithSkinTone url={head.image} skinTone={skinTone ? skinTone : ''} />
          </div>
          {accessory && <CurrentAccessory src={accessory.image} style={{ width: size, marginTop: -size / 2 }} />}
        </div>
        :
        <TypoTitle style={{color: BasicColor.blue}}>{name?.slice(0,2).toUpperCase()}</TypoTitle>
      }
    </Avatar>
  )
}

const CurrentAccessory = styled.img`
  position  : absolute;
  z-index   : 30;
  @media screen and (max-width: ${ScreenSize.phone}) {
  }
`;

const CurrentClothes = styled.img`
  position : absolute;
  z-index  : 1;
  @media screen and (max-width: ${ScreenSize.phone}) {
  }
`;
