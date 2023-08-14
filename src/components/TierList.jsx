import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Row from "./Row";
import Box from "@mui/material/Box";
import { BOTTOM_ROW_ID } from "./constants";
import data from "./default_data.json"


const initialiseData = () => {
    const tierData = {[BOTTOM_ROW_ID]: data.itemOrder};
    data.rowOrder.forEach((row) => {
        tierData[row] = [];
    })
    return tierData;
}


export default function TierList() {
    const [tierState, setTierState] = useState(initialiseData());

    const onDragEnd = (result) => {
        console.log(result);
        if (!result.destination) {
            return;
        }
        const sourceRow = result.source.droppableId;
        const sourceIndex = result.source.index;
        const destinationRow = result.destination.droppableId;
        const destinationIndex = result.destination.index;
        if (sourceRow === destinationRow && sourceIndex == destinationIndex) {
            return;
        }
        const sourceClone = Array.from(tierState[sourceRow]);
        const [removedItem] = sourceClone.splice(sourceIndex, 1);
        if (sourceRow === destinationRow) {
            sourceClone.splice(destinationIndex, 0, removedItem);
            setTierState((old) => {
                return {...old, [sourceRow]: sourceClone};
            });
        }
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
                {data.rowOrder.map((rowId) => {
                    return (
                        <Row
                            key={rowId}
                            rowId={rowId}
                            items={tierState[rowId]}
                        />
                    );
                })}
                <Row
                    key={BOTTOM_ROW_ID}
                    rowId={BOTTOM_ROW_ID}
                    items={tierState[BOTTOM_ROW_ID]}
                    isBottom
                />
            </Box>
        </DragDropContext>
    );
}
