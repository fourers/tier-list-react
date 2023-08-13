import React from "react";
import { Draggable } from "react-beautiful-dnd";
import reactLogo from "../assets/react.svg";

export default function DraggableItem({ id, itemIndex, tooltip }) {
  return (
    <Draggable draggableId={id} index={itemIndex} key={id}>
      {(provided, _snapshot) => (
        <div
          ref={provided.innerRef}
          style={{ userSelect: "none" }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img src={reactLogo} title={tooltip} />
        </div>
      )}
    </Draggable>
  );
}
