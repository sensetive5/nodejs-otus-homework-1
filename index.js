const fs = require("fs");
const path = require("path");
const { parseJSONTree, prepareJsonData } = require("./src/utils");

const filePath = path.join(__dirname, "src/mocks/folders.json");

const rawData = fs.readFileSync(filePath);
const parsedRawData = JSON.parse(rawData.toString());
const preparedData = prepareJsonData(parsedRawData);

parseJSONTree(preparedData);
