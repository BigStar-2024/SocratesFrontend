import { useState, memo } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Box } from "@mui/material";

const data = {
  tasks: {
    task1: {
      id: "task1",
      content: "Take out the bins"
    },
    task2: {
      id: "task2",
      content: "Watch TV"
    },
    task3: {
      id: "task3",
      content: "Charge phone"
    },
    task4: {
      id: "task4",
      content: "Cook dinner"
    }
  },
  columns: {
    col1: {
      id: "col1",
      title: "Question Options",
      taskIds: ["task1", "task2", "task3", "task4"]
    },
    col2: {
      id: "col2",
      title: "Answer options",
      taskIds: []
    },
  },
  columnOrder: ["col1", "col2"]
};

const TaskContainer = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "red" : "white")};
  transition: background 0.1s;
`;

interface Task {
  id: string;
  content: string;
}

interface TaskProps {
  task: Task;
  index: number;
}

const Task = memo(({ task, index }: TaskProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </TaskContainer>
      )}
    </Draggable>
  );
});

const List = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background 0.1s;
  background-color: ${props =>
    props.isDraggingOver ? "lightgrey" : "inherit "};
  flex-grow: 1;
`;

interface Column {
  id: string;
  title: string;
}

interface ColumnProps {
  tasks: Task[];
  index: number;
  column: Column;
}

const Column = memo(({ column, tasks, index }: ColumnProps) => (
  <Box sx={{
    border: 'solid 1px red',
    margin: 5,
  }}>

    <Droppable droppableId={column.id} type="task">
      {(provided, snapshot) => (
        <List
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {tasks.map((t, i) => (
            <Task key={t.id} task={t} index={i} />
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  </Box>
));


export const SortOrderBeautifulDnd: React.FC = () => {
  const [state, setState] = useState(data);

  const onDragEnd = ({ destination, source, draggableId, type }: DropResult) => {
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startcol: any = state.columns[source.droppableId as keyof Object];
    const endcol: any = state.columns[destination.droppableId as keyof Object];

    if (startcol === endcol) {
      const tasks = Array.from(startcol.taskIds);
      tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, draggableId);

      const newCol = {
        ...startcol,
        taskIds: tasks
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newCol.id]: newCol
        }
      };

      setState(newState);
      return;
    }
    const startTaskIds = Array.from(startcol.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startcol,
      taskIds: startTaskIds
    };
    const endTaskIds = Array.from(endcol.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...endcol,
      taskIds: endTaskIds
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd
      }
    };
    setState(newState);
  }
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      {state.columnOrder.map((id, i) => {
        const col: any = state.columns[id as keyof Object];
        const tasks = col.taskIds.map((taskid: any) => state.tasks[taskid as keyof Object]);
        return <Column key={id} column={col} tasks={tasks} index={i} />;
      })}
      {
        // <Column column={state.columns.col1} tasks={state.columns.col1.taskIds.map((taskid: any) => state.tasks[taskid as keyof Object])} index={0} />
      }
    </DragDropContext >
  );
}
