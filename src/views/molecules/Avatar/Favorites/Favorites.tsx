import { FC, useEffect, useState, useContext }     from 'react';
import styled                                      from 'styled-components';
import { useSelector, useDispatch }                from 'react-redux';
import wardrobe                                    from 'views/assets/wardrobe.svg';
import floor                                       from 'views/assets/avatars/floor.png';
import { LoadingContext }                          from 'react-router-loading';
import { ScreenSize }                              from 'constants/screenSize';
import { useHistory }                              from 'react-router-dom';
import { AvatarFavorites }                         from './AvatarFavorites';
import { doFetchFavoriteAvatars, doSetUserAvatar } from 'app/actions/avatarActions';
import { AvatarSet }                               from '../AvatarSet';
import { LeftDrawer }                              from './LeftDrawer';
import StarRoundedIcon                             from '@mui/icons-material/StarRounded';
import IconButton                                  from '@mui/material/IconButton';
import { useSnackbar }                             from 'notistack';
import { LoadingSpinner }                          from 'views/atoms/Spinner';
import { AVATAR_SET_DEFAULT }                      from 'app/types'
import { dictionary }   from 'views/pages/Student/Avatar/dictionary'

export const AvatarSelector: FC = () => {

  const history       = useHistory();
  const dispatch      = useDispatch()
  const user          = useSelector((state: any) => state.user);
  const student       = useSelector((state: any) => state.student)
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'
  const loadingContext = useContext(LoadingContext);
  const [loading, setLoading] = useState(false)

  // TODO-- This state is used to select user avatar from his/her favorites
  const [currentAvatarId, setCurrentAvatarId] = useState(0)
  const { enqueueSnackbar } = useSnackbar();
  const [favorites, setfavorites] = useState<Array<any>>([])

  const [accessory, setAccessory] = useState('')
  const [head, setHead] = useState('')
  const [body, setBody] = useState('')
  const [footer, setFooter] = useState('')

  const [skin, setSkin] = useState('')


  const fetchFavorites = async () => {
    const res: any = await doFetchFavoriteAvatars(student.id, user.token)
    res.msg ? console.log('error:', res.msg) : setfavorites(res)
  }

  const setCurrentAvatar = (id: number) => {
    setCurrentAvatarId(id)
    favorites[id].avatarAccessorie ? setAccessory(favorites[id].avatarAccessorie.image) : setAccessory('')
    setHead(favorites[id].avatarHead.image)
    setBody(favorites[id].avatarClothes.image)
    setFooter(favorites[id].avatarPants.image)
    favorites[id].skinTone ? setSkin(favorites[id].skinTone) : setSkin('')
  }

  // TODO: Do not delete this comment. THIS WILL BE USED IN THE FUTURE
  const setUserAvatar = async () => {
    setLoading(true)
    if (favorites.length) {

      const res: any = await doSetUserAvatar(student.id, favorites[currentAvatarId].id, user.token)
      if (res.status) {
        console.log(res)
        dispatch({ type: AVATAR_SET_DEFAULT, payload: res })
        enqueueSnackbar(dictionary[language]?.setUserAvatarSuccessfully, { variant: 'success' })
      } else {
        enqueueSnackbar(res.msg, { variant: 'error' })
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchFavorites()
    loadingContext.done()
  }, [])

  useEffect(() => {
    if (favorites.length) {

      favorites[0].avatarAccessorie ? setAccessory(favorites[0].avatarAccessorie.image) : setAccessory('')
      setHead(favorites[0].avatarHead.image)
      setBody(favorites[0].avatarClothes.image)
      setFooter(favorites[0].avatarPants.image)
      favorites[0].skinTone ? setSkin(favorites[0].skinTone) : setSkin('')
    }
  }, [favorites])

  return (
    favorites &&
    <>
      <TopDrawer> {/* This is displayed in mobile view only */}
        <AvatarFavorites select={setCurrentAvatar} favorites={favorites} />
      </TopDrawer>
      <Container>
        <div onClick={() => history.push('wardrobe')}>
          <LeftDrawer />
        </div>
        <Drawer src={wardrobe} onClick={() => history.push('wardrobe')} />
        <AvatarGrid >
          <div />
          {
            loading &&
            <LoadingSpinner />}

          <AvatarSet accessory={accessory} head={head} body={body} pants={footer} skin={skin} size={150}/>
          <div style={{ display: 'flex', alignItems: 'start', height: '100%' }}>
            <IconButton
              aria-label={dictionary[language]?.setFavorite}
              component='span'
              onClick={setUserAvatar}
              sx={{
                '&.MuiIconButton-root': {
                  color: 'gold',
                }
              }}
            >
              <StarRoundedIcon fontSize='large' />
            </IconButton>
          </div>
        </AvatarGrid>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <RightDrawer> {/* This is displayed in desktop view only */}
            <AvatarFavorites select={setCurrentAvatar} favorites={favorites} />
          </RightDrawer>
          <Floor src={floor} />
        </div>
      </Container>
    </>
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

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  gap: 30px;
  margin: 2vh 10vw 2vh 10vw;
  align-items: center;

  @media screen and (max-width: ${ScreenSize.phone}) {
    margin: 5vh 0 10vh 0;
    width: 100%;
    justify-content: center;
    gap: 0;
  }
`;

export const TopDrawer = styled.div`
display: none;
@media screen and (max-width: ${ScreenSize.phone}) {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: calc((100vw - 30px ) / 4);
  background: #5C2B0C;
  width: 100%;
  column-gap: 10px;
  z-index: 1;
}
`

const RightDrawer = styled.div`
  display: grid;
  padding: 10px 15px 10px 15px;
  min-height: 400px;
  min-width: 100px;
  grid-template-rows: repeat(4, 1fr);
  background: rgb(92,43,12);
  background: linear-gradient(90deg, rgba(92,43,12,1) 0%, rgba(205,112,53,1) 4%, rgba(92,43,12,1) 15%, rgba(92,43,12,1) 94%, rgba(174,93,42,1) 99%);
  row-gap: 10px;
  @media screen and (max-width: ${ScreenSize.phone}) {
    display: none;
  }
`

const AvatarGrid = styled.div`
  display: grid;
  min-width: 25vw;
  place-items: center;
  grid-template-columns: 2vw 1fr 2vw;
  @media screen and (max-width: ${ScreenSize.phone}) {
  }
`
const Drawer = styled.img`
  display: none;
  @media screen and (max-width: ${ScreenSize.phone}) {
    display: block;
    height: 130px;
    position: absolute;
    left: 10vw;
    bottom: 10vh;
    z-index: 10;
  }
`;
