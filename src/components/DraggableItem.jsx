import React from "react";
import { Draggable } from "react-beautiful-dnd";
import data from "./default_data.json";
import { IMG_BLOCK_HEIGHT, IMG_BLOCK_MARGIN } from "./constants";

export default function DraggableItem({ itemId, index }) {
    const itemSrc = data.items[itemId].src;
    const tooltip = data.items[itemId].name;
    return (
        <Draggable draggableId={itemId} key={index} index={index}>
            {(provided, _snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <img
                        src={itemSrc}
                        style={{
                            display: "block",
                            height: IMG_BLOCK_HEIGHT,
                            margin: IMG_BLOCK_MARGIN,
                            userSelect: "none",
                        }}
                        title={tooltip}
                    />
                </div>
            )}
        </Draggable>
    );
}
