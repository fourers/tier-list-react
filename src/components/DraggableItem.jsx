import React, { Component, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import reactLogo from '../assets/react.svg';

export default function DraggableItem({ id, itemIndex, tooltip }) {
    return (
        <Draggable draggableId={id} index={itemIndex} key={id}>
            {
                (provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <img src={reactLogo} title={tooltip}/>
                    </div>
                )
            }
        </Draggable>
    )
}