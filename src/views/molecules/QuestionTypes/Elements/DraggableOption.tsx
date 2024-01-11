import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Typography } from "@mui/material";
import { DndDragItem } from "./DndDragItem";

interface QuestionOption {
  id: string;
  key: string;
  value: string;
}

interface QuestionOptionProps {
  option: QuestionOption;
  index: number;
}

export const DraggableOption = memo(({ option, index }: QuestionOptionProps) => {
  return (
    <Draggable draggableId={option.id} index={index}>
      {(provided, snapshot) => (
        <DndDragItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Typography variant='h5'>
            {option.value}
          </Typography>
        </DndDragItem>
      )}
    </Draggable>
  );
});
