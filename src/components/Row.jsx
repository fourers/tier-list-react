import React, { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableItem from './DraggableItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

export default function Row({ rowIndex, name, items }) {
    return (<Grid container sx={{ borderColor: 'black', borderStyle: 'solid'}}>
        <Grid xs="auto" sx={{ padding: "1rem", textAlign: "center", backgroundColor: 'primary.main'}}>
                <Typography variant="h3">{name}</Typography>
        </Grid>
        <Grid xs sx={{padding: "1rem", backgroundColor: 'grey.500'}}>
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
        </Grid></Grid>
    )
}