import styled from "styled-components";
import { BasicColor } from "views/Color";

export const DndDragItem = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  padding: 8px;
  margin: 8px;
  border-radius: 5px;
  transition: background 0.1s;
  min-width: 150px;
  background-color: ${props => (props.isDragging ? BasicColor.greenSoft : "white")};
`;
