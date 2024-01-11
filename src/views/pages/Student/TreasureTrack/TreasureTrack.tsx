import { FC, useEffect, useContext, useMemo, useState, useRef }     from 'react';
import { StudentMenu }      from 'views/pages/Student/Menus/StudentMenu';
import { LoadingContext }   from 'react-router-loading';
import styled               from 'styled-components';
import { Title }            from 'views/atoms/Text';
import welcome              from 'views/assets/welcome.svg';
import treasureMapPc        from 'views/assets/student/treasure-track-map-pc.png';
import treasureMapMobile    from 'views/assets/student/treasure-track-map-mobile.png';
import Card                 from '@mui/material/Card';
import CardContent          from '@mui/material/CardContent';
import Typography           from '@mui/material/Typography';
import ArrowDropDownIcon    from '@mui/icons-material/ArrowDropDown';
import { useSelector }      from 'react-redux';
import Menu                 from '@mui/material/Menu';
import MenuItem             from '@mui/material/MenuItem';
import { Container as MContainer, Backdrop, Button } from '@mui/material';
import CloseIcon            from '@mui/icons-material/Close';
import { UserRankTreasureTrack } from 'views/molecules/UserRank';
import { ScreenSize }            from 'constants/screenSize';
import { HonorRoll }             from 'api/fragments/honorRollFragments';
import { LastWeekAndCoinsQuestions } from 'api/fragments/studentFragments';
import query                     from 'api/queries/get';
import { AvatarSet }             from 'views/molecules/Avatar/AvatarSet';
import background                from 'views/assets/colored-shapes-bg.svg';
import { dictionary }            from './dictionary'
import {
    pathMobileCompList,
    pathPcCompList,
    TreasureIslands,
    TreasureIslandsMobile
} from './positionInfo';
import GoldMedal from 'views/assets/gold-metal.png';
import SilverMedal from 'views/assets/silver-metal.png';
import BronzeMedal from 'views/assets/bronze-metal.png';
import { BasicColor }       from 'views/Color';

const Wrapper = styled.div`
    background-image  : url(${background});
    background-repeat : no-repeat;
    background-size   : cover;
    height            : 100vh;
`;

export const KidsTreasureTrack: FC = () => {
    const loadingContext = useContext(LoadingContext);
    const avatar = useSelector((state: any) => state.avatar)
    let language:string = useSelector((state: any) => state.user.language);
    language            = language? language : 'en-us'

    const [earnedCoin, setEarnedCoin] = useState<number>(0); //Math.ceil(Math.random() * 1000)

    const [menuTitle, setMenuTitle] = useState<string>('Socrates');
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (str: string) => {
        setAnchorEl(null);
        setMenuTitle(str);
        // setEarnedCoin(Math.ceil(Math.random() * 1000));
    };

    const [questions, setQuestions] = useState<number>(0);
    const [questionLastDay, setQuestionLastDay] = useState<string>("");
    const initialNumber = Math.ceil(questions / 20);

    const mapBgRef = useRef<HTMLDivElement>(null);

    const [mapWidth, setMapWidth] = useState<number>(1366);
    useEffect(() => {
        const timer = setInterval(() => {
            if (mapBgRef.current?.clientWidth) {
                setMapWidth(val => {
                    if (val === mapBgRef.current?.clientWidth) {
                        clearInterval(timer);
                        return val
                    } else {
                        return mapBgRef.current?.clientWidth || 0
                    }
                });
            }
        }, 1000);
    }, []);

    const pathComMobile = useMemo(() => {
        return (
            <svg width={178 * mapWidth / 330} height={263 * mapWidth / 330} viewBox='0 0 178 263' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <line
                    y1='-1'
                    x2='12.4468'
                    y2='-1'
                    transform='matrix(0.715726 -0.698381 0.697956 0.71614 115.992 245.603)'
                    stroke='#CC5B1D'
                    strokeWidth='2'
                />
                <line
                    y1='-1'
                    x2='12.4468'
                    y2='-1'
                    transform='matrix(0.697957 0.71614 -0.715727 0.69838 114.926 236.803)'
                    stroke='#CC5B1D'
                    strokeWidth='2'
                />
                { pathMobileCompList.map((PathMobileComp, id) => <PathMobileComp key={id} strokeColor={id === initialNumber ? '#FFF129' : ''} strokeWidth={id === initialNumber ? 5 : 1} bgColor={id === initialNumber ? '#FFF129' : (id < initialNumber ? '#2FE12C' : '#FB8500')} />) }
            </svg>
        )
    }, [initialNumber, mapWidth]);

    const pathComPc = useMemo(() => {
        return (
            <svg width={239 * mapWidth / 660} height={311 * mapWidth / 660} viewBox='0 0 239 311' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <line y1='-2' x2='24.3721' y2='-2' transform='matrix(0.706897 -0.707316 0.706897 0.707316 213.792 291.47)' stroke='#74401D' strokeWidth='4'/>
                <line y1='-2' x2='24.3721' y2='-2' transform='matrix(0.706898 0.707316 -0.706898 0.707316 211.488 274.266)' stroke='#74401D' strokeWidth='4'/>
                { pathPcCompList.map((PathPcComp, id) => <PathPcComp key={id} strokeColor={id === initialNumber ? '#FFF129' : ''} strokeWidth={id === initialNumber ? 5 : 1} bgColor={id === initialNumber ? '#FFF129' : (id < initialNumber ? '#2FE12C' : '#FB8500')} />) }
            </svg>
        )
    }, [initialNumber, mapWidth]);

    const user = useSelector((state: any) => state.user);
    const student = useSelector((state: any) => state.student);
    console.log(student);
    const [rankKids, setRankKids] = useState<any[]>([]);
    const [initRanks, setInitRanks] = useState<number[]>([]);
    const [addPls, setAddPls] = useState<number[]>([]);
    useEffect(() => {
        (async () => {
            // console.log(user)
            if (user && user.token) {
                // Get Topic Report
                console.log('calling honor Roll!')
                const res:any = await query('', HonorRoll, user.token).catch(e => ({success: false}));
                if (res.success === false) {
                  return
                }
                const result:any = await res.json();
                if (result.errors && !result.data) {
                    alert(result.errors[0].message);
                } else {
                    if (result.data.coinWallets.length > 0) {
                        let index = -1;
                        const temp = result.data.coinWallets
                        console.log(temp)
                        temp.sort((a: any, b: any) => {
                            if (b.blockTransactionCoins === a.blockTransactionCoins) {
                                return b.student.user.username === user.username ? 1 : -1;
                            } else {
                                return b.blockTransactionCoins - a.blockTransactionCoins;
                            }
                        });
                        for (let i = 0; i < temp.length; i ++) {
                            if (user.username === temp[i].student.user.username) {
                                index = i;
                                setEarnedCoin(temp[i].blockTransactionCoins);
                                break;
                            }
                        }
                        if (index < 5) {
                            setRankKids(temp.slice(0, 5));
                            setInitRanks([1,2,3,4,5]);
                            setAddPls((new Array(5)).fill(true).map((val, id) => Math.abs(index - id) * 5));
                        } else {
                            setRankKids([...temp.slice(0,4), temp[index]])
                            setInitRanks([1,2,3,4,index + 1]);
                            setAddPls([20,15,10,5,0]);
                        }
                        // if (2 <= index && index <= temp.length - 3) {
                        //     setInitRank(index - 2);
                        //     setRankKids(temp.slice(index - 2, index + 3));
                        // } else if (index < 2) {
                        //     setInitRank(0);
                        //     setRankKids(temp.slice(0, Math.min(5, temp.length)));
                        // } else if (index > temp.length - 3) {
                        //     setInitRank(Math.max(0, temp.length - 5));
                        //     setRankKids(temp.slice(Math.max(0, temp.length - 5)));
                        // }
                    }
                }
                loadingContext.done();
            }
        })();
    }, [user]);
    useEffect(() => {
        if (student?.id && user?.token) {
            (async () => {
                const res: any = await query('', LastWeekAndCoinsQuestions(1), user.token).catch(e => ({ success: false }));
                if (res.success === false) {
                    return;
                }
                const result:any = await res.json();
                const { lastWeekQuestions } = result.data.students.filter((_student: any) => _student.id === student?.id)[0];
                let totalQuestions = 0
                for (let i = 0; i < lastWeekQuestions.length; i++) {
                    totalQuestions += lastWeekQuestions[i].questions;
                }
                if (lastWeekQuestions.length > 0) {
                    setQuestionLastDay(lastWeekQuestions[lastWeekQuestions.length - 1].day);
                }
                setQuestions(totalQuestions);
            })();
        }
    }, [student.id, user.token]);

    const [medalModalOpened, setMedalModalOpened] = useState<number>(0);
    const [zoom, setZoom] = useState<boolean>(false);
    const closeMedal = () => {
        setZoom(true);
        setTimeout(() => {
            setMedalModalOpened(0);
        }, 1500);
    }
    useEffect(() => {
        const medal = localStorage.getItem("learning-socrates-last-medal") || "";
        const time = localStorage.getItem("learning-socrates-last-medal-time") || "";
        const now = new Date();
        now.setDate(now.getDate() - now.getDay());
        const thisWeekSunday = now;
        const lastWeek = thisWeekSunday.getTime() - (new Date(time)).getTime() > 0;
        if (lastWeek) {
            localStorage.removeItem("learning-socrates-last-medal");
            localStorage.removeItem("learning-socrates-last-medal-time");
        }
        if (100 <= questions && questions < 250) {
            if (medal === "") {
                setMedalModalOpened(1);
                localStorage.setItem("learning-socrates-last-medal", "bronze");
                localStorage.setItem("learning-socrates-last-medal-time", (new Date()).toString());
            }
        } else if (250 < questions && questions < 500) {
            if (medal === "" || medal === "bronze") {
                setMedalModalOpened(2);
                localStorage.setItem("learning-socrates-last-medal", "silver");
                localStorage.setItem("learning-socrates-last-medal-time", (new Date()).toString());
            }
        } else if (questions >= 500) {
            if (medal === "" || medal === "bronze" || medal === "silver") {
                setMedalModalOpened(3);
                localStorage.setItem("learning-socrates-last-medal", "gold");
                localStorage.setItem("learning-socrates-last-medal-time", (new Date()).toString());
            }
        }
    }, [questions]);
    return (
        <Wrapper>
            <StudentMenu>
                <Container>
                    <MapWrapper>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                        }}>
                            <MapTitleViewer>
                                <img style={{
                                    position: 'absolute',
                                    zIndex: 10,
                                    width: '100%',
                                    height: '80px'
                                }} src={welcome} alt='Welcome' />
                                <Title style={{
                                    zIndex: 20,
                                }}>{dictionary[language]?.treasureTrack}</Title>
                            </MapTitleViewer>
                            <MapViewer>
                                <div ref={mapBgRef} style={{
                                    position: 'relative',
                                    width: '100%',
                                    overflow: 'auto',
                                }}>
                                    <ImgPc src={treasureMapPc} alt='treasureMap' />
                                    <ImgMobile src={treasureMapMobile} alt='treasureMap' />
                                    { TreasureIslands.map(({Comp, left, top}, id) => <PcCom
                                        key={id}
                                        style={{
                                            position: 'absolute',
                                            left: `${left}%`,
                                            top: `${top}%`,
                                            zIndex: 10,
                                            opacity: questions / 166 < id ? '0.6' : '1',
                                        }}
                                    ><Comp />{questions / 166 > id && id > 0 ? <img style={{ position: "absolute", width: "72px", bottom: "-36px" }} src={id === 3 ? GoldMedal : (id === 2 ? SilverMedal : (id === 1 ? BronzeMedal : ''))}/> : null}</PcCom>) }
                                    { TreasureIslandsMobile.map(({Comp, left, top}, id) => <MobileCom
                                        key={id}
                                        style={{
                                            position: 'absolute',
                                            left: `${left}%`,
                                            top: `${top}%`,
                                            zIndex: 10,
                                            opacity: earnedCoin / 250 < id ? '0.6' : '1',
                                        }}
                                    ><Comp /></MobileCom>) }
                                    <PcCom style={{
                                        position: 'absolute',
                                        left: '30%',
                                        top: '16.93%',
                                        zIndex: 20,
                                    }}>
                                    { pathComPc }
                                    </PcCom>
                                    <MobileCom style={{
                                        position: 'absolute',
                                        left: '24.72%',
                                        top: '19.59%',
                                        zIndex: 20
                                    }}>
                                    { pathComMobile }
                                    </MobileCom>
                                </div>
                                <CharactorViewer>
                                    <AvatarSet
                                        accessory={avatar.accessory ? avatar.accessory.image : ''}
                                        head={avatar.head ? avatar.head.image : ''}
                                        pants={avatar.pants ? avatar.pants.image : ''}
                                        body={avatar.clothes ? avatar.clothes.image : ''}
                                        skin={avatar.skin}
                                        size={150}
                                    />
                                </CharactorViewer>
                            </MapViewer>
                        </div>
                    </MapWrapper>
                    <PanelWrapper>
                        <Card>
                            <CardContent>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginLeft: '-1rem',
                                    marginRight: '-1rem',
                                }}>
                                    <Typography variant='h4' color='text.primary' gutterBottom>
                                    {dictionary[language]?.honorRoll}
                                    </Typography>
                                    <Typography variant='h5' color='text.primary' gutterBottom>
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup='true'
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                {menuTitle}
                                                <ArrowDropDownIcon />
                                            </div>
                                            <Menu
                                                id='basic-menu'
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={() => handleClose(menuTitle)}
                                                MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={() => handleClose('Socrates')}>{dictionary[language]?.socrates}</MenuItem>
                                                <MenuItem onClick={() => handleClose('Classroom')}>{dictionary[language]?.classroom}</MenuItem>
                                                <MenuItem onClick={() => handleClose('School')}>{dictionary[language]?.school}</MenuItem>
                                            </Menu>
                                        </div>
                                    </Typography>
                                    { (rankKids.length === 5 && addPls.length === 5 && initRanks.length === 5) ?
                                    <table style={{
                                        width: '100%',
                                        padding: '0 1rem'
                                    }}>
                                        <tbody>
                                            { rankKids.map((kid, i) => {
                                                return (
                                                <UserRankTreasureTrack
                                                    additionalPl={addPls[i].toString() + 'px'}
                                                    active={addPls[i] === 0}
                                                    coinsEarned={kid.blockTransactionCoins}
                                                    userRank={initRanks[i]}
                                                    userName={kid.student.user.username}
                                                    key={i}
                                                    userHead={kid.student?.user?.student?.currentAvatarHead?.image}
                                                    userAccessory={kid.student?.user?.student?.currentAvatarAccessories?.image}
                                                    userClothes={kid.student?.user?.student?.currentAvatarClothes?.image}
                                                />
                                                );
                                            }) }
                                        </tbody>
                                    </table> : '' }
                                </div>
                            </CardContent>
                        </Card>
                    </PanelWrapper>
                </Container>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: 'flex', flexDirection: 'column' }}
                    open={medalModalOpened > 0}
                >
                    <MContainer sx={{ width: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {medalModalOpened === 1 && <div style={{
                            background: 'linear-gradient(#EE9C21, #FFDDAB, #EE9C21)',
                            textAlign: "center",
                            position: "relative",
                            borderRadius: "64px",
                            padding: "40px 15px"
                        }}>
                            <div
                                style={{
                                    color: "black",
                                    position: "absolute",
                                    right: "50px",
                                    top: "25px"
                                }}
                                onClick={() => setMedalModalOpened(0)}
                            >
                                <CloseIcon/>
                            </div>
                            <p style={{
                                position: 'absolute',
                                left: '50px',
                                top: '25px',
                                margin: 0
                            }}>{questionLastDay}</p>
                            <p style={{
                                fontWeight: 700,
                                fontSize: "50px",
                                color: "black",
                                fontFamily: "QuickSand"
                            }}>Congratulation! <br />You have earned</p>
                            <img style={{
                                width: "20rem",
                                transform: zoom ? "scale(2.5)" : "scale(1)",
                                opacity: zoom ? "0.3" : "1",
                                transition: "all 1.5s"
                            }} src={BronzeMedal} alt="BronzeMedal" onClick={closeMedal} />
                        </div>}
                        {medalModalOpened === 2 && <div style={{
                            background: 'linear-gradient(#A1A1A1, #FFFFFF, #969696)',
                            textAlign: "center",
                            position: "relative",
                            borderRadius: "64px",
                            padding: "40px 15px"
                        }}>
                            <div
                                style={{
                                    color: "black",
                                    position: "absolute",
                                    right: "50px",
                                    top: "25px"
                                }}
                                onClick={() => setMedalModalOpened(0)}
                            >
                                <CloseIcon/>
                            </div>
                            <p style={{
                                position: 'absolute',
                                left: '50px',
                                top: '25px',
                                margin: 0
                            }}>{questionLastDay}</p>
                            <p style={{
                                fontWeight: 700,
                                fontSize: "50px",
                                color: "black",
                                fontFamily: "QuickSand"
                            }}>Congratulation! <br />You have earned</p>
                            <img style={{
                                width: "20rem",
                                transform: zoom ? "scale(2.5)" : "scale(1)",
                                opacity: zoom ? "0.3" : "1",
                                transition: "all 1.5s"
                            }} src={SilverMedal} alt="SilverMedal" onClick={closeMedal} />
                        </div>}
                        {medalModalOpened === 3 && <div style={{
                            background: 'linear-gradient(#FCDF7A, #FFF5CF, #FCDF7A)',
                            textAlign: "center",
                            position: "relative",
                            borderRadius: "64px",
                            padding: "40px 15px"
                        }}>
                            <div
                                style={{
                                    color: "black",
                                    position: "absolute",
                                    right: "50px",
                                    top: "25px"
                                }}
                                onClick={() => setMedalModalOpened(0)}
                            >
                                <CloseIcon/>
                            </div>
                            <p style={{
                                position: 'absolute',
                                left: '50px',
                                top: '25px',
                                margin: 0
                            }}>{questionLastDay}</p>
                            <p style={{
                                fontWeight: 700,
                                fontSize: "50px",
                                color: "black",
                                fontFamily: "QuickSand"
                            }}>Congratulation! <br />You have earned</p>
                            <img style={{
                                width: "20rem",
                                transform: zoom ? "scale(2.5)" : "scale(1)",
                                opacity: zoom ? "0.3" : "1",
                                transition: "all 1.5s"
                            }} src={GoldMedal} alt="GoldMedal" onClick={closeMedal} />
                        </div>}
                        {/* <Button sx={{ borderRadius: '100%', background: BasicColor.green, padding: '10px' }} variant="contained" onClick={() => setMedalModalOpened(0)} >
                            <CloseIcon />
                        </Button> */}
                    </MContainer>
                </Backdrop>
            </StudentMenu>
        </Wrapper>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto;
    margin-top: 10rem;
    max-width: ${ parseInt(ScreenSize.desktop.slice(0, -2)) + 100 }px;
    width: 100%;
    align-items: flex-end;
    box-sizing: border-box;
    @media (max-width: ${ parseInt(ScreenSize.desktop.slice(0, -2)) + 100 }px) {
        flex-direction: column;
        max-width: 100vw;
        padding: 0.5rem;
        margin-top: 0.5rem;
    }
`;

const panelWidth = 390;
const MapWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
    position: relative;
    margin: auto;
    width: 100%;
    @media (max-width: ${ parseInt(ScreenSize.desktop.slice(0, -2)) + 100 }px) {
        width: calc(100% - 1rem);
    }
`;

const PanelWrapper = styled.div`
    margin: 1rem;
    border-radius: 2rem;
    overflow: hidden;
    flex-grow: 0;
    flex-shrink: 0;
    box-shadow: 0 0 10px #0000003f;
    min-width: ${panelWidth}px;
    max-width: calc(${panelWidth}px + 3rem);
    @media (max-width: ${ parseInt(ScreenSize.desktop.slice(0, -2)) + 100 }px) {
        margin: auto;
        margin-bottom: 1rem;
        width: calc(100% - 1rem);
        min-width: calc(${panelWidth}px - 1rem);
    }
    @media (max-width: ${ ScreenSize.tablet }) {
        margin-bottom: 5rem;
        min-width: 0;
    }
`;

const CharactorViewer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: -6.5rem;
    bottom: -5rem;
    @media (max-width: ${ScreenSize.tablet}) {
        display: none;
    }
`;

const MapTitleViewer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MapViewer = styled.div`
    position: relative;
    width: 100%;
    max-width: 660px;
    margin: auto;
`;

const ImgPc = styled.img`
    width: 100%;
    display: block;
    @media (max-width: ${ScreenSize.phone}) {
        display: none;
    }
`;

const ImgMobile = styled.img`
    display: none;
    @media (max-width: ${ScreenSize.phone}) {
        width: 100%;
        display: block;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }
`;

export const MobileCom = styled.div`
    display: none;
    @media (max-width: ${ScreenSize.phone}) {
        display: block;
    }
`;

export const PcCom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    @media (max-width: ${ScreenSize.phone}) {
        display: none;
    }
    &:hover {
        // cursor: pointer;
        // font-size: 1.1rem;
    }
`;
