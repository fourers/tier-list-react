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
const emoteDirectory = `${currentDirectory}/../public/emotes`;
const emotes = fs.readdirSync(emoteDirectory);

const items = {};
const itemOrder = [];

emotes.forEach((emotePath) => {
    const pathObject = path.parse(emotePath);
    items[pathObject.name] = {
        name: pathObject.name,
        src: `emotes/${emotePath}`,
    };
    itemOrder.push(pathObject.name);
});

const dataOutput = {
    itemOrder: itemOrder,
    items: items,
    rowOrder: rowOrder,
    rows: rowsDict,
};

const outputPath = `${currentDirectory}/../src/default_data.json`;
fs.writeFileSync(outputPath, JSON.stringify(dataOutput, null, 2));
