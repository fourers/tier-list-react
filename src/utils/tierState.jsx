import { BOTTOM_ROW_ID } from "../components/constants";
import data from "../default_data.json";

export const getRowById = (itemId, tierState) => {
    const matchingRows = data.rowOrder.filter((row) =>
        tierState[row].includes(itemId),
    );
    if (matchingRows.length > 0) {
        return matchingRows[0];
    }
    return BOTTOM_ROW_ID;
};

export const remapId = (unmappedId) =>
    !!unmappedId && unmappedId.startsWith("prev-")
        ? unmappedId.slice("prev-".length)
        : unmappedId;

export const getNextId = (itemId, tierState) => {
    const rowId = getRowById(itemId, tierState);
    const currentRow = tierState[rowId];
    const itemIndex = currentRow.indexOf(itemId);
    const nextIndex = itemIndex + 1;
    return nextIndex >= currentRow.length ? rowId : currentRow[nextIndex];
};
