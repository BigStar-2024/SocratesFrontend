import { FC, useContext, useEffect, useState } from 'react';
import { ScreenSize }     from 'constants/screenSize';
import styled             from 'styled-components';
import { useSnackbar }    from 'notistack';
import { Link }           from 'react-router-dom';
import { useSelector }    from 'react-redux';
import { LoadingContext } from 'react-router-loading';
import { get }            from 'api/queries/get';
import { AVATAR }         from 'api/fragments/avatarFragments';
import { IAvatar }        from 'app/entities/avatar';
import IconButton         from '@mui/material/IconButton';
import StarIcon           from '@mui/icons-material/Star';
import StarRoundedIcon    from '@mui/icons-material/StarRounded';
import { Grid }           from '@mui/material';
import { AvatarSet }      from '../AvatarSet';
import { AtomsDrawer }    from './AtomsDrawer';
import { AtomsSelector }  from './AtomsSelector';
import { doFetchOwnedAvatars, doSetFavoriteAvatar } from 'app/actions/avatarActions';
import { ColorPickerDropdown }  from 'views/molecules/Avatar/Wardrobe/ColorPickerDropdown';
import { dictionary }           from 'views/pages/Student/Avatar/dictionary'
import wardrobe_icon            from 'views/assets/wardrobe.png';
import useMediaQuery            from '@mui/material/useMediaQuery';

export const WardrobeSelector: FC = () => {

  const isMobile = useMediaQuery(`(max-width:${ScreenSize.phone})`);
  const user          = useSelector((state: any) => state.user);
  const student       = useSelector((state: any) => state.student)
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'
  const loadingContext = useContext(LoadingContext);

  const [reload, setReload] = useState(false)

  const [accessoryIndex, setAccessoryIndex] = useState(0);
  const [headerIndex, setHeaderIndex] = useState(0);
  const [bodyIndex, setBodyIndex] = useState(0);
  const [footerIndex, setFooterIndex] = useState(0);

  const [ownedIds, setOwnedIds] = useState([])

  const [atomIndex, setAtomIndex] = useState(0);
  const [avatarItems, setAvatarItems] = useState<IAvatar[]>([]);

  const [atoms, setAtoms] = useState<any>([])

  const [skin, setSkin] = useState('')
  const { enqueueSnackbar } = useSnackbar();

  const handleData = (data: any) => {
    setAvatarItems(data.data.avatars);
  };
  const handleError = (error: any) => {
    console.log(error);
  };

  const setFavorite = async () => {
    const res: any = await doSetFavoriteAvatar(student.id, accessoryIndex, headerIndex, bodyIndex, footerIndex, skin, user.token)
    if (res) {
      enqueueSnackbar(dictionary[language]?.youVeSetAnFavoriteAvatar, { variant: 'success' });
    }
    else
      enqueueSnackbar(dictionary[language]?.failed, { variant: 'error' });
  }

  const reloadData = () => {
    setReload(!reload)
  }
  useEffect(() => {
    fetchOwnedAvatars()
  }, [reload])

  useEffect(() => {
    get('avatars', `{${AVATAR}}`, handleData, handleError);
  }, []);
  useEffect(() => {
    const accessoriesArray = avatarItems.filter(
      (item: any) => item.typeOf === 'ACCESSORIES'
    );
    const headersArray = avatarItems.filter(
      (item: any) => item.typeOf === 'HEAD'
    );
    const bodiesArray = avatarItems.filter(
      (item: any) => item.typeOf === 'CLOTHES'
    );
    const footersArray = avatarItems.filter(
      (item: any) => item.typeOf === 'PANTS'
    );
    setAtoms([accessoriesArray, headersArray, bodiesArray, footersArray])
    loadingContext.done();
  }, [avatarItems]);

  const fetchOwnedAvatars = async () => {
    const res: any = await doFetchOwnedAvatars(student.id, user.token)
    res.msg ? setOwnedIds([]) : setOwnedIds(res)
  }

  const handleOnAtomSelect = (id: number) => {
    const item: any = avatarItems.find(x => x.id === id)
    switch (item.typeOf) {
      case 'ACCESSORIES':
        setAccessoryIndex(id)
        break;
      case 'HEAD':
        setHeaderIndex(id)
        break;
      case 'CLOTHES':
        setBodyIndex(id)
        break;
      case 'PANTS':
        setFooterIndex(id)
        break;

      default:
        break
    }
  }
  const callbackAtomDrawerClick = (id: number) => {
    setAtomIndex(id)
  }

  return (
    <WardrobeModule>
      <AtomsDrawer onAtomClick={callbackAtomDrawerClick} />
      <WardrobeDrawer>
        {avatarItems && ownedIds &&
          <AtomsSelector items={atoms[atomIndex]} onItemClick={handleOnAtomSelect} owned={ownedIds} reload={reloadData} />
        }
      </WardrobeDrawer>
      <Grid container justifyContent='center' sx={{ width: 'auto', margin: 3 }}>
        <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 30}}>
          <ColorPickerDropdown select={setSkin} />
        </Grid>
        <Grid item sx={{ display: 'flex', overflow: 'hidden' }} alignItems='center'>
          {
            avatarItems &&
            <AvatarSet
              accessory={avatarItems ? avatarItems.find(x => x.id === accessoryIndex)?.image : ''}
              head={avatarItems ? avatarItems.find(x => x.id === headerIndex)?.image : ''}
              pants={avatarItems ? avatarItems.find(x => x.id === footerIndex)?.image : ''}
              body={avatarItems ? avatarItems.find(x => x.id === bodyIndex)?.image : ''}
              skin={skin}
              size={isMobile ? 120 : 150}
            />
          }
        </Grid>
        <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <IconButton
            aria-label={dictionary[language]?.setFavorite}
            component='span'
            onClick={setFavorite}
            disabled={headerIndex && bodyIndex && footerIndex ? false : true}
            sx={{
              '&.MuiIconButton-root': {
                color: headerIndex && bodyIndex && footerIndex ? 'gold' : 'gray',
              }
            }}
          >
            <StarRoundedIcon fontSize='large' />
          </IconButton>
          <Link id='go-to-favorites' to={'/avatar'}>
            <ToggleWardrobe src={wardrobe_icon} />
          </Link>
        </Grid>
      </Grid>
    </WardrobeModule>
  );
};

const WardrobeModule = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2vh;
  @media screen and (max-width: ${ScreenSize.phone}) {
    flex-direction: column;
    align-items: center;
    margin-top: 0;
    margin-bottom: 10vh;
  }
`;


const WardrobeDrawer = styled.div`
  height: 100%;
  padding-bottom: 20px;
  background: rgb(92,43,12);
  background: linear-gradient(90deg, rgba(92,43,12,1) 0%, rgba(205,112,53,1) 4%, rgba(92,43,12,1) 15%, rgba(92,43,12,1) 94%, rgba(174,93,42,1) 99%);
  margin-left: 20px;
  margin-top: 2vh;

@media screen and (max-width: ${ScreenSize.phone}) {
    // display: none;
    background-color: #5c2b0c;
    justify-content: center;
    margin: 10px 0 20px 0;

  }
`;


const ToggleWardrobe = styled.img`
  width: 50px;
`;
