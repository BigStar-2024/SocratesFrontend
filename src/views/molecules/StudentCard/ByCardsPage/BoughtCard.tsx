import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BasicColor } from 'views/Color';
import ReactLoading from 'react-loading';
import useSound from 'use-sound';
import purchaseSound from 'views/assets/audios/mixkit-coin-win-notification.wav';
import { ScreenSize } from 'constants/screenSize';
import { getDownUrlByFilename } from 'app/firebase';
import { CardDescription } from '../CardDescription';
import { CardDialog } from 'views/molecules/StudentCard/MyCards/CardDialog';
import { ICollectibleCardDescription } from 'app/entities/collectibles'

/**
 * @author BruceLee
 * Displaying a bought package of 3 cards when a user pressed bought button
 * Turn around image effect and sound effect added
 */
export const BoughtCard: FC<ICollectibleCardDescription> = ({ imgUrl, firebaseName, description, name, id }) => {
  // state updates when user clicks an image
  const [open, setOpen] = useState(false);
  const [openDg, setOpenDg] = useState(false);
  const [url, setUrl] = useState('')

  const [play] = useSound(purchaseSound);

  // state to know that image is loaded, rotating effect only works when image is fully loaded
  const [loaded, setLoaded] = useState(false);

  const fetchFirebaseUrl = async (mounted: boolean, _imgName: string, _dir: string) => {
    const res = await getDownUrlByFilename(_dir, _imgName)
    if (res) {
      if (mounted)
        setUrl(res)
    }
  }

  const showCardInfo = () => {
    setOpenDg(true)
  }

  useEffect(() => {
    let mounted = true
    fetchFirebaseUrl(mounted, imgUrl, firebaseName)
    return () => { mounted = false }
  }, [])
  return (
    <StyledCard >
      {url ?
        open ?
          <>
            <img
              style={loaded ? { cursor: 'pointer' } : { display: 'none' }}
              src={url}
              loading="eager"
              onLoad={() => {
                setLoaded(true), play();
              }}
              onClick={() => showCardInfo()}
            />
            <div
              style={
                loaded
                  ? { display: 'none' }
                  : { display: 'flex', alignItems: 'center' }
              }
            >
              <ReactLoading type="spinningBubbles" color={BasicColor.green} />
            </div>
          </>
          :
          <p
            onClick={() => setOpen(true)}
          >?</p>
        :
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ReactLoading type="spinningBubbles" color={BasicColor.green} />
        </div>
      }
      <CardDialog
        fullWidth='true'
        dialogContent={
          <CardDescription
            imgUrl={imgUrl}
            firebaseName={firebaseName}
            description={description}
            name={name}
            id={id}
          />
        }
        open={() => setOpenDg(!openDg)}
        isOpen={openDg}
      />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 160px;
  height: 220px;
  box-shadow: 0 1px 1rem -4px #000;
  margin: 1rem;
  overflow: hidden;
  border-radius: 6px;
  transition: all 250ms ease-in-out;

  &:hover {
    transform: translateY(-5px) translateX(-5px);
  }

  @media screen and (max-width: ${ScreenSize.tablet}) {
    width: 30vw;
    height: 40vw;
    margin: 5vw;
  }

  p {
    cursor: pointer;
    font-size: 200px;
    margin: auto;
    @media screen and (max-width: ${ScreenSize.tablet}) {
      font-size: 100px;
    }
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: fill;
    transform: rotateY(0);
    animation: rotateAnimation 0.5s linear;

    /* Adding keyframes for animation */
    @keyframes rotateAnimation {
      from {
        transform: rotateY(180deg);
      }
      to {
        transform: rotateY(360deg);
      }
    }
  }
`;
