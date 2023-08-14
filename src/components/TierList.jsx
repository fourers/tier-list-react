import Box from "@mui/material/Box";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Row from "./Row";
import { BOTTOM_ROW_ID } from "./constants";
import data from "./default_data.json";

const initialiseData = () => {
    const tierData = { [BOTTOM_ROW_ID]: data.itemOrder };
    data.rowOrder.forEach((row) => {
        tierData[row] = [];
    });
    return tierData;
};

export default function TierList() {
    const [tierState, setTierState] = useState(initialiseData());

    const onDragEnd = (result) => {
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
                return { ...old, [sourceRow]: sourceClone };
            });
        } else {
            const destinationClone = Array.from(tierState[destinationRow]);
            destinationClone.splice(destinationIndex, 0, removedItem);
            setTierState((old) => {
                return {
                    ...old,
                    [destinationRow]: destinationClone,
                    [sourceRow]: sourceClone,
                };
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box
                className="main"
                sx={{
                    height: "calc(100vh - 40px)",
                    padding: "20px",
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
