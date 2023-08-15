import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import Item from "./Item";
import Droppable from "./Droppable";
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
        minHeight: ROW_MIN_HEIGHT,
        width: "100%",
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
    return { backgroundColor: ROW_BACKGROUND_COLOUR };
};

const getDroppableStyle = (droppableProps) => {
    const defaultStyle = {
        display: "flex",
        minHeight: IMG_BLOCK_WITH_MARGIN_HEIGHT,
        overflow: "auto",
        flexWrap: "wrap",
    };
    const styleCopy = Object.assign({}, droppableProps.style)
    return {
        ...droppableProps,
        style: {
            ...styleCopy,
            ...defaultStyle,
        }
    };
}

export default function Row({ rowId, items, isBottom }) {
    return (
        <Grid
            container
            sx={{
                ...getRowStyle(isBottom),
            }}
            xs={isBottom ? true : false}
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
                <Droppable key={rowId} id={rowId}>
                    {
                        items.map((itemId) => (
                            <Item key={itemId} id={itemId} />
                        ))
                    }
                </Droppable>
            </Grid>
        </Grid>
    );
}
