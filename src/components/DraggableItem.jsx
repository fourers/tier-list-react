import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { IMG_BLOCK_HEIGHT, IMG_BLOCK_MARGIN, IMG_BLOCK_WITH_MARGIN_HEIGHT } from "./constants";
import data from "./default_data.json";


const getDraggableProps = (draggableProps, dragHandleProps) => {
    const props = {
        ...draggableProps,
        ...dragHandleProps,
    };
    const styleCopy = Object.assign({}, props.style)
    styleCopy.height = IMG_BLOCK_HEIGHT
    props.style = styleCopy;
    return props;
}


export default function DraggableItem({ itemId, index }) {
    const itemSrc = data.items[itemId].src;
    const tooltip = data.items[itemId].name;
    return (
        <Draggable draggableId={itemId} key={index} index={index}>
            {(provided, _snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...getDraggableProps(provided.draggableProps, provided.dragHandleProps)}
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
