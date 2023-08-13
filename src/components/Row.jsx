import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Row({ rowIndex, name, items }) {
  return (
    <Grid container sx={{ borderColor: "black", borderStyle: "solid" }}>
      <Grid
        xs="auto"
        sx={{
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "primary.main",
        }}
      >
        <Typography variant="h5">{name}</Typography>
      </Grid>
      <Grid xs sx={{ padding: "1rem", backgroundColor: "grey.500" }}>
        <Droppable droppableId={rowIndex} direction="horizontal">
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
                    key={index}
                    id={`item-${item}`}
                    itemIndex={index}
                    tooltip={item}
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
