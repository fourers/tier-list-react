import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { useDispatch } from "react-redux";
import data from "../default_data.json";
import { reset } from "../store/tiersSlice";
import Droppable from "./Droppable";
import GhostItem from "./GhostItem";
import Item from "./Item";
import {
    ROW_BACKGROUND_COLOUR,
    ROW_MIN_HEIGHT,
    ROW_PADDING,
} from "./constants";

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

export default function Row({ rowId, items, isBottom, activeId, overId }) {
    const dispatch = useDispatch();
    const resetState = () => dispatch(reset());

    const handleContextMenu = (event) => {
        event.preventDefault();
        resetState();
    };

    const suppressContextMenu = (event) => {
        event.preventDefault();
    };

    const isOver = overId === rowId;
    return (
        <Grid container sx={getRowStyle(isBottom)} xs={isBottom ? true : false}>
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
                    <Stack
                        alignItems="center"
                        direction="column"
                        justifyContent="center"
                        style={{ height: "100%" }}
                    >
                        <Typography variant="h6">
                            {data.rows[rowId].name}
                        </Typography>
                    </Stack>
                </Grid>
            )}
            <Grid
                xs
                sx={getDraggablePanelStyle(isBottom)}
                onContextMenu={
                    isBottom ? handleContextMenu : suppressContextMenu
                }
            >
                <Droppable key={rowId} id={rowId}>
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
