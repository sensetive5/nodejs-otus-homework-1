function getItemName(value = {}) {
  return value && value.hasOwnProperty('name')
    ? value.name
    : '';
}

function getChildItems(value = {}) {
  return value && value.hasOwnProperty('items')
    ? value.items
    : [];
}

function prepareJsonData(data) {
  return Array.isArray(data)
    ? data
    : [data];
}

function getSpaces(startDepth = 0, endDepthLevel = 0) {
  const SPACES_PATTERN = `    `;
  const DIVIDER_PATTERN = `|   `;

  let spacesString = Array(endDepthLevel - 1)
    .fill(SPACES_PATTERN)
    .join('');

  for (let i = endDepthLevel; i < startDepth; ++i)
    spacesString += DIVIDER_PATTERN;

  return spacesString;
}

function getCorrectPrefixSymbol(isEnd = false) {
  const PARENT_PREFIX = '├──';
  const NEXT_LEVEL = '└──';

  return isEnd
    ? NEXT_LEVEL
    : PARENT_PREFIX;
}

const print = (item = {}, startDepthLevel = 0, endDepthLevel = 0, isEnd = false) => {
  const prefixSymbol = getCorrectPrefixSymbol(isEnd);

  const name = getItemName(item);
  const spaces = getSpaces(startDepthLevel, endDepthLevel, isEnd);
  const finalString = `${spaces}${prefixSymbol} ${name}`;

  console.log(finalString);
}

function isEndOfItems(data = [], itemsCount = 0) {
  return data && ((data.length - 1) === itemsCount);
}

function increaseDepth(depth = 0) {
  return ++depth;
}

function parseJSONTree(data, startDepth = 0, endDepth = 1) {
  const startDepthLevel = increaseDepth(startDepth);
  data.forEach((item, index) => {
    const isEnd = isEndOfItems(data, index);
    const endDepthLevel = isEnd
      ? increaseDepth(endDepth)
      : endDepth;

    print(item, startDepthLevel, endDepth, isEnd);
    parseJSONTree(getChildItems(item), startDepthLevel, endDepthLevel);
  })
}

module.exports = {
  parseJSONTree,
  prepareJsonData
}
