import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';
import { CardDialog } from './CardDialog';
import { getDownUrlByFilename } from 'app/firebase';
import { CardDescription } from '../CardDescription';
import { TypoGeneralText } from 'views/atoms/Text';
import { ICollectibleCard } from 'app/entities/collectibles'
import { Skeleton } from '@mui/material';
import { Box } from '@mui/material';
import { BuyCardDgContent } from './BuyCardDgContent';

export const Gemcard: FC<ICollectibleCard> = ({
  imgUrl,
  purchased,
  amount,
  description,
  name,
  firebaseName,
  id
}) => {
  // open dialog when click card
  const [open, setOpen] = useState(false);

  // get image url from firebase and set
  const [img, setImg] = useState('');

  // display skeleton while image is loading
  const [loaded, setLoaded] = useState(false);

  // action when image is clicked
  const onCardClick = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false)
  }

  const fetchFirebaseUrls = async () => {
    const link = await getDownUrlByFilename(firebaseName, imgUrl);
    setImg(link ? link : '');
  };

  useEffect(() => {
    fetchFirebaseUrls();
  }, []);
  return (
    <Box>
      <StyledCard onClick={() => onCardClick()}>
        <img
          style={loaded ? { objectFit: 'fill' } : { display: 'none' }}
          className='loaded'
          alt={imgUrl}
          src={img}
          loading='eager'
          onLoad={() => {
            setLoaded(true);
          }}
        />
        <Overlay style={purchased ? { display: 'none' } : {}} />
        <Skeleton variant='rectangular' animation='wave' sx={loaded ? { display: 'none' } : { width: '100%', height: '100%' }} />
      </StyledCard>
      <TypoGeneralText style={{ textAlign: 'center' }}>{amount} / 1</TypoGeneralText>
      <CardDialog
        fullWidth='true'
        dialogContent={
          purchased ?
            <CardDescription
              imgUrl={imgUrl}
              firebaseName={firebaseName}
              description={description}
              name={name}
              id={id}
            /> :
            <BuyCardDgContent />
        }
        open={close}
        isOpen={open}
      />
    </Box>
  );
};

const Overlay = styled.div`
  position: absolute;
  background: ${BasicColor.gray80};
  inset: -2px;
  opacity: 0.7;
  border-radius: inherit;
`;

const StyledCard = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-content: center;
  width: 160px;
  height: 220px;
  box-shadow: 0 1px 1rem -4px #000;
  border-radius: 15px;
  transition: all 250ms ease-in-out;
  cursor: pointer;
  overflow: hidden;

  @media screen and (max-width: ${ScreenSize.tablet}) {
    width: 100px;
    height: 140px;
  }

  &:hover {
    box-shadow: 0px 1px 20px 0px #fb8500;
    transform: translateY(-5px);
  }
`;
