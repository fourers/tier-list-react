import { DndContext, DragOverlay } from "@dnd-kit/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React, { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useScreenshot } from "use-react-screenshot";
import data from "../default_data.json";
import { update } from "../store/tiersSlice";
import Footer from "./Footer";
import Image from "./Image";
import Row from "./Row";
import { BIN_ROW_ID, BOTTOM_ROW_ID } from "./constants";

export default function TierList() {
    const tierState = useSelector((state) => state.tiers.value);
    const dispatch = useDispatch();
    const setTierState = (newValue) => dispatch(update(newValue));

    const [activeId, setActiveId] = useState(null);
    const [overId, setOverId] = useState(null);

    const ref = createRef(null);
    const [image, takeScreenshot] = useScreenshot();

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
        const destinationRow = destinationId.startsWith("row-")
            ? destinationId
            : getRowById(destinationId);
        if (sourceRow === destinationRow) {
            if (destinationId === sourceId) {
                return;
            } else if (destinationId === destinationRow) {
                sourceClone.push(removedItem);
            } else {
                const destinationIndex = sourceClone.indexOf(destinationId);
                sourceClone.splice(destinationIndex, 0, removedItem);
            }
            setTierState((prevState) => ({
                ...prevState,
                [sourceRow]: sourceClone,
            }));
        } else if (destinationRow !== BIN_ROW_ID) {
            const destinationClone = Array.from(tierState[destinationRow]);
            if (destinationId === destinationRow) {
                destinationClone.push(removedItem);
            } else if (destinationRow !== BIN_ROW_ID) {
                const destinationIndex =
                    destinationClone.indexOf(destinationId);
                destinationClone.splice(destinationIndex, 0, removedItem);
            }
            setTierState((prevState) => ({
                ...prevState,
                [destinationRow]: destinationClone,
                [sourceRow]: sourceClone,
            }));
        } else {
            setTierState((prevState) => ({
                ...prevState,
                [sourceRow]: sourceClone,
            }));
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
                    width: "100%",
                }}
            >
                <Grid
                    container
                    direction="column"
                    style={{ minHeight: "calc(100vh - 40px)" }}
                >
                    <div ref={ref}>
                        {data.rowOrder.map((rowId, index) => (
                            <Row
                                activeId={activeId}
                                isLast={index === data.rowOrder.length - 1}
                                items={tierState[rowId]}
                                key={rowId}
                                overId={overId}
                                rowId={rowId}
                            />
                        ))}
                    </div>
                    <Row
                        activeId={activeId}
                        isBottom
                        items={tierState[BOTTOM_ROW_ID]}
                        key={BOTTOM_ROW_ID}
                        overId={overId}
                        rowId={BOTTOM_ROW_ID}
                    />
                </Grid>
                <Footer
                    image={image}
                    overId={overId}
                    takeScreenshot={() => takeScreenshot(ref.current)}
                />
            </Box>
            <DragOverlay>
                {activeId ? (
                    <Image id={activeId} opaque={overId === BIN_ROW_ID} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
