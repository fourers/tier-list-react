import { DndContext } from "@dnd-kit/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
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

    const getRowById = (itemId) => {
        const matchingRows = data.rowOrder.filter((row) =>
            tierState[row].includes(itemId),
        );
        if (matchingRows.length > 0) {
            return matchingRows[0];
        }
        return BOTTOM_ROW_ID;
    };

    const onDragEnd = (event) => {
        console.log(event);
        if (!event.over) {
            return;
        }
        const sourceId = event.active.id;
        const sourceRow = getRowById(sourceId);
        const destinationRow = event.over.id;
        if (sourceRow != destinationRow) {
            const sourceClone = Array.from(tierState[sourceRow]);
            const sourceIndex = sourceClone.indexOf(sourceId);
            const [removedItem] = sourceClone.splice(sourceIndex, 1);
            const destinationClone = Array.from(tierState[destinationRow]);
            destinationClone.push(removedItem);
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
        <DndContext onDragEnd={onDragEnd}>
            <Box
                className="main"
                sx={{
                    height: "calc(100vh - 40px)",
                    padding: "20px",
                    width: "100%",
                }}
            >
                <Grid container direction="column" style={{ height: "100%" }}>
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
                </Grid>
            </Box>
        </DndContext>
    );
}
