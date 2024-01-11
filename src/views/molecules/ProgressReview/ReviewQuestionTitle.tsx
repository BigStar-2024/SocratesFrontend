import {
    Box,
    Typography,
} from '@mui/material';
import { FC } from 'react';
import { extractMathjaxText, extractQuestion } from 'views/utils';
import he from 'he'
import MathJax from 'react-mathjax';

interface ReviewQuestionTitleProps {
    questionText: string
    index: number
}

export const ReviewQuestionTitle: FC<ReviewQuestionTitleProps> = ({
    questionText,
    index
}) => {
    const questionString = questionText.charAt(0) === '@' ? extractQuestion(questionText) : he.decode(questionText)

    return (
        questionText.charAt(0) === '@' ?
            <>
                <div dangerouslySetInnerHTML={{ __html: he.decode(index + 1 + '. ' + questionString) }} />
                <MathJax.Provider>
                    <MathJax.Node
                        formula={he.decode(extractMathjaxText(questionText))}
                    />
                </MathJax.Provider>
            </> :
            questionText.slice(0, 4) === 'TYPE' ?
                <Box>
                    <Typography >
                        {questionText && extractQuestion(questionText)}
                        {he.decode(extractMathjaxText(questionText).replaceAll('B', '__').replaceAll(',', ''))}
                    </Typography>
                </Box> :
                <div dangerouslySetInnerHTML={{ __html: he.decode(index + 1 + '. ' + questionText) }} />
    )
}
