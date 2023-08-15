import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { IMG_BLOCK_WITH_MARGIN_HEIGHT } from './constants';

export function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return (
        <div ref={setNodeRef} style={{...style, display: "flex", height: IMG_BLOCK_WITH_MARGIN_HEIGHT}} {...listeners} {...attributes}>
            {props.children}
        </div>
    );
}
