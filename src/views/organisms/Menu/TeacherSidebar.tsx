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
// import { VideoPlayer } from 'views/molecules/VideoPlayer';
import { SCREEN_MOBILE, TUTORIAL_VDO_URL } from 'constants/common';
import { VIDEO_TUTORIAL_EXPLAIN } from 'constants/parent';
import { ScreenSize } from 'constants/screenSize';
import { doSetOldUser } from 'app/actions';
import { SET_OLD_USER } from 'app/types';
import { dictionary } from 'views/pages/Student/Menus/dictionary'
import YouTube from 'react-youtube';
import { TUTORIAL_VDO_DG_HEIGHT, TUTORIAL_VDO_DG_WIDTH } from 'constants/common';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MenuItem, MenuTitle, MenuMark, LineMenu } from './Style'
import assignmentMark from 'views/assets/menu/assignmentMark.png';
import certificateMark from 'views/assets/menu/certificateMark.png';
import classroomMark from 'views/assets/menu/classroomMark.png';
import helpMark from 'views/assets/menu/helpMark.svg';
import manageSubMark from 'views/assets/menu/manageSubMark.svg';
import reportMark from 'views/assets/menu/reportMark.svg';
import { useStyles }             from './Style'
export const Sidebar: FC = () => {

    const [state, setState] = useState(false)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const isNew = useSelector((state: any) => state.student.isNew);
    const token = useSelector((state: any) => state.user.token);
    const [isMobile, setMobile] = useState(false)
    const history = useHistory();
    const classes =              useStyles();

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

    const handleMenu = (to: string) => {
        toggleDrawer(false);
        history.push(to)
    }

    useEffect(() => {
        let mounted = true
        if (isNew) {
            setOldUser()
            if (mounted)
                setOpen(true)
        }
        // check device is mobile, do mobile view
        if (window.innerWidth > SCREEN_MOBILE) {
            setMobile(false);
        } else setMobile(true);

        return () => { mounted = false }
    }, [])

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <Icon
                    image={menu_toggle}
                    size={ICON_SIZE.small}
                />
            </Button>
            <Drawer
                sx={{ '& .MuiPaper-root': { background: BasicColor.blue, justifyContent: 'center' } }}
                open={state}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: isMobile ? 150 : 250 }}
                    role='presentation'
                    // onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Accordion className={classes.menuContainer}>
                        <AccordionSummary
                            className={classes.accordionSummary}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <MenuMark src={classroomMark} />
                            <MenuTitle>{dictionary[language]?.classrooms}</MenuTitle>
                        </AccordionSummary>
                        <AccordionDetails>
                           <MenuItem onClick={() =>handleMenu('/teacher/addstudent')}>{dictionary[language]?.addStudents}</MenuItem>
                           <MenuItem onClick={() =>handleMenu('/teacher/classroom')}>{dictionary[language]?.manageGroups}</MenuItem>
                           <MenuItem onClick={() =>handleMenu('/teacher/classroom')}>{dictionary[language]?.studentDetail}</MenuItem>
                           <MenuItem onClick={() =>handleMenu('/teacher/notes')}>{dictionary[language]?.notesForKids}</MenuItem>
                           <MenuItem onClick={() =>handleMenu('/teacher/classroom')}>{dictionary[language]?.classroomSettings}</MenuItem>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.menuContainer}>
                        <AccordionSummary
                            className={classes.accordionSummary}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <MenuMark src={assignmentMark} />
                            <MenuTitle>{dictionary[language]?.assignments}</MenuTitle>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MenuItem onClick={() =>handleMenu('/teacher/assignments')}>{dictionary[language]?.createAssignments}</MenuItem>
                            <MenuItem onClick={() =>handleMenu('/teacher/viewResults')}>{dictionary[language]?.viewResults}</MenuItem>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.menuContainer}>
                        <AccordionSummary
                            className={classes.accordionSummary}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <MenuMark src={certificateMark} />
                            <MenuTitle>{dictionary[language]?.certificates}</MenuTitle>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MenuItem onClick={() =>handleMenu('/teacher/addCertificates')}>{dictionary[language]?.addCertificates}</MenuItem>
                            <MenuItem onClick={() =>handleMenu('/teacher/viewCertificates')}>{dictionary[language]?.viewCertificates}</MenuItem>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.menuContainer}>
                        <AccordionSummary
                            className={classes.accordionSummary}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <MenuMark src={reportMark} />
                            <MenuTitle>{dictionary[language]?.reports}</MenuTitle>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MenuItem onClick={() =>handleMenu('/teacher/classroomProgress')}>{dictionary[language]?.classroomProgress}</MenuItem>
                            <MenuItem onClick={() =>handleMenu('/teacher/parentReport')}>{dictionary[language]?.parentReport}</MenuItem>
                        </AccordionDetails>
                    </Accordion>
                    <LineMenu>
                        <MenuMark src={manageSubMark} />
                        <MenuTitle onClick={() =>handleMenu('/teacher/settings')}>{dictionary[language]?.manageSubscription}</MenuTitle>
                    </LineMenu>
                    <LineMenu>
                        <MenuMark src={helpMark} />
                        <MenuTitle onClick={() =>handleMenu('/teacher/help')}>{dictionary[language]?.help}</MenuTitle>
                    </LineMenu>
                </Box>
            </Drawer>
        </div>
    );
}

export default Sidebar


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
