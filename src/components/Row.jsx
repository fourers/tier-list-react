import React, { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableItem from './DraggableItem';

export default function Row({ rowIndex, name, items }) {
    return (
        <Droppable droppableId={rowIndex}>
            {
                (provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {items.map((item, index) => (
                                <DraggableItem
                                    key={index}
                                    id={`item-${item}`}
                                    itemIndex={index}
                                    tooltip={item}
                                />
                        ))}
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    )
}