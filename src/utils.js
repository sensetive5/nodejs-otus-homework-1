function getItemName(value) {
  return value && value.hasOwnProperty('name') ? value.name : ''
}

function getChildItems(value) {
  return value && value.hasOwnProperty('items') ? value.items : []
}

function prepareJsonData(data) {
  return Array.isArray(data) ? data : [data]
}

function getSpaces(depth, lastNotEndDepth, isEnd) {
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

const outString = (item, depth, lastNotEndDepth, isEnd = false) => {
  const prefixSymbol = getCorrectPrefixSymbol(isEnd)

  const name = getItemName(item)
  const spaces = getSpaces(depth, lastNotEndDepth, isEnd)
  const finalString = `${spaces}${prefixSymbol} ${name}`
  console.log(finalString)
}

function shouldAddEndOfItemsSymbol(data, count) {
  return (data.length - 1) === count
}

function parseJSONTree(data, depth = 0, lastNotEndDepth = 1) {
  depth++;
  data.forEach((item, index) => {
    const isEnd = shouldAddEndOfItemsSymbol(data, index);
    outString(item, depth, lastNotEndDepth, isEnd)
    if (isEnd) {
      parseJSONTree(getChildItems(item), depth, lastNotEndDepth + 1)
    } else {
      parseJSONTree(getChildItems(item), depth, lastNotEndDepth)
    }
  })
}

module.exports = {
  parseJSONTree,
  prepareJsonData
}
