import React, { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import rows from './rows.json';
import Row from './Row';

export default function TierList() {
    const [rowData, setRowData] = useState(rows);

    const onDragEnd = (result) => {
        console.log(result);
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Row
                key={`row`}
                rowIndex={`row-index`}
                name={rowData[0]["name"]}
                items={rowData[0]["items"]}
            />
        </DragDropContext>
    );
}
