import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { IMG_BLOCK_WITH_MARGIN_HEIGHT } from "./constants";

export function Draggable(props) {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: props.id,
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                display: "flex",
                height: IMG_BLOCK_WITH_MARGIN_HEIGHT,
            }}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </div>
    );
}
