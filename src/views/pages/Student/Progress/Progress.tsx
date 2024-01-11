import { useState, useEffect, useContext, FC, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { StudentMenu } from 'views/pages/Student/Menus/StudentMenu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MarkTableSubject from 'views/molecules/Table/MarkTableSubject';
import { LoadingContext } from 'react-router-loading';
import { Container, Wrapper } from './Style';
import { dictionary } from './dictionary'
import { useSelector } from 'react-redux';
import {  TopicReportWithGrade, AvaliableGrades } from 'api/fragments/topicFragments';
import query from 'api/queries/get';

import { smoothScroll } from 'views/utils';
import _ from 'lodash';
import { PageTitle } from 'views/molecules/PageTitle';
import { Button } from '@mui/material';



const masteryColors = {
    'NP': '#919699',
    'N': '#EC5858',
    'C': '#F4C222',
    'M': '#26B824'
}

const screen_width = window.innerWidth;
let lineCount = 10;
let verticalCount = 0;
let unitHeight = 8;
if (screen_width < 450) {
    lineCount = 4;
    verticalCount = 0;
    unitHeight = 4;
} else if (screen_width < 768) {
    lineCount = 6;
    verticalCount = 0;
    unitHeight = 5;
} else {
    lineCount = 10;
    verticalCount = 0;
    unitHeight = 8;
}

const getAllTopic: any = (subSubjectList: Array<any>, deep: number) => {
    return subSubjectList.map(subSubject => {
        return (deep !== 1 || subSubject.subTopicsByGrade.length > 0) ? [subSubject, getAllTopic(subSubject.subTopicsByGrade, deep + 1)] : [subSubject]
    })
}

export const KidsProgress = () => {
    const user = useSelector((state: any) => state.user);
    const student = useSelector((state: any) => state.student);
    let language: string = useSelector((state: any) => state.user.language);
    language = language ? language : 'en-us'

    const [activeSubjectId, setActiveSubjectId] = useState<number>(-1);
    const [activeSubjectIdTable, setActiveSubjectIdTable] = useState<string>('');
    const [areasOfKnowledge, setAreasOfKnowledge] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [activeGradeId, setActiveGradeId] = useState<number>(-1);
    const [grades, setGrades] = useState<Array<{
        id: string,
        name: string
    }>>([]);
    useEffect(() => {
        if (student) {
            (async () => {
                setAreasOfKnowledge(student.guardianstudentplan.subject);
                setActiveSubjectId(student.guardianstudentplan.subject.filter((_subject: any) => _subject.name === "Financial LIteracy")[0].id || student.guardianstudentplan.subject[0].id);
            })();
        }
    }, [student]);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const loadingContext = useContext(LoadingContext);
    useEffect(() => {
        if (activeSubjectId > 0) {
            (async () => {
                loadingContext.start();
                // Get Topic Report
                const res: any = await query('', AvaliableGrades(activeSubjectId)).catch(e => ({ success: false }));
                if (res.success === false) {
                    return
                }
                const result: any = await res.json();
                if (result.errors && !result.data) {
                    alert(result.errors[0].message);
                } else {
                    if (result.data.areaOfKnowledgeById.audience.gradeSet.length > 0) {
                        setGrades(result.data.areaOfKnowledgeById.audience.gradeSet);
                        // setActiveGradeId(result.data.areaOfKnowledgeById.audience.gradeSet.filter((grade: any) => grade.name === "1st Grade")[0]?.id || result.data.areaOfKnowledgeById.audience.gradeSet[0].id);
                        setActiveGradeId(result.data.areaOfKnowledgeById.audience.gradeSet[0].id);
                    }
                }
            })();
        }
    }, [activeSubjectId]);
    useEffect(() => {
        if (activeSubjectId !== -1 && activeGradeId !== -1) {
            (async () => {
                loadingContext.start();
                // Get Topic Report
                // const res:any = await query('', TopicReportByAokAndGrade(parseInt(student.id), activeSubjectId, activeGradeId), user.token).catch(e => ({success: false}));
                const res: any = await query('', TopicReportWithGrade(parseInt(student.id), activeSubjectId, activeGradeId), user.token).catch(e => ({ success: false }));
                if (res.success === false) {
                    return
                }
                const result: any = await res.json();
                console.log(result.data.rootTopicsByAok);
                if (result.errors && !result.data) {
                    alert(result.errors[0].message);
                } else {
                    setData(result.data.rootTopicsByAok);
                }
                // if (firstLoad) {
                //     setFirstLoad(false);
                loadingContext.done();
                // }
            })();
        }
    }, [activeSubjectId, activeGradeId]);

    const handleGradeChange = (event: any) => {
        setActiveGradeId(event.target.value);
    };
    const handleSubjectChange = (event: any) => {
        setActiveSubjectId(event.target.value);
    };
    const subSubjects1 = _.flattenDeep(getAllTopic(data, 1)).filter((__subSubject: any) => __subSubject.standardTopic).map((_subSubject: any, id) => {
        let bgColor = masteryColors.NP;
        if (_subSubject.mastery) {
            if (_subSubject.mastery === 'NP') {
                bgColor = masteryColors.NP;
            } else if (_subSubject.mastery === 'N') {
                bgColor = masteryColors.N;
            } else if (_subSubject.mastery === 'C') {
                bgColor = masteryColors.C;
            } else if (_subSubject.mastery === 'M') {
                bgColor = masteryColors.M;
            }
        }
        return ({
            ..._subSubject,
            aokId: _subSubject.id || '',
            text: _subSubject.name || '',
            bgColor: bgColor,
            active: false,
        })
    })
    console.log(subSubjects1)

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

    const history = useHistory();
    const [type, setType] = useState<string>();
    const handleTypeChange = (e: any) => setType(e.target.value);
    return (
    <Wrapper>
        <StudentMenu>
            <PageTitle title={dictionary[language]?.title} />
            <Container>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    width: '100%',
                    paddingTop: '1rem'
                }}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            {/* <InputLabel id='demo-simple-select-label' style={{
                                background: '#1771B9',
                                color: 'white'
                            }}>Grade</InputLabel> */}
                            <Select
                                id='demo-simple-select'
                                value={activeGradeId}
                                onChange={handleGradeChange}
                                SelectDisplayProps={{
                                    style: {
                                        background: '#1771B9',
                                        color: 'white'
                                    }
                                }}
                            >
                                {grades.map((grade: any, id: number) => (
                                    <MenuItem key={id} value={grade.id}>{grade.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <div style={{
                        flexGrow: 1,
                        flexShrink: 1,
                    }}></div>
                    <Box sx={{ minWidth: 120 }} style={{
                        marginRight: '1rem'
                    }}>
                        <Button
                            variant='contained'
                            sx={{height: '100%'}}
                            onClick={() => {
                                history.push('/review')
                            }}
                        >
                            {dictionary[language]?.reviewQuestionsAnswered}
                        </Button>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <Select
                                id='demo-simple-select'
                                value={activeSubjectId}
                                onChange={handleSubjectChange}
                                SelectDisplayProps={{
                                    style: {
                                        background: '#CE2489',
                                        color: 'white'
                                    }
                                }}
                            >
                                {areasOfKnowledge.map((subject, id) => (
                                    <MenuItem key={id} value={subject.id}>{subject.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div ref={mapBgRef} style={{
                    position: 'relative',
                    width: '100%',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    overflow: 'hidden',
                    backgroundImage: `url("map.svg")`,
                    backgroundColor: `rgb(235, 119, 56)`,
                    backgroundRepeat: 'repeat',
                    minHeight: (
                        (
                            Math.ceil(subSubjects1.length / (lineCount + verticalCount))
                        ) * unitHeight * 1.5) + 'rem'
                }}>
                    {subSubjects1.length > 0 ? subSubjects1.map((singleInfo, id) => {
                        if (singleInfo && singleInfo.text) {
                            const _id = id + 1;
                            const rotatingStatus = (_id % (lineCount + verticalCount) >= lineCount || _id % (lineCount + verticalCount) === 0) ? (
                                Math.floor((_id - 1) / (lineCount + verticalCount)) % 2 === 0 ? 1 : -1
                            ) : 0
                            return (
                                <div key={id} style={{
                                    position: 'absolute',
                                    top: (_id % (verticalCount + lineCount)) > lineCount ? // (_id % (lineCount + verticalCount) === 11 || _id % (lineCount + verticalCount) === 12) ?
                                        (Math.floor(_id / (lineCount + verticalCount))) * ((unitHeight * 1.5) * (verticalCount + 1)) + (id % (lineCount + verticalCount) - lineCount + 1) * (unitHeight * 1.5) + 'rem' :
                                        (
                                            _id % (lineCount + verticalCount) === 0 ?
                                                (Math.floor(_id / (lineCount + verticalCount)) - 1) * ((unitHeight * 1.5) * (verticalCount + 1)) + verticalCount * (unitHeight * 1.5) + 'rem' :
                                                Math.floor((_id) / (lineCount + verticalCount)) * ((unitHeight * 1.5) * (verticalCount + 1)) + 'rem'
                                        ),
                                    left: (_id % (verticalCount + lineCount)) >= lineCount ? // (_id % (lineCount + verticalCount) === 11 || _id % (lineCount + verticalCount) === 12) ?
                                        ((lineCount - 1) * (Math.floor(_id / (lineCount + verticalCount)) % 2 === 0 ? (100 / lineCount) : 0) + '%') :
                                        (
                                            _id % (lineCount + verticalCount) === 0 ?
                                                ((lineCount - 1) * ((Math.floor(_id / (lineCount + verticalCount)) - 1) % 2 === 0 ? (100 / lineCount) : 0) + '%') :
                                                (
                                                    (Math.floor(_id / (lineCount + verticalCount)) % 2 === 0) ?
                                                        ((_id % (lineCount + verticalCount) - 1) * (100 / lineCount) + '%') :
                                                        ((lineCount - _id % (lineCount + verticalCount)) * (100 / lineCount) + '%')
                                                )
                                        ),
                                    width: ((_id % (verticalCount + lineCount)) === 0 || (_id % (verticalCount + lineCount)) >= lineCount) ? 100 / (lineCount + Math.floor(lineCount / 8)) + '%' : 100 / lineCount + '%',
                                    height: ((_id % (verticalCount + lineCount)) === 0 || (_id % (verticalCount + lineCount)) >= lineCount) ? unitHeight * 1.5 + 'rem' : unitHeight + 'rem',
                                    padding: '10px 16px',
                                    boxSizing: 'border-box',
                                    writingMode: rotatingStatus === 0 ? 'initial' : 'vertical-rl',
                                    textOrientation: 'mixed',
                                    transform: rotatingStatus === -1 ? "rotate(180deg)" : "rotate(0deg)",
                                }}>
                                    <div style={{
                                        width: `100%`,
                                        height: '100%',
                                        background: singleInfo.bgColor,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        fontSize: '0.7rem',
                                        transform: singleInfo.active ? 'scale(1.2)' : 'scale(1)',
                                        outline: singleInfo.active ? '2px solid black' : 'none',
                                        cursor: 'pointer',
                                    }} onClick={() => {
                                        if (singleInfo.aokId !== '') {
                                            smoothScroll('#aok-id-' + singleInfo.aokId)
                                            setActiveSubjectIdTable(singleInfo.aokId);
                                        }
                                    }}>
                                        {singleInfo.text}
                                    </div>
                                </div>
                            )
                        } else {
                            return <></>
                        }
                    }) : <p style={{
                        textAlign: "center",
                        fontSize: "3rem"
                    }}>There is no Subjects</p>}
                </div>
            </Container>
            <Container>
                <MarkTableSubject
                    data={data}
                    activeSubjectId={activeSubjectIdTable}
                />
            </Container>
        </StudentMenu>
    </Wrapper>)
}
