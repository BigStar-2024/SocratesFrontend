import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Typography } from "@mui/material";
import { DndDragItem } from "./DndDragItem";

interface QuestionOptionProps {
  value: string;
  index: number;
}

export const SortDraggibleOption = memo(({ value, index }: QuestionOptionProps) => {
  return (
    <Draggable draggableId={value} index={index}>
      {(provided, snapshot) => (
        <DndDragItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Typography variant='h5'>
            {value}
          </Typography>
        </DndDragItem>
      )}
    </Draggable>
  );
});
