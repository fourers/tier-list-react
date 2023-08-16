import { useDroppable } from "@dnd-kit/core";
import React from "react";

export default function Droppable(props) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                alignContent: "flex-start",
                display: "flex",
                flexWrap: "wrap",
                height: "100%",
            }}
        >
            {props.children}
        </div>
    );
}
