import {
    Box,
    Paper,
    Typography
} from '@mui/material';
import { FC } from 'react';
import Carousel from 'react-material-ui-carousel'
import { BasicColor } from 'views/Color';
import { ReviewQuestion } from './ReviewQuestion';

export const ReviewBox: FC<{ block: any }> = ({ block }) => {
    return (block &&
        <Paper
            id='question-block'
            sx={{
                height: '100%',
                padding: 2
            }}
        >
            <Typography color='blue'>{block.updateTimestamp.slice(0, 19)}</Typography>
            <Carousel
                navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
                    style: {
                        bottom: '0',
                        top: 'unset',
                        height: 'unset'
                    }
                }}
                autoPlay={false}
                indicators={false}
                animation='slide'
                cycleNavigation={false}
                navButtonsAlwaysVisible
                duration={500}
                height={400}
            >
                {
                    block.blockQuestionPresentation &&
                    block.blockQuestionPresentation.map((element: any, index: number) => (
                        <Box
                            key={element.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                // justifyContent: 'space-around',
                                height: '100%',
                                backgroundColor: BasicColor.greenSoft + '30'
                            }}
                        >
                            <ReviewQuestion
                                questionText={element.question.questionText}
                                questionType={element.question.questionType}
                                answerOptions={element.question.answerOptions}
                                index={index}
                                chosenAnswer={element.chosenAnswer}
                                status={element.status}
                                typedAnswer={element.typedAnswer}
                                subject={element.topic?.areaOfKnowledge?.name}
                                topic={element.topic?.name}
                            />
                        </Box>
                    ))

                }
            </Carousel>
        </Paper>

    )
}

