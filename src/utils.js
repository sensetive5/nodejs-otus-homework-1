function getItemName (value) {
  return value && value.hasOwnProperty('name') ? value.name : ''
}

function getChildItems (value) {
  return value && value.hasOwnProperty('items') ? value.items : []
}

function prepareJsonData (data) {
  return Array.isArray(data) ? data : [data]
}

function getSpacesSize (depth) {
  const SPACES_PATTERN = `    `
  let spacesString = ''

  if (depth === 1) {
    return spacesString
  }

  for (let i = 1; i < depth; i++) {
    spacesString += `${SPACES_PATTERN}`
  }

  return spacesString
}

function getCorrectPrefixSymbol (isEnd = false) {
  const PARENT_PREFIX = '├──'
  const NEXT_LEVEL = '└──'

  return isEnd ? NEXT_LEVEL : PARENT_PREFIX
}

const outString = (item, depth, isEnd = false) => {
  const prefixSymbol = getCorrectPrefixSymbol(isEnd)

  const name = getItemName(item)
  const spaces = getSpacesSize(depth, isEnd)
  const finalString = `${spaces}${prefixSymbol} ${name}`
  console.log(finalString)
}

function shouldAddEndOfItemsSymbol (data, count) {
  return (data.length - 1) === count
}

function parseJSONTree (data, depth = 0) {
  depth++
  data.forEach((item, index) => {
    outString(item, depth, shouldAddEndOfItemsSymbol(data, index))
    parseJSONTree(getChildItems(item), depth)
  })
}

module.exports = {
  parseJSONTree,
  prepareJsonData
}
