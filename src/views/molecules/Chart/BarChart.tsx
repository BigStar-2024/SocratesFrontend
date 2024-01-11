import TitleKidBackground from 'views/assets/title-kids-background.png';
import ReportCheckIcon from 'views/assets/parent/report-check.png';
import ReportCoinIcon from 'views/assets/parent/report-coin.png';
import styled from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import 'react-vis/dist/style.css';
import {
    XYPlot,
    VerticalBarSeries,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
} from 'react-vis';
import TitleGameBackground from 'views/assets/title-games-background.png';
import { Typography } from 'views/atoms/Text/typography';
import { ImageAvatar } from '../Avatar/DefaultAvatar';
import query from 'api/queries/get';
import { LastWeekAndCoinsQuestions } from 'api/fragments/studentFragments';
import { dictionary } from './dictionary';


const ChartHeaderContrainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    background: #D1E3F1;
    padding-top: 1rem;
    padding-bottom: 1rem;
    @media (min-width: ${ScreenSize.phone}) {
        flex-direction: row;
        background: transparent;
        margin-top: 5rem;
    }
`;
const ChartTitleGroup = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`;
const ChartTitleBG = styled.img`
    position: absolute;
    height: 100%;
    margin-left: 0;
    width: 100%;
    z-index: 10;
    display: none;
    @media (min-width: ${ScreenSize.phone}) {
        margin-left: -10rem;
        display: block
    }
`;
const ChartTitle = styled.span`
    z-index: 20;
    color: #3F3F3F;
    position: relative;
    font-weight: 700;
    font-family: ${Typography.secondary};
    font-style: normal;
    font-size: 40px;
    line-height: 50px;
    padding-right: 3rem;
    padding-left: 3rem;
    text-align: center;
    width: 100%;
    @media (min-width: ${ScreenSize.phone}) {
        padding-right: 10rem;
        padding-left: 0;
        color: white;
    }
`;

// const MONTHS = [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
// ]

const WEEKS = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
]

interface iChartData {
    x: number,
    y: number
}

interface BarChartProps {
    student: any,
    studentId: string
}

// export const BarChart = ({ student }: { student: any }) => {
export const BarChart = ({ student }: BarChartProps) => {

    const user = useSelector((state: any) => state.user)
    const language = user.language || 'en-us'
    const [barChartData, setBarChartData] = useState<iChartData[]>([]);
    const [barChartData2, setBarChartData2] = useState<iChartData[]>([]);

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [chartWidth, setChartWidth] = useState<number>(0);
    useEffect(() => {
        const timer = setInterval(() => {
            if (chartContainerRef.current?.clientWidth) {
                setChartWidth(val => {
                    if (val === chartContainerRef.current?.clientWidth) {
                        clearInterval(timer);
                        return val
                    } else {
                        return chartContainerRef.current?.clientWidth || 0
                    }
                });
            }
        }, 1000);
    }, []);

    // const user = useSelector((state: any) => state.user);
    useEffect(() => {
        if (student?.id && user?.token) {
            (async () => {
                const res: any = await query('', LastWeekAndCoinsQuestions(1), user.token).catch(e => ({ success: false }));
                if (res.success !== false) {
                    const result: any = await res.json();
                    if (result.errors && !result.data) {
                        alert(result.errors[0].message);
                    } else {
                        const { lastWeekCoins, lastWeekQuestions } = result.data.students.filter((_student: any) => _student.id === student?.id)[0];
                        // setBarChartData(lastWeekQuestions.map((_question: any) => ({ x: new Date(_question.day).getDay(), y: _question.question})))
                        let chartData1 = [];
                        chartData1 = [0, 1, 2, 3, 4, 5, 6].map(_day => {
                            const dayQuestion = lastWeekQuestions.filter((_question: any) => new Date(_question.day).getDay() === _day)
                            if (dayQuestion.length > 0) {
                                return { x: _day, y: dayQuestion[0].questions }
                            } else {
                                return { x: _day, y: 0 }
                            }
                        });
                        setBarChartData(chartData1);
                        let chartData2 = [];
                        chartData2 = [0, 1, 2, 3, 4, 5, 6].map(_day => {
                            const dayCoins = lastWeekCoins.filter((_coin: any) => new Date(_coin.day).getDay() === _day)
                            if (dayCoins.length > 0) {
                                return { x: _day, y: parseInt(dayCoins[0].coins) }
                            } else {
                                return { x: _day, y: 0 }
                            }
                        });
                        setBarChartData2(chartData2)
                    }
                }
            })()
        }
    }, [student, user]);
    return (
        <div style={{ position: 'relative', maxWidth: '768px', margin: 'auto' }}>
            <MobileCom>
                <img style={{
                    position: 'absolute',
                    height: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                }} src={TitleGameBackground} alt='TitleGameBackground'></img>
                <h3 style={{
                    position: 'relative',
                    width: '100%',
                    fontWeight: 700,
                    fontSize: '24px',
                    lineHeight: '28px',
                    color: '#3F3F3F',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    zIndex: 20,
                }}>{dictionary[language]?.yourChildren}</h3>
            </MobileCom>
            <ChartHeaderContrainer>
                {
                    student && <ImageAvatar
                        name={student.fullName ? student.fullName : 'F'}
                        accessory={student.currentAvatarAccessories ? student.currentAvatarAccessories : null}
                        head={student.currentAvatarHead ? student.currentAvatarHead : null}
                        clothes={student.currentAvatarClothes ? student.currentAvatarClothes : null}
                        // skinTone={null}
                        size={150}
                    />
                }
                <ChartTitleGroup>
                    <ChartTitleBG src={TitleKidBackground} alt='Kid Title Bg' />
                    <ChartTitle>{student?.fullName} <span><br /></span>{dictionary[language]?.yourChildren}</ChartTitle>
                </ChartTitleGroup>
            </ChartHeaderContrainer>
            <div ref={chartContainerRef} style={{
                position: 'relative',
                width: 'calc(100% - 2rem)',
                marginLeft: '1rem',
                marginRight: '1rem',
                overflowX: 'auto'
            }}>
                <XYPlot height={450} width={chartWidth}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis style={{
                        text: {
                            fontSize: chartWidth < 576 ? '0.8rem' : '1.2rem'
                        }
                    }} tickLabelAngle={0} tickFormat={v => WEEKS[v]} />
                    <YAxis style={{
                        text: {
                            fontSize: '1rem'
                        }
                    }} width={52} />
                    {/* <AreaSeries fill={'#F4C222'} opacity={0.54} data={areaChartData} curve={'curveMonotoneX'} />
                    <LineSeries fill={'#F4C222'} opacity={0.54} data={areaChartData} curve={'curveMonotoneX'} /> */}
                    <VerticalBarSeries color='#26B824' barWidth={0.7} data={barChartData} opacity={0.6} />
                    <VerticalBarSeries color='#F4C222' barWidth={0.7} data={barChartData2} opacity={0.6} />
                </XYPlot>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
                marginBottom: '1rem',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <img src={ReportCheckIcon} alt='ReportCheckIcon' />
                    <span style={{ marginLeft: '0.5rem' }}>{dictionary[language]?.correctAnswers}</span>
                </div>
                <div style={{
                    display: 'flex',
                    marginLeft: '3rem',
                    alignItems: 'center'
                }}>
                    <img src={ReportCoinIcon} alt='ReportCoinIcon' />
                    <span style={{ marginLeft: '0.5rem' }}>{dictionary[language]?.coinsEarned}</span>
                </div>
            </div>
        </div>
    )
}

export const MobileCom = styled.div`
    display: none;
    position: relative;
    @media (max-width: ${ScreenSize.phone}) {
        display: block;
    }
`;

export const PcCom = styled.div`
    display: block;
    position: relative;
    @media (max-width: ${ScreenSize.phone}) {
        display: none;
    }
`;
