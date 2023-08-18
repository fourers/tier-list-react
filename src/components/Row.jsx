import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import data from "../default_data.json";
import Droppable from "./Droppable";
import GhostItem from "./GhostItem";
import Item from "./Item";
import {
    ROW_BACKGROUND_COLOUR,
    ROW_MIN_HEIGHT,
    ROW_PADDING,
} from "./constants";

const getRowStyle = (isBottom, isLast) => {
    const defaultStyle = {
        borderColor: "black",
        borderStyle: "solid",
        minHeight: ROW_MIN_HEIGHT,
        width: "100%",
    };
    if (isBottom) {
        return {
            ...defaultStyle,
            borderStyle: "none",
            paddingTop: "5px",
        };
    }
    if (isLast) {
        return defaultStyle;
    }
    return {
        ...defaultStyle,
        borderBottom: 0,
    };
};

const getDraggablePanelStyle = (isBottom) => {
    const defaultStyle = {
        padding: ROW_PADDING,
    };
    if (isBottom) {
        return {
            ...defaultStyle,
            backgroundColor: "inherit",
        };
    }
    return {
        ...defaultStyle,
        backgroundColor: ROW_BACKGROUND_COLOUR,
    };
};

export default function Row({
    rowId,
    items,
    isBottom,
    isLast,
    activeId,
    overId,
}) {
    const isOver = overId === rowId;
    return (
        <Grid
            container
            sx={getRowStyle(isBottom, isLast)}
            xs={isBottom ? true : false}
        >
            {!isBottom && (
                <Grid
                    xs="auto"
                    sx={{
                        backgroundColor: data.rows[rowId].colour,
                        color: "black",
                        textAlign: "center",
                        width: "115px",
                    }}
                >
                    <Droppable key={`side-${rowId}`} id={rowId}>
                        <Stack
                            alignItems="center"
                            direction="column"
                            justifyContent="center"
                            style={{ height: "100%", width: "100%" }}
                        >
                            <Typography variant="h6">
                                {data.rows[rowId].name}
                            </Typography>
                        </Stack>
                    </Droppable>
                </Grid>
            )}
            <Grid xs sx={getDraggablePanelStyle(isBottom)}>
                <Droppable
                    key={rowId}
                    id={rowId}
                    style={{ alignContent: "flex-start", flexWrap: "wrap" }}
                >
                    {items.map((itemId) => (
                        <Item
                            key={itemId}
                            id={itemId}
                            activeId={activeId}
                            overId={overId}
                        />
                    ))}
                    {isOver ? <GhostItem id={activeId} /> : null}
                </Droppable>
            </Grid>
        </Grid>
    );
}
