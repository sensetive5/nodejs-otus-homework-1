const fs = require("fs");
const path = require("path");
const minimist = require("minimist");
const { parseJSONTree, prepareJsonData } = require("./src/utils");

const filePath = path.join(__dirname, "src/mocks/folders.json");

const rawData = fs.readFileSync(filePath);
const parsedRawData = JSON.parse(rawData.toString());
const preparedData = prepareJsonData(parsedRawData);

const arguments = minimist(process.argv.slice(2), {
  default: {
    depth: 3,
    path: null,
  },
});

if (arguments.path === null)
  throw new Error(`You should pass argument "path"!`);

parseJSONTree(preparedData);
