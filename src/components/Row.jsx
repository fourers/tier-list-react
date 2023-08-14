import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";
import {
    IMG_BLOCK_WITH_MARGIN_HEIGHT,
    ROW_BACKGROUND_COLOUR,
    ROW_MIN_HEIGHT,
    ROW_PADDING,
} from "./constants";
import data from "./default_data.json";

const getRowStyle = (isBottom) => {
    const defaultStyle = {
        borderColor: "black",
        borderStyle: "solid",
        minHeight: ROW_MIN_HEIGHT
    };
    if (isBottom) {
        return {
            ...defaultStyle,
            borderBottom: 0,
            borderLeft: 0,
            borderRight: 0,
            paddingTop: "5px",
        };
    }
    return {
        ...defaultStyle,
        borderBottom: 0,
    };
};

const getBackgroundStyle = (isBottom) => {
    if (isBottom) {
        return {};
    }
    return { backgroundColor: ROW_BACKGROUND_COLOUR }
}

export default function Row({ rowId, items, isBottom }) {
    return (
        <Grid
            container
            sx={{
                ...getRowStyle(isBottom),
            }}
        >
            {!isBottom && (
                <Grid
                    xs="auto"
                    sx={{
                        backgroundColor: data.rows[rowId].colour,
                        color: "black",
                        maxWidth: "120px",
                        minWidth: "90px",
                        textAlign: "center",
                    }}
                >
                    <Stack
                        alignItems="center"
                        direction="column"
                        justifyContent="center"
                        style={{ height: "100%" }}
                    >
                        <Typography variant="h5">
                            {data.rows[rowId].name}
                        </Typography>
                    </Stack>
                </Grid>
            )}
            <Grid
                xs
                sx={{
                    ...getBackgroundStyle(isBottom),
                    padding: ROW_PADDING,
                }}
            >
                <Droppable droppableId={rowId} direction="horizontal">
                    {(provided, _snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{
                                display: "flex",
                                minHeight: IMG_BLOCK_WITH_MARGIN_HEIGHT,
                                overflow: "auto",
                            }}
                            {...provided.droppableProps}
                        >
                            {items.map((item, index) => (
                                <DraggableItem
                                    key={item}
                                    itemId={item}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Grid>
        </Grid>
    );
}
