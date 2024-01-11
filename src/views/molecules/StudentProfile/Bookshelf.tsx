import { FC, useState }     from 'react'
import { Container, Stack, Backdrop, Button } from '@mui/material'
import settings_img         from 'views/assets/student-profile/Vector.svg';
import badge_img            from 'views/assets/student-profile/badge.png';
import awards_img           from 'views/assets/student-profile/awards.png';
import leg_img              from 'views/assets/student-profile/shelf-leg.png';
import { BadgeContainer }   from 'views/molecules/StudentProfile/BadgeContainer';
import { Subheader }        from 'views/atoms/Text';
import styled               from 'styled-components';
import CloseIcon            from '@mui/icons-material/Close';
import { Awards }           from './Awards';
import { BasicColor }       from 'views/Color';
import useMediaQuery        from '@mui/material/useMediaQuery';
import { ScreenSize }       from 'constants/screenSize';
import { dictionary }       from 'views/pages/Student/Settings/dictionary'
import { StudentSettings }  from 'views/molecules/StudentProfile/StudentSettings';
import { useSelector }        from 'react-redux'

interface BookShelfProps {
    badges: any[]
}

export const BookShelf: FC<BookShelfProps> = ({badges}) => {

    let language:string     = useSelector((state: any) => state.user.language);
    language                = language? language : 'en-us'

    const isMobile = useMediaQuery(`(max-width:${ScreenSize.phone})`);
    const itemSize = isMobile ? 40 : 120
    const [openSetting, setOpenSetting] = useState(false)
    const [openBadge, setOpenBadge] = useState(false)
    const [openAward, setOpenAward] = useState(false)
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setOpenSetting(false)
        setOpenBadge(false)
        setOpenAward(false)
    };

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 0, marginTop: 10 }}>
            <Stack direction='row' justifyContent='space-evenly' width='100%'>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: 'flex', flexDirection: 'column' }}
                    open={open}
                >
                    <Container sx={{ width: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {openSetting && <StudentSettings />}
                        {openBadge && badges && <BadgeContainer badges={badges}/>}
                        {openAward && <Awards />}
                        <Button sx={{ borderRadius: '100%', background: BasicColor.green, padding: '10px' }} variant="contained" onClick={handleClose} >
                            <CloseIcon />
                        </Button>
                    </Container>
                </Backdrop>
                <ProfileImg onClick={() => { setOpenSetting(true), setOpen(true) }} src={settings_img} style={{ height: itemSize }} />
                <ProfileImg onClick={() => { setOpenBadge(true), setOpen(true) }} src={badge_img} size={itemSize} />
                <ProfileImg onClick={() => { setOpenAward(true), setOpen(true) }} src={awards_img} size={itemSize} />
            </Stack>
            <Stack direction='row' justifyContent='space-evenly' width='100%'  sx={{ padding: 2,background: '#85431F', borderRadius: '10px 10px 0 0' }}>
                <Subheader style={{ color: 'white', textAlign: 'center' }}> {dictionary[language]?.settings} </Subheader>
                <Subheader style={{ color: 'white', textAlign: 'center' }}> {dictionary[language]?.badges} </Subheader>
                <Subheader style={{ color: 'white', textAlign: 'center' }}> {dictionary[language]?.awards} </Subheader>
            </Stack>
            <Stack direction='row' justifyContent='space-around' width='100%' >
                <img src={leg_img} />
                <img src={leg_img} />
            </Stack>
        </Container>
    );
};

const ProfileImg = styled.img<{
    size?: number;
}>`
  height: ${props => props.size}px;
  cursor: pointer;
`
