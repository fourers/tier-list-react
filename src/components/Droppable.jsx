import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function Droppable(props) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });

    return (
        <div ref={setNodeRef} style={{ display: "flex", height: "100%" }}>
            {props.children}
        </div>
    );
}
