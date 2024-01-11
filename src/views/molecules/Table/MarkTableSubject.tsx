import { FC, useState } from 'react';
import styled           from 'styled-components';
import ArrowRightIcon   from '@mui/icons-material/ArrowRight';
import { ScreenSize }   from 'constants/screenSize';
import { TypoBtn }      from 'views/atoms/Text';
import { useHistory }   from 'react-router-dom';
import { useSelector }  from 'react-redux';
import { dictionary }   from 'views/pages/Student/Progress/dictionary'
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

const MarkTableDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 6rem;
    color: black;
    width: calc(100% - 2rem);
    margin-left: 1rem;
    margin-right: 1rem;
    overflow: auto;
    @media (min-width: ${ScreenSize.tablet}) {
        margin-bottom: 2rem;
    }
`;

interface ISingleGroup {
    main?: {
        item?: string,
        button?: boolean,
        mastery?: string,
        aokId?: string,
    },
    extra?: ISingleGroup[],
    deep?: number,
    activeAokId?: string,
}

const SingleGroup: FC<ISingleGroup> = ({ main={}, extra=[], deep = 0, activeAokId='' }) => {
    const history = useHistory();
    let language:string = useSelector((state: any) => state.user.language);
    language            = language? language : 'en-us'
    const [opened, setOpened] = useState<boolean>(true);
    const toggle = () => setOpened(val => !val);
    const children = opened ? extra.map((item: ISingleGroup, id: number) => {
        return <SingleGroup activeAokId={activeAokId} key={id} main={item.main} extra={item.extra} deep={deep+1} />
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
            width: '100%',
        }}>
            <div id={'aok-id-' + main.aokId} style={{
                display: 'flex',
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
                    <span style={{
                        paddingLeft: '5px',
                        paddingRight: '5px',
                    }}>{main.item}</span>
                </Subject>
            </div>
            { main.button ? <div style={{
                    display: 'flex',
                    // backgroundColor: colors[deep],
                    backgroundColor: bgColor,
                    cursor: 'pointer',
                    border: '1px solid black',
                }} onClick={toggle}>
                    <TypoBtn style={{
                        background: activeAokId === main.aokId ? '#CE2489' : '#26B824',
                        color: activeAokId === main.aokId ? 'white' : 'black',
                        minWidth: '200px',
                        height: '36px',
                        marginTop: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '1000px',
                        outline: 'none',
                        cursor: 'pointer',
                        marginLeft: `calc(${deep}rem + 2rem)`,
                    }} onClick={() => {
                        if (main.aokId !== '') {
                            // history.push('/question/PATH/' + aokId)
                            history.push('/question/PATH/' + main.aokId)
                            // alert("Developing now, will be released soon 🎓")
                        }
                    }}>{dictionary[language]?.practice}</TypoBtn>
                </div>
            : '' }
            { children }
        </div>
    }
}

const MarkTableSubject = ({
    data=[],
    activeSubjectId='',
}: {
    data: any[];
    activeSubjectId: string,
}) => {
    return (<MarkTableDiv>
        { data && data.length > 0 ? data?.map((aok: any, id: number) => (
            (aok?.subTopicsByGrade.length > 0 || aok?.standardTopic) ? <SingleGroup activeAokId={activeSubjectId} key={id} main={{
                aokId: aok?.id,
                item: aok?.name,
                mastery: aok?.mastery,
                button: aok?.standardTopic ? true : false,
            }} extra={aok?.subTopicsByGrade.map((subTopic1: any) => ({
                main: {
                    aokId: subTopic1?.id,
                    item: subTopic1?.name,
                    mastery: subTopic1?.mastery,
                    button: subTopic1?.standardTopic ? true : false,
                },
                extra: subTopic1?.subTopicsByGrade.map((subTopic2: any) => ({
                    main: {
                        aokId: subTopic2?.id,
                        item: subTopic2?.name,
                        mastery: subTopic2?.mastery,
                        button: subTopic2?.standardTopic ? true : false,
                    },
                    extra: subTopic1?.subTopicsByGrade.map((subTopic3: any) => ({
                        main: {
                            aokId: subTopic3?.id,
                            item: subTopic3?.name,
                            mastery: subTopic3?.mastery,
                            button: subTopic3?.standardTopic ? true : false,
                        },
                    }))
                }))
            }))} deep={1} /> : ''
        )) : '' }
    </MarkTableDiv>);
};

export default MarkTableSubject;
