import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const rows = [
    {
        colour: "#FF7F7F",
        name: "S",
    },
    {
        colour: "#FFBF7F",
        name: "A",
    },
    {
        colour: "#FFDF7F",
        name: "B",
    },
    {
        colour: "#FFFF7F",
        name: "C",
    },
    {
        colour: "#BFFF7F",
        name: "D",
    },
    // {
    //     colour: "#7FFF7F",
    //     name: "E",
    // },
    // {
    //     colour: "#7FFFFF",
    //     name: "F",
    // },
];

const rowsDict = {};
const rowOrder = [];

rows.forEach((row, index) => {
    const rowId = `row-${index}`;
    rowsDict[rowId] = row;
    rowOrder.push(rowId);
});

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const itemDirectory = `${currentDirectory}/../public/items`;
const itemFiles = fs.readdirSync(itemDirectory);

const items = {};
const itemOrder = [];

itemFiles.forEach((filePath) => {
    const pathObject = path.parse(filePath);
    const pathName = pathObject.name;
    if (pathName.startsWith("row-")) {
        throw new Error(`File name "${filePath}" cannot start with "row-"`);
    }
    items[pathName] = {
        name: pathName,
        src: `items/${filePath}`,
    };
    itemOrder.push(pathName);
});

const dataOutput = {
    itemOrder: itemOrder,
    items: items,
    rowOrder: rowOrder,
    rows: rowsDict,
};

const outputPath = `${currentDirectory}/../src/default_data.json`;
fs.writeFileSync(outputPath, JSON.stringify(dataOutput, null, 2));

console.log(`Updated: ${outputPath}`);
