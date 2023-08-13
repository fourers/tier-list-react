import React, { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import rows from './rows.json';
import Row from './Row';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function TierList() {
    const [rowData, setRowData] = useState(rows);

    const onDragEnd = (result) => {
        console.log(result);
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Box sx={{width: '100%'}}>

                {
                    rowData.rowOrder.map((rowId) => {
                        const rowName = rowData[rowId].name;
                        const rowItems = rowData[rowId].items;
                        return <Row key={rowId} rowIndex={rowId} name={rowName} items={rowItems} />
                    })
                }
                {/* <Row
                    key={`row`}
                    rowIndex={`row-index`}
                    name={rowData[0]["name"]}
                    items={rowData[0]["items"]}
                /> */}
            </Box>
        </DragDropContext>
    );
}
