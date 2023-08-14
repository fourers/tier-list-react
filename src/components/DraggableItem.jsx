import React from "react";
import { Draggable } from "react-beautiful-dnd";
import data from "./default_data.json";

export default function DraggableItem({ itemId, index }) {
    const itemSrc = data.items[itemId].src;
    const tooltip = data.items[itemId].name;
    return (
        <Draggable draggableId={itemId} key={index} index={index}>
            {(provided, _snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={{ userSelect: "none" }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <img src={itemSrc} style={{ height: "90px" }} title={tooltip} />
                </div>
            )}
        </Draggable>
    );
}
