import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import rows from "./rows.json";
import Row from "./Row";
import Box from "@mui/material/Box";

export default function TierList() {
    const [rowData, _setRowData] = useState(rows);

    const onDragEnd = (result) => {
        console.log(result);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box
                sx={{
                    borderBottom: 0,
                    borderColor: "black",
                    borderLeft: 0,
                    borderRight: 0,
                    borderStyle: "solid",
                    width: "100%",
                }}
            >
                {rowData.rowOrder.map((rowId) => {
                    const rowName = rowData[rowId].name;
                    const rowItems = rowData[rowId].items;
                    return (
                        <Row
                            key={rowId}
                            rowIndex={rowId}
                            name={rowName}
                            items={rowItems}
                        />
                    );
                })}
            </Box>
        </DragDropContext>
    );
}
