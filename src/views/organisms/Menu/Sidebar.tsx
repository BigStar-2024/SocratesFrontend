import { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_SIZE } from 'constants/icon';
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { BasicColor } from 'views/Color';
import ListItem from '@mui/material/ListItem';
import { Icon } from 'views/atoms/Icon/Icon';
import progress_icon from 'views/assets/nav-icons/Progress.png';
import question_icon from 'views/assets/nav-icons/question.png';
import game_icon from 'views/assets/nav-icons/game.png';
import bank_icon from 'views/assets/nav-icons/bank.png';
import collectible_icon from 'views/assets/nav-icons/collectibles.png';
import profile_icon from 'views/assets/nav-icons/profile.png';
import tutorial_icon from 'views/assets/nav-icons/tutorial.png';
import menu_toggle from 'views/assets/Menu Toggle.svg';
import styled from 'styled-components';
import { TypoIcon } from 'views/atoms/Text';
import { CardDialog } from 'views/molecules/StudentCard/MyCards/CardDialog';
import { SCREEN_MOBILE, TUTORIAL_VDO_URL } from 'constants/common';
import { VIDEO_TUTORIAL_EXPLAIN } from 'constants/parent';
import { ScreenSize } from 'constants/screenSize';
import { doSetOldUser } from 'app/actions';
import { SET_OLD_USER } from 'app/types';
import { dictionary } from 'views/pages/Student/Menus/dictionary'
import YouTube from 'react-youtube';
import { TUTORIAL_VDO_DG_HEIGHT, TUTORIAL_VDO_DG_WIDTH } from 'constants/common';
import useMediaQuery from '@mui/material/useMediaQuery'

export const Sidebar: FC = () => {

    const isMobile = useMediaQuery(`(max-width: ${ScreenSize.phone})`)

    const [state, setState] = useState(false)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const isNew = useSelector((state: any) => state.student.isNew);
    const token = useSelector((state: any) => state.user.token);
    const history = useHistory();

    let language: string = useSelector((state: any) => state.user.language);
    language = language ? language : 'en-us'

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setState(open);
    };

    const openTutorial = () => {
        setOpen(!open)
    }

    const setOldUser = async () => {
        await doSetOldUser(token)
        dispatch({ type: SET_OLD_USER })
    }

    useEffect(() => {
        let mounted = true
        if (isNew) {
            setOldUser()
            if (mounted)
                setOpen(true)
        }

        return () => { mounted = false }
    }, [])

    return (
        <div>
            <CardDialog
                isOpen={open}
                open={openTutorial}
                // title = {VIDEO_TUTORIAL_EXPLAIN}
                fullWidth='true'
                dialogContent={
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
                        <ExplainText>{VIDEO_TUTORIAL_EXPLAIN[language]}</ExplainText>
                        <Box sx={{ width: TUTORIAL_VDO_DG_WIDTH, height: TUTORIAL_VDO_DG_HEIGHT, backgroundColor: 'black' }}>
                            <YouTube
                                videoId={TUTORIAL_VDO_URL}
                                opts={{
                                    width: `${TUTORIAL_VDO_DG_WIDTH}`,
                                    height: `${TUTORIAL_VDO_DG_HEIGHT}`,
                                    playerVars: {
                                        autoplay: 0,
                                        controls: 0
                                    }
                                }}
                            />
                        </Box>
                        {/* <VideoPlayer src={TUTORIAL_VDO_URL} /> */}
                    </Box>
                }
            />
            <Button onClick={toggleDrawer(true)}>
                <Icon
                    image={menu_toggle}
                    size={ICON_SIZE.small}
                />
            </Button>
            <Drawer
                sx={{ '& .MuiPaper-root': { background: BasicColor.green } }}
                open={state}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: isMobile ? 150 : 250 }}
                    role='presentation'
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <StyledListItem
                            onClick={() => history.push('/map')}
                        >
                            <IconContainer>
                                <Icon
                                    image={question_icon}
                                    size={ICON_SIZE.medium}
                                />
                                <TypoIcon >{dictionary[language]?.questions}</TypoIcon >
                            </IconContainer>
                        </StyledListItem>
                        <StyledListItem
                            onClick={() => history.push('/games/categories')}
                        >
                            <IconContainer>
                                <Icon
                                    image={game_icon}
                                    size={ICON_SIZE.medium}
                                />
                                <TypoIcon >{dictionary[language]?.games}</TypoIcon >
                            </IconContainer>
                        </StyledListItem>
                        <StyledListItem
                            onClick={() => history.push('/progress')}
                        >
                            <IconContainer>
                                <Icon
                                    image={progress_icon}
                                    size={ICON_SIZE.medium}
                                />
                                <TypoIcon >{dictionary[language]?.progress}</TypoIcon >
                            </IconContainer>
                        </StyledListItem>
                        <StyledListItem
                            onClick={() => history.push('/backpack')}
                        >
                            <IconContainer>
                                <Icon
                                    image={collectible_icon}
                                    size={ICON_SIZE.medium}
                                />
                                <TypoIcon >{dictionary[language]?.myStuff}</TypoIcon >
                            </IconContainer>
                        </StyledListItem>
                        <StyledListItem
                            onClick={() => history.push('/bank')}
                        >
                            <IconContainer>
                                <Icon
                                    size={ICON_SIZE.medium}
                                    image={bank_icon}
                                />
                                <TypoIcon >{dictionary[language]?.bank}</TypoIcon >
                            </IconContainer>
                        </StyledListItem>
                        <StyledListItem sx={{ display: isMobile ? 'flex' : 'none' }}
                            onClick={() => history.push('/profile')}
                        >
                            <IconContainer>
                                <Icon
                                    size={ICON_SIZE.medium}
                                    image={profile_icon}
                                />
                                <TypoIcon >{dictionary[language]?.profile}</TypoIcon >
                            </IconContainer>
                        </StyledListItem>
                        <StyledListItem
                            onClick={() => setOpen(true)}
                        >
                            <IconContainer>
                                <Icon
                                    image={tutorial_icon}
                                    size={ICON_SIZE.medium}
                                />
                                <TypoIcon >{dictionary[language]?.tutorial}</TypoIcon >
                            </IconContainer>
                        </StyledListItem>
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}


export const IconContainer = styled.div`
  width: 50%;
  height: 70px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const StyledListItem = styled(ListItem)`
&.MuiListItem-root {
    justify-content: flex-end;
}
`
const ExplainText = styled.p`
    font-size: 22px;
    text-align: center;
    color: ${BasicColor.blue};
    @media screen and (max-width: ${ScreenSize.phone}) {
        font-size: 16px;
    }
`
