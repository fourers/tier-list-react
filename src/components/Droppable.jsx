import { useDroppable } from "@dnd-kit/core";
import React from "react";

export default function Droppable(props) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = props.style ? props.style : {};

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                display: "flex",
                height: "100%",
                width: "100%",
            }}
        >
            {props.children}
        </div>
    );
}
