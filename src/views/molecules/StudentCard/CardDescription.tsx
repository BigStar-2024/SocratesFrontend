import { FC, useState, useEffect } from 'react';
import { BasicColor } from 'views/Color';
import { Container, Grid } from '@mui/material';
import { getDownUrlByFilename } from 'app/firebase';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery'
import { ScreenSize } from 'constants/screenSize';
import { ICollectibleCardDescription } from 'app/entities/collectibles'

export const CardDescription: FC<ICollectibleCardDescription> = ({
  imgUrl,
  description,
  name,
  firebaseName,
  id
}) => {
  const isMobile = useMediaQuery(`(max-width: ${ScreenSize.phone})`)
  const [img, setImg] = useState('');
  const [dgImgloaded, setDgImgLoaded] = useState(false);

  const fetchFirebaseUrls = async () => {
    const link = await getDownUrlByFilename(firebaseName, imgUrl);
    setImg(link ? link : '');
  };

  const reverseIds = [8, 11, 12]

  useEffect(() => {
    fetchFirebaseUrls();
  }, []);

  return (
    <Container sx={{ marginBottom: 2 }}>
      <Grid container minHeight={300} spacing={2} alignItems='center' justifyContent='center'>
        <Grid item >
          {
            <Container
              sx={{ height: isMobile ? 'auto' : 300 }}
            >
              <img src={img}
                onLoad={() => {
                  setDgImgLoaded(true);
                }}
                style={{
                  display: dgImgloaded ? 'block' : 'none',
                  height: isMobile ? 'auto' : '100%',
                  width: isMobile ? '100%' : 'auto'
                }}
              />
              <Skeleton variant='rectangular' animation='wave' width={isMobile ? '100vw' : 225} height={isMobile ? 50 : 300}
                sx={{ display: dgImgloaded ? 'none' : 'flex', marginLeft: -5 }}
              />
            </Container>
          }
        </Grid>
        <Grid item maxWidth={250}>
          <h3>{name ? name : 'Unknown'}</h3>
          <div style={
            reverseIds.includes(id) ?
              {} :
              { display: 'flex', flexDirection: 'column-reverse' }
          }>
            {description?.map(item => (
              <>
                <p key={item.value} style={{ margin: 0 }}><span style={{ color: BasicColor.blue }}>{item.key}</span>{item.value}</p>
                <br />
              </>
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
