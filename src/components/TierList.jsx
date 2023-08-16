import { DndContext, DragOverlay } from "@dnd-kit/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "../default_data.json";
import { update } from "../store/tiersSlice";
import Item from "./Item";
import Row from "./Row";
import { BOTTOM_ROW_ID } from "./constants";

export default function TierList() {
    const tierState = useSelector((state) => state.tiers.value);
    const dispatch = useDispatch();
    const updateTierState = (newValue) => dispatch(update(newValue));

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

    const onDragStart = (event) => {
        const activeId = event.active.id;
        setActiveId(activeId);
        setOverId(null);
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
        if (destinationId.startsWith("row-")) {
            if (sourceRow === destinationId) {
                sourceClone.push(removedItem);
                updateTierState({ [sourceRow]: sourceClone });
            } else {
                const destinationClone = Array.from(tierState[destinationId]);
                destinationClone.push(removedItem);
                updateTierState({
                    [destinationId]: destinationClone,
                    [sourceRow]: sourceClone,
                });
            }
        } else {
            const destinationRow = getRowById(destinationId);
            if (sourceRow === destinationRow) {
                if (sourceId === destinationId) {
                    return;
                }
                const destinationIndex = sourceClone.indexOf(destinationId);
                sourceClone.splice(destinationIndex, 0, removedItem);
                updateTierState({ [sourceRow]: sourceClone });
            } else {
                const destinationClone = Array.from(tierState[destinationRow]);
                const destinationIndex =
                    destinationClone.indexOf(destinationId);
                destinationClone.splice(destinationIndex, 0, removedItem);
                updateTierState({
                    [destinationRow]: destinationClone,
                    [sourceRow]: sourceClone,
                });
            }
        }
    };

    return (
        <DndContext
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
