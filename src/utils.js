function getItemName(value) {
  return value && value.hasOwnProperty('name') ? value.name : ''
}

function getChildItems(value) {
  return value && value.hasOwnProperty('items') ? value.items : []
}

function prepareJsonData(data) {
  return Array.isArray(data) ? data : [data]
}

function getSpaces(depth, lastNotEndDepth) {
  const SPACES_PATTERN = `    `
  const NOT_END_PATTERN = `|   `

  let spacesString = ''

  for (let i = 1; i < lastNotEndDepth; i++) {
    spacesString += SPACES_PATTERN;
  }

  for (let i = lastNotEndDepth; i < depth; ++i) {
    spacesString += NOT_END_PATTERN;
  }

  return spacesString
}

function getCorrectPrefixSymbol(isEnd = false) {
  const PARENT_PREFIX = '├──'
  const NEXT_LEVEL = '└──'

  return isEnd ? NEXT_LEVEL : PARENT_PREFIX
}

const print = (item, depth, lastNotEndDepth, isEnd = false) => {
  const prefixSymbol = getCorrectPrefixSymbol(isEnd)

  const name = getItemName(item)
  const spaces = getSpaces(depth, lastNotEndDepth, isEnd)
  const finalString = `${spaces}${prefixSymbol} ${name}`
  console.log(finalString)
}

function isEndOfItems(data, count) {
  return (data.length - 1) === count
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
