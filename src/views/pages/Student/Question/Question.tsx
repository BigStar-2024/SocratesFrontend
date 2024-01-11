import { FC, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { LessonProgress } from 'views/molecules/LessonProgress/LessonProgress';
import { useParams } from 'react-router-dom';
import { LoadingContext } from 'react-router-loading';
import {
  Container,
  Wrapper,
  ProgressWrapper,
} from './Style';
import { FinishLesson } from 'views/organisms/FinishLesson';
import { StudentMenu } from 'views/pages/Student/Menus/StudentMenu';
import { LevelUpDgContent } from 'views/atoms/ParticlgBg';
import { CardDialog } from 'views/molecules/StudentCard/MyCards/CardDialog';
import { finishBlock } from 'app/actions/blockActions';
import { IBlockPresentation, IQuestion } from 'app/entities/block';
import { Store } from 'app/configureStore';
import * as TYPE from 'app/types';
import {
  createAiBlockPresentation,
  createPathBlockPresentation,
  getBlockPresentationById
} from 'app/actions/blockActions';
import { getNextLevel } from 'app/actions/userActions';

interface RoutePresentationParams {
  mode: string;
  aokId: string;       //Area of Knowledge Id on AI or Path mode, BlockPresentationId on BlockID mode
}

interface BlockQuestionInput {
  question: number;
  answerOption: number;
  isCorrect: boolean;
}

const EXP_UNIT = 5;

export const Question: FC = () => {

  const earning = useSelector((state: any) => state.earning);
  const user = useSelector((state: any) => state.user);
  const student = useSelector((state: any) => state.student)
  const state = useSelector((state: Store) => state);
  const loadingContext = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { mode, aokId } = useParams<RoutePresentationParams>();
  const [blockPresentation, setBlockPresentation] = useState<IBlockPresentation>();
  const [question, setQuestion] = useState<IQuestion>();
  const [questionCounter, setQuestionCounter] = useState(Number);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [answerResult, setAnswerResult] = useState<BlockQuestionInput[]>([]);
  const [pointUnit, setPointUnit] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState(false)
  const [nextMaxExp, setNextMaxExp] = useState(0)
  const [openDg, setOpenDg] = useState(false);
  const [bonusCoins, setBonusCoins] = useState(0)

  const updateNextLevel = async (currentLevelAmount: number) => {
    const res: any = await getNextLevel(currentLevelAmount, user.token, dispatch)
    if (res.msg) setNextMaxExp(earning.expMax)
    else setNextMaxExp(res)
  }

  const onAnswer = (result: BlockQuestionInput) => {
    //test
    // result.isCorrect = true;
    increaseExp(result.isCorrect);

    setAnswerResult([...answerResult, result]);
    if (result.isCorrect) {
      setPoints(points + pointUnit);
    }
  };

  const increaseExp = async (isCorrect: boolean) => {
    const currentExp = earning.exp + (isCorrect ? EXP_UNIT : 1);
    const expMax = earning.expMax

    if (currentExp > expMax) {
      dispatch({ type: TYPE.EXP_UPDATE, payload: { exp: currentExp - expMax, expMax: nextMaxExp } });
      dispatch({ type: TYPE.EXP_LEVEL_UP });
      congratulations();

      const nextLevelMax: any = await updateNextLevel(earning.level)
      if (nextLevelMax.msg) {
        console.log(nextLevelMax.msg)
      } else setNextMaxExp(nextLevelMax)
    } else dispatch({ type: TYPE.EXP_UPDATE, payload: { exp: currentExp, expMax: expMax } });
  };

  // Open Congratulations dialog when user passes the max exp of current level.
  const congratulations = () => {
    setOpenDg(!openDg);
  };

  const upgradeEnergy = () => {
    const currentResult = answerResult[answerResult.length - 1]?.isCorrect;
    console.log('Answer Result: ', answerResult)
    console.log('current Result is: ', currentResult);
    if (currentResult === false) dispatch({ type: TYPE.EARNING_ENERGY_RESET });
    if (answerResult.length < 2) {
      if (earning.energyCharge > 0 && currentResult) {
        dispatch({ type: TYPE.EARNING_ENERGY_UP });
        setBonusCoins(bonusCoins + (earning.energyCharge > 9 ? 10 : ((earning.energyCharge + 1) * pointUnit / 10)))
        console.log('bonus coins is ', bonusCoins)
      }
      return
    }
    const lastResult = answerResult[answerResult.length - 2]?.isCorrect;
    if (currentResult) {
      if (!lastResult) return;
      else {
        dispatch({ type: TYPE.EARNING_ENERGY_UP });
        setBonusCoins(bonusCoins + (earning.energyCharge > 9 ? 10 : ((earning.energyCharge + 1) * pointUnit / 10)))
      }
    }
    // console.log('bonus coins is ', bonusCoins)
  };

  // const handleData = (data: any) => {
  //   setBlockPresentation(data.data.blockPresentationById);
  //   setPointUnit(10);
  //   // loadingContext.done()
  //   try {
  //     dispatch({
  //       type: TYPE.SET_BLOCK_PRESENTATION,
  //       payload: data.data.blockPresentationById,
  //     });
  //     loadingContext.done();
  //   } catch (error) {
  //     console.log('Error de dispatch', error);
  //   }
  // };

  // const handleError = (error: any) => {
  //   console.error(error);
  // };

  const setQuestionsInAI = async () => {
    const result: any = await createAiBlockPresentation(
      parseInt(aokId),
      user.token,
    );
    if (!result.success) {
      enqueueSnackbar(result.msg, { variant: 'error' });
      return false;
    }
    setBlockPresentation(result.data);
    setPointUnit(10);
    loadingContext.done()
    return true;
  }

  const setQuestionsInPath = async () => {
    const result: any = await createPathBlockPresentation(
      student.id,
      parseInt(aokId),
      user.token,
    );
    if (!result.success) {
      enqueueSnackbar(result.msg, { variant: 'error' });
      return false;
    }
    setBlockPresentation(result.data);
    setPointUnit(10);
    loadingContext.done()
    return true;
  }

  const setQuestionBySpecificBlockPresentation = async () => {
    const result: any = await getBlockPresentationById(
      parseInt(aokId),
      user.token,
    );
    if (!result.success) {
      enqueueSnackbar(result.msg, { variant: 'error' });
      return false;
    }
    setBlockPresentation(result.data);
    setPointUnit(10);
    loadingContext.done()
    return true;
  }

  const onNextLesson = () => {
    setQuestionCounter(0);
    setIsLessonFinished(false)
    setAnswerResult([]);
    setPoints(0)
    setBonusCoins(0)
  }

  const arrObjToString = (arrObj: any) => {
    let str = '[';
    for (const obj of arrObj) {
      str += '{'
      for (const key in obj) {
        if (key === 'isCorrect') continue;
        str += key
        str += ': '
        if (typeof (obj[key]) === 'string') str += '"' + obj[key] + '"'
        else str += obj[key]
        str += ','
      }
      str += '},'
    }
    str += ']'
    return str;
  }
  // useEffect(() => {

  //   setQuestionsInAI();
  //   // get(
  //   //   `blockPresentationById(id:${presentationId})`,
  //   //   BLOCK_PRESENTATION_QUERY,
  //   //   handleData,
  //   //   handleError
  //   // );
  // }, [presentationId]);

  const handleNextQuestion = async () => {

    if (blockPresentation) {
      if (blockPresentation.block.questions.length < questionCounter + 2) {
        if (mode === 'BlockID') {
          setIsLessonFinished(true);
          return;
        }
        setLoading(true)
        setIsLessonFinished(true);
        setLoading(true);
        let correctCount = 0;
        let wrongCount = 0;
        for (const data of answerResult) {
          if (data.isCorrect) correctCount++;
          else wrongCount++;
        }
        const finishBlockResult = await finishBlock(
          blockPresentation.id,
          earning.energyCharge,
          correctCount,
          wrongCount,
          bonusCoins,
          state.earning,
          arrObjToString(answerResult),
          state.user.token,
          dispatch
        );

        if (mode === 'AI') await setQuestionsInAI();
        if (mode === 'PATH') await setQuestionsInPath();
        if (mode === 'BlockID') await setQuestionBySpecificBlockPresentation();

        setLoading(false);
      }
    }
    const counter = questionCounter + 1;
    setQuestionCounter(counter);
  };


  useEffect(() => {
    setNextMaxExp(student.nextLevel.pointsRequired)
    if (mode === 'AI') setQuestionsInAI()
    if (mode === 'PATH') setQuestionsInPath();
    if (mode === 'BlockID') setQuestionBySpecificBlockPresentation();
  }, [])

  useEffect(() => {
    console.log('Block Presentation Id is : ', blockPresentation?.id)
    console.log('Block Presentation is,', blockPresentation)
  }, [blockPresentation])
  useEffect(() => {
    setQuestion(blockPresentation?.block.questions[questionCounter]);
  }, [blockPresentation, questionCounter]);

  useEffect(() => {
    upgradeEnergy();
  }, [answerResult]);

  return (
    <Wrapper>
      {isLessonFinished ? (
        <StudentMenu>
          <FinishLesson
            loading={loading}
            tokens={points}
            energy={bonusCoins}
            onNextLesson={onNextLesson}
          />
        </StudentMenu>
      ) : blockPresentation && question ? (
        <StudentMenu>
          <ProgressWrapper id='lesson-progress'>
            <LessonProgress
              currentQuestion={questionCounter + 1}
              topic={blockPresentation?.block?.topicGrade?.topic?.name}
              totalQuestions={blockPresentation.block.questions.length}
              questions={blockPresentation?.block?.questions}
              // answerResult={answerResult}
              combocount={state.earning.energyCharge}
            />
          </ProgressWrapper>
          <CardDialog
            isOpen={openDg}
            open={congratulations}
            dialogContent={<LevelUpDgContent close={congratulations} />}
            fullWidth="true"
          />
        </StudentMenu>
      ) : null}
    </Wrapper>
  );
};
