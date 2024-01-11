import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Grid, Typography } from '@mui/material';
import { DraggableOption } from './DraggableOption';
import { AnswersList, QuestionsList } from './Styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import { ScreenSize } from 'constants/screenSize';

interface RelateQuestionDndProps {
  options: Array<any>
}
export const RelateQuestionDnd = forwardRef<any, RelateQuestionDndProps>(({ options }, ref) => {
  const isTablet = useMediaQuery(`(max-width: ${ScreenSize.tablet})`)
  const [state, setState] = useState<any>(null);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      return;
    }
    const sourceList: any = state[source.droppableId as keyof Object]
    const destinationList: any = state[destination.droppableId as keyof Object]
    const temp = { ...state }
    destinationList.splice(destination.index, 0, sourceList[source.index])
    sourceList.splice(source.index, 1)
    temp[source.droppableId as keyof Object] = sourceList
    temp[destination.droppableId as keyof Object] = destinationList
    setState(temp)
    return
  }

  useImperativeHandle(
    ref,
    () => ({
      checkAnswer,
      getCurrentAnswer
    })
  )

  const getCurrentAnswer = () => {
    const res = []
    const length = options.length
    for (let i = 0; i < length; i++) {
      res.push({
        key: options[i]?.key,
        value: state[('answers' + i) as keyof Object].value
      })
    }
    return res
  }
  const checkAnswer = () => {
    console.log({ state, options })
    return !options.some((option, index) => option.key !== state[('answers' + index) as keyof Object][0]?.key
    )
  }

  useEffect(() => {
    const answers: any = {}
    const length = options.length
    for (let i = 0; i < length; i++) {
      answers[('answers' + i) as keyof Object] = new Array(0)
    }
    console.log({ answers })
    setState({ questions: [...options], ...answers })
  }, [options])
  return (
    state &&
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId='questions' direction={isTablet ? 'vertical' : 'horizontal'}>
        {(provided, snapshot) => (
          <QuestionsList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isTablet={isTablet}
          >
            {state.questions.map((q: any, i: number) => (
              <DraggableOption key={q.id} option={q} index={i} />
            ))}
            {provided.placeholder}
          </QuestionsList>
        )}
      </Droppable>
      <Grid container justifyContent='center' alignItems='center' spacing={2}>
        {
          options.map((option, index) => {
            const droppableId = 'answers' + index
            const words: any = state[droppableId as keyof Object]
            return (
              <Grid item key={option.id}>
                <Typography color='white' variant='h5'>{option.key}</Typography>
                <Droppable droppableId={droppableId} direction='horizontal'>
                  {(provided, snapshot) => (
                    <AnswersList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {
                        words && words.map((q: any, i: any) => (<DraggableOption key={q.id} option={q} index={i} />))
                      }
                      {provided.placeholder}
                    </AnswersList>
                  )}
                </Droppable>
              </Grid>
            )
          }
          )
        }
      </Grid>
    </DragDropContext >
  );
})


