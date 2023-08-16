import { BOTTOM_ROW_ID } from "../components/constants";
import data from "../default_data.json";

const initialiseData = () => {
    const tierData = { [BOTTOM_ROW_ID]: data.itemOrder };
    data.rowOrder.forEach((row) => {
        tierData[row] = [];
    });
    return tierData;
};

export const initialState = initialiseData();
