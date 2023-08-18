import { useDroppable } from "@dnd-kit/core";
import React from "react";

export default function Droppable(props) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });

    return (
        <div ref={setNodeRef} style={props.style}>
            {props.children}
        </div>
    );
}
