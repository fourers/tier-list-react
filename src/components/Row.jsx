import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import data from "../default_data.json";
import Droppable from "./Droppable";
import Image from "./Image";
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
        borderWidth: "1px",
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

const getPanelStyle = (isBottom) => {
    const defaultStyle = {
        height: "100%",
        padding: ROW_PADDING,
        userSelect: "none",
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
            <Droppable
                id={rowId}
                key={rowId}
                style={{ display: "flex", width: "100%" }}
            >
                {!isBottom && (
                    <Grid
                        sx={{
                            backgroundColor: data.rows[rowId].colour,
                            color: "black",
                            textAlign: "center",
                            width: "115px",
                        }}
                        xs="auto"
                    >
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
                    </Grid>
                )}
                <Grid sx={getPanelStyle(isBottom)} xs>
                    <div
                        style={{
                            alignContent: "flex-start",
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        {items.map((itemId) => (
                            <Item
                                activeId={activeId}
                                id={itemId}
                                key={itemId}
                                overId={overId}
                            />
                        ))}
                        {isOver ? <Image id={activeId} opaque /> : null}
                    </div>
                </Grid>
            </Droppable>
        </Grid>
    );
}
