import Box from "@mui/material/Box";
import React, { useState } from "react";
import Row from "./Row";
import { BOTTOM_ROW_ID } from "./constants";
import data from "./default_data.json";
import Grid from "@mui/material/Unstable_Grid2";
import { DndContext } from '@dnd-kit/core';

const initialiseData = () => {
    const tierData = { [BOTTOM_ROW_ID]: data.itemOrder };
    data.rowOrder.forEach((row) => {
        tierData[row] = [];
    });
    return tierData;
};

export default function TierList() {
    const [tierState, setTierState] = useState(initialiseData());

    const onDragEnd = (event) => {
        console.log(event);
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
