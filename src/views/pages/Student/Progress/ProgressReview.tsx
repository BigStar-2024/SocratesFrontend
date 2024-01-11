import { useEffect, useContext, useState } from 'react';
import { StudentMenu } from 'views/pages/Student/Menus/StudentMenu';
import { dictionary } from './dictionary'
import { useSelector } from 'react-redux';
import { LoadingContext } from 'react-router-loading';
import { PageTitle } from 'views/molecules/PageTitle';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Typography,
} from '@mui/material';
import { BasicColor } from 'views/Color';
import {
    useQuery,
} from 'react-query'
import { doFetchStudentAnswerHistory } from 'app/actions/blockActions';
import { getMessage } from 'views/utils';
import { ReviewBlocks } from 'views/molecules/ProgressReview/ReviewBlocks';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { PeriodSelect } from 'views/molecules/ProgressReview/PeriodSelect';
import { Wrapper } from './Style';
import { LoadingSpinner } from 'views/atoms/Spinner';


// const mockup = {
//     subject: 'Math',
//     topic: 'Add',
//     isCorrect: false,
// }

export const ProgressReview = () => {
    const token = useSelector((state: any) => state.user.token);
    const studentId = useSelector((state: any) => state.student.id);
    const [args, setArgs] = useState<any>({ period: 1, status: 'ALL' })
    let language: string = useSelector((state: any) => state.user.language);
    language = language ? language : 'en-us'
    const loadingContext = useContext(LoadingContext);
    const { data: blocks, isLoading, error } = useQuery(['fetch-answer-history', studentId, args.period, args.status, token], () => doFetchStudentAnswerHistory(studentId, args.period, args.status, token))
    const history = useHistory();

    useEffect(() => {
        !isLoading && loadingContext.done();
    }, [isLoading]);
    return (
        <Wrapper>
            <StudentMenu>
                <PageTitle title={dictionary[language]?.title} />

                <Container>
                    <Box
                        display='flex'
                        justifyContent={'space-between'}
                    >
                        <Button
                            variant='contained'
                            color='secondary'
                            sx={{ borderRadius: 5 }}
                            startIcon={<ArrowLeftIcon />}
                            onClick={() => {
                                history.goBack()
                            }}
                        >
                            return
                        </Button>
                        <PeriodSelect update={setArgs} />
                    </Box>
                    {isLoading ? <LoadingSpinner /> :
                        error ? <Typography color='red'>{getMessage(error)}</Typography> :
                            <Box
                                id='blocks-container'
                                sx={{
                                    backgroundColor: BasicColor.greenSoft + 'A0',
                                    minHeight: '90vh',
                                    padding: 5,
                                    marginBottom: 5,
                                }}
                            >
                                {
                                    blocks && <ReviewBlocks blocks={blocks} />
                                }
                            </Box>
                    }
                </Container>
            </StudentMenu>
        </Wrapper>
    )
}
