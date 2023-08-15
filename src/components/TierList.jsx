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
    const [overId, setOverId] = useState(null);

    const getRowById = (itemId) => {
        const matchingRows = data.rowOrder.filter((row) =>
            tierState[row].includes(itemId),
        );
        if (matchingRows.length > 0) {
            return matchingRows[0];
        }
        return BOTTOM_ROW_ID;
    };

    const getNextId = (itemId) => {
        const row = getRowById(itemId);
        const currentIndex = tierState[row].indexOf(itemId);
        return tierState[row][currentIndex + 1];
    };

    const onDragStart = (event) => {
        const activeId = event.active.id;
        setActiveId(activeId);
        const nextId = getNextId(activeId);
        setOverId(nextId);
    };

    const onDragOver = (event) => {
        setOverId(event.over ? event.over.id : null);
    };

    const onDragEnd = (event) => {
        setActiveId(null);
        setOverId(null);
        if (!event.over) {
            return;
        }
        const sourceId = event.active.id;
        const sourceRow = getRowById(sourceId);
        const sourceClone = Array.from(tierState[sourceRow]);
        const sourceIndex = sourceClone.indexOf(sourceId);
        const [removedItem] = sourceClone.splice(sourceIndex, 1);
        const destinationId = event.over.id;
        console.log(sourceId, destinationId);
        if (destinationId.startsWith("row-")) {
            if (sourceRow === destinationId) {
                sourceClone.push(removedItem);
                setTierState((old) => {
                    return {
                        ...old,
                        [sourceRow]: sourceClone,
                    };
                });
            } else {
                const destinationClone = Array.from(tierState[destinationId]);
                destinationClone.push(removedItem);
                setTierState((old) => {
                    return {
                        ...old,
                        [destinationId]: destinationClone,
                        [sourceRow]: sourceClone,
                    };
                });
            }
        } else {
            const destinationRow = getRowById(destinationId);
            if (sourceRow === destinationRow) {
                const destinationIndex = sourceClone.indexOf(destinationId);
                sourceClone.splice(destinationIndex, 0, removedItem);
                setTierState((old) => {
                    return {
                        ...old,
                        [sourceRow]: sourceClone,
                    };
                });
            } else {
                const destinationClone = Array.from(tierState[destinationRow]);
                const destinationIndex =
                    destinationClone.indexOf(destinationId);
                destinationClone.splice(destinationIndex, 0, removedItem);
                setTierState((old) => {
                    return {
                        ...old,
                        [destinationRow]: destinationClone,
                        [sourceRow]: sourceClone,
                    };
                });
            }
        }
    };

    return (
        <DndContext
            // collisionDetection={closestCorners}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
        >
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
                            activeId={activeId}
                            overId={overId}
                        />
                    ))}
                    <Row
                        key={BOTTOM_ROW_ID}
                        rowId={BOTTOM_ROW_ID}
                        items={tierState[BOTTOM_ROW_ID]}
                        isBottom
                        activeId={activeId}
                        overId={overId}
                    />
                </Grid>
            </Box>
            <DragOverlay>
                {activeId ? <Item key={activeId} id={activeId} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
