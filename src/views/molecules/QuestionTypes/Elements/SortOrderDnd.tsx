import { shuffle } from 'lodash';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { SortDraggibleOption } from './SortDraggableOption';
import { QuestionsList } from './Styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import { ScreenSize } from 'constants/screenSize';

interface SortOrderDndProps {
  options: Array<any>
}
export const SortOrderDnd = forwardRef<any, SortOrderDndProps>(({ options }, ref) => {
  const isTablet = useMediaQuery(`(max-width: ${ScreenSize.tablet})`)
  const [state, setState] = useState<any>(null);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }

    const answers = Array.from(state)
    answers.splice(source.index, 1);
    answers.splice(destination.index, 0, state[source.index]);

    setState(answers)
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
    for (const option of state) {
      res.push(option.answerText)
    }
    return res
  }
  const checkAnswer = () => {
    console.log({ state, options })
    return !state.some((option: any, index: number) => option.order !== index + 1)
  }

  useEffect(() => {
    setState(shuffle(options))
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
            {state.map((q: any, i: number) => (
              <SortDraggibleOption key={q.id} value={q.answerText} index={i} />
            ))}
            {provided.placeholder}
          </QuestionsList>
        )}
      </Droppable>
    </DragDropContext >
  );
})

