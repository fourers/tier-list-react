import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Row from "./Row";
import Box from "@mui/material/Box";
import { BOTTOM_ROW_ID } from "./constants";
import data from "./default_data.json"


const initialiseData = () => {
    const tierData = data.rowOrder.map((v) => {
        return {id: v, items: []};
    });
    tierData.push({id: BOTTOM_ROW_ID, items: data.itemOrder});
    return tierData;
}


export default function TierList() {
    const [tierState, _setTierState] = useState(initialiseData());

    const onDragEnd = (result) => {
        console.log(result);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box
                sx={{
                    borderBottom: 0,
                    borderColor: "black",
                    borderLeft: 0,
                    borderRight: 0,
                    borderStyle: "solid",
                    width: "100%",
                }}
            >
                {tierState.map((rowData) => {
                    return (
                        <Row
                            key={rowData.id}
                            rowId={rowData.id}
                            items={rowData.items}
                            isBottom={rowData.id == BOTTOM_ROW_ID}
                        />
                    );
                })}
            </Box>
        </DragDropContext>
    );
}
