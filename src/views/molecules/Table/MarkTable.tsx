import { FC, useState } from 'react';
import styled from 'styled-components';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ScreenSize } from 'constants/screenSize';

const colors = [
    '#CC5B1D',
    '#28D764',
    '#FFD814',
    '#FF4646',
    '#FF8D8D',
    '#C6CACC'
];
const masteryColors = {
    'NP': '#919699',
    'N': '#EC5858',
    'C': '#F4C222',
    'M': '#26B824'
}

const Subject = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    min-height: 28px;
    display: flex;
    justify-content: start;
    align-items: center;
`;

const Mark = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    width: 135px;
    min-height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    @media (max-width: ${ScreenSize.phone}) {
        width: 100%;
        justify-content: start;
    }
`;

const MarkTableDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 6rem;
    color: black;
    max-width: 760px;
    margin-left: auto;
    margin-right: auto;
    overflow: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    @media (min-width: ${ScreenSize.phone}) {
        margin-bottom: 2rem;
        width: 100%;
    }
`;

interface ISingleGroup {
    main?: {
        item1?: string,
        item2?: string,
        item3?: string,
        item4?: string,
        mastery?: string,
    },
    extra?: ISingleGroup[],
    deep?: number,
}

const SingleGroup: FC<ISingleGroup> = ({ main = {}, extra = [], deep = 0 }) => {
    const [opened, setOpened] = useState<boolean>(false);
    const toggle = () => setOpened(val => !val);
    const [markOpened, setMarkOpened] = useState<boolean>(false);
    const toggleMark = () => setMarkOpened(val => !val);
    const children = opened ? extra.map((item: ISingleGroup, id: number) => {
        return <SingleGroup key={id} main={item.main} extra={item.extra} deep={deep + 1} />
    }) : '';
    let bgColor = masteryColors.NP;
    if (main.mastery === 'NP') {
        bgColor = masteryColors.NP;
    } else if (main.mastery === 'N') {
        bgColor = masteryColors.N;
    } else if (main.mastery === 'C') {
        bgColor = masteryColors.C;
    } else if (main.mastery === 'M') {
        bgColor = masteryColors.M;
    }
    if (main === {}) {
        return <></>;
    } else {
        return <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <PcCom style={{
                // backgroundColor: colors[deep],
                backgroundColor: bgColor,
                cursor: 'pointer',
                border: '1px solid black'
            }} onClick={toggle}>
                <Subject style={{
                    paddingLeft: `${deep}rem`,
                }}>
                    <ArrowRightIcon style={{
                        transform: opened ? 'rotate(90deg)' : 'rotate(0deg)',
                        opacity: extra.length > 0 ? '100' : '0'
                    }} />
                    <span>{main.item1}</span>
                </Subject>
                <Mark>{main.item2}</Mark>
                <Mark>{main.item3}</Mark>
                <Mark>{main.item4}</Mark>
            </PcCom>
            <MobileCom style={{
                backgroundColor: bgColor,
                cursor: 'pointer',
            }}>
                <Subject style={{
                    paddingLeft: `${deep}rem`,
                    border: '1px solid black'
                }} onClick={toggle}>
                    <ArrowRightIcon style={{
                        transform: opened ? 'rotate(90deg)' : 'rotate(0deg)',
                        opacity: extra.length > 0 ? '100' : '0'
                    }} />
                    <span>{main.item1}</span>
                </Subject>
                {main.item2 !== 'Accuracy' ? <Mark style={{
                    paddingLeft: `${deep + 1.5}rem`,
                    border: '1px solid black'
                }} onClick={toggleMark}>
                    <ArrowRightIcon style={{
                        transform: markOpened ? 'rotate(90deg)' : 'rotate(0deg)',
                    }} />
                    <div>
                        <div>Accuracy {main.item2}</div>
                        {markOpened ? <>
                            <span style={{
                                marginRight: '1rem'
                            }}>Correct {main.item3}</span>
                            <span>Total {main.item4}</span>
                        </> : ''}
                    </div>
                </Mark> : ''}
            </MobileCom>
            {children}
        </div>
    }
}

const MarkTable = ({
    activeSubjectId = -1,
    onChangeActiveIdHandler = () => { },
    data = [],
    areasOfKnowledge = [],
}: {
    activeSubjectId: number;
    onChangeActiveIdHandler: (x: number) => void;
    data: any;
    areasOfKnowledge: any[];
}) => {
    return (<MarkTableDiv>
        <PcCom style={{
            backgroundColor: colors[0],
            cursor: 'pointer',
            border: '1px solid black'
        }}>
            <select
                style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    minHeight: '28px',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    paddingLeft: `${1}rem`,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                }} name='' id='' value={activeSubjectId} onChange={e => onChangeActiveIdHandler(parseInt(e.target.value))}
            >
                {
                    areasOfKnowledge && areasOfKnowledge.map((subject: any) => <option key={subject.id} value={subject.id || ''}>{subject?.name}</option>)
                }

                {/* -----This is old code---------- */}
                {/* {areasOfKnowledge && typeof areasOfKnowledge === 'object' && areasOfKnowledge.length > 0 ? areasOfKnowledge.map((subject: any, id) => {
                    if (subject?.name === "Test AoK" || subject?.name === "USA Math" || subject?.name === "ELA") return null
                    return (
                        <option key={id} value={subject?.id}>{subject?.name}</option>
                    )
                }) : ''} */}
            </select>
            <Mark>Accuracy</Mark>
            <Mark>Correct</Mark>
            <Mark>Total</Mark>
        </PcCom>
        <MobileCom style={{
            backgroundColor: colors[0],
            cursor: 'pointer',
        }}>
            <select style={{
                flexGrow: 1,
                flexShrink: 1,
                minHeight: '28px',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                paddingLeft: `${0}rem`,
                background: 'transparent',
                width: '100%',
                height: '100%',
                border: 'none',
                outline: 'none',
            }} name='' id='' onChange={e => onChangeActiveIdHandler(parseInt(e.target.value))}>
                {areasOfKnowledge.map((subject, id) => (
                    <option key={id} value={subject?.id}>{subject?.name}</option>
                ))}
            </select>
        </MobileCom>
        {data && data.rootTopicsByAok && data.rootTopicsByAok.length > 0 ? data?.rootTopicsByAok?.map((aok: any, id: number) => (
            <SingleGroup key={id} main={{
                item1: aok?.name,
                item2: aok?.report?.accuracy ? aok?.report?.accuracy + '%' : '0%',
                item3: aok?.report?.correctQuestion ? aok?.report?.correctQuestion : '0',
                item4: aok?.report?.questionsAnswered ? aok?.report?.questionsAnswered : '0',
                mastery: aok?.mastery
            }} extra={aok?.subTopics.map((subTopic1: any) => ({
                main: {
                    item1: subTopic1?.name,
                    item2: subTopic1?.report?.accuracy ? subTopic1?.report?.accuracy + '%' : '0%',
                    item3: subTopic1?.report?.correctQuestion ? subTopic1?.report?.correctQuestion : '0',
                    item4: subTopic1?.report?.questionsAnswered ? subTopic1?.report?.questionsAnswered : '0',
                    mastery: subTopic1?.mastery
                },
                extra: subTopic1?.subTopics.map((subTopic2: any) => ({
                    main: {
                        item1: subTopic2?.name,
                        item2: subTopic2?.report?.accuracy ? subTopic2?.report?.accuracy + '%' : '0%',
                        item3: subTopic2?.report?.correctQuestion ? subTopic2?.report?.correctQuestion : '0',
                        item4: subTopic2?.report?.questionsAnswered ? subTopic2?.report?.questionsAnswered : '0',
                        mastery: subTopic2?.mastery
                    },
                    extra: subTopic1?.subTopics.map((subTopic3: any) => ({
                        main: {
                            item1: subTopic3?.name,
                            item2: subTopic3?.report?.accuracy ? subTopic3?.report?.accuracy + '%' : '0%',
                            item3: subTopic3?.report?.correctQuestion ? subTopic3?.report?.correctQuestion : '0',
                            item4: subTopic3?.report?.questionsAnswered ? subTopic3?.report?.questionsAnswered : '0',
                            mastery: subTopic3?.mastery
                        },
                    }))
                }))
            }))} deep={1} />
        )) : null}
    </MarkTableDiv>);
};

export default MarkTable;

export const MobileCom = styled.div`
    display: none;
    @media (max-width: ${ScreenSize.phone}) {
        display: block;
    }
`;

export const PcCom = styled.div`
    display: flex;
    @media (max-width: ${ScreenSize.phone}) {
        display: none;
    }
`;
