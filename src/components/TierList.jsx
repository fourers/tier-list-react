import { DndContext, DragOverlay } from "@dnd-kit/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import Item from "./Item";
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
    const [activeId, setActiveId] = useState(null);

    const getRowById = (itemId) => {
        const matchingRows = data.rowOrder.filter((row) =>
            tierState[row].includes(itemId),
        );
        if (matchingRows.length > 0) {
            return matchingRows[0];
        }
        return BOTTOM_ROW_ID;
    };

    const onDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const onDragEnd = (event) => {
        const sourceId = event.active.id;
        setActiveId(sourceId);
        if (!event.over) {
            return;
        }
        const sourceRow = getRowById(sourceId);
        const destinationRow = event.over.id;
        if (
            !destinationRow.startsWith("row-") ||
            sourceRow === destinationRow
        ) {
            return;
        }
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
    };

    return (
        <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Box
                className="main"
                sx={{
                    minHeight: "calc(100vh - 40px)",
                    minWidth: "300px",
                    padding: "20px",
                    width: "calc(100% - 40px)",
                }}
            >
                <Grid
                    container
                    direction="column"
                    style={{ minHeight: "calc(100vh - 40px)" }}
                >
                    {data.rowOrder.map((rowId) => (
                        <Row
                            key={rowId}
                            rowId={rowId}
                            items={tierState[rowId]}
                        />
                    ))}
                    <Row
                        key={BOTTOM_ROW_ID}
                        rowId={BOTTOM_ROW_ID}
                        items={tierState[BOTTOM_ROW_ID]}
                        isBottom
                    />
                </Grid>
            </Box>
            <DragOverlay>
                {activeId ? <Item key={activeId} id={activeId} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
