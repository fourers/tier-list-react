import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import data from "./default_data.json";

export default function Row({ rowId, items, isBottom }) {
    return (
        <Grid
            container
            sx={{ borderColor: "black", borderStyle: "solid", borderTop: 0, minHeight: "114px" }}
        >
            {!isBottom && (
                <Grid
                    xs="auto"
                    sx={{
                        backgroundColor: data.rows[rowId].colour,
                        color: "black",
                        maxWidth: "120px",
                        minWidth: "90px",
                        padding: "10px",
                        textAlign: "center",
                    }}
                >
                    <Stack alignItems="center" direction="column" justifyContent="center" style={{ height: "100%" }}>
                        <Typography variant="h5">{data.rows[rowId].name}</Typography>
                    </Stack>
                </Grid>
            )}
            <Grid xs sx={{ backgroundColor: "#333", padding: "10px" }}>
                <Droppable droppableId={rowId} direction="horizontal">
                    {(provided, _snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{ display: "flex", overflow: "auto" }}
                            {...provided.droppableProps}
                        >
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                {items.map((item, index) => (
                                    <DraggableItem
                                        key={item}
                                        itemId={item}
                                        index={index}
                                    />
                                ))}
                            </Stack>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Grid>
        </Grid>
    );
}
