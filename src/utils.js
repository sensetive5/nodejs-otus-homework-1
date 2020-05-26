/**
 * Get name of current item
 *
 * @param {Object} value
 * @return {string}
 */
function getItemName(value = {}) {
  return value && value.hasOwnProperty("name") ? value.name : "";
}

/**
 * Get child items array of current item
 *
 * @param {Object} value
 * @return {Array}
 */
function getChildItems(value = {}) {
  return value && value.hasOwnProperty("items") ? value.items : [];
}

/**
 * Transform JSON data to Array if needed
 *
 * @param {Array | Object} data
 * @return {Array}
 */
function prepareJsonData(data) {
  return Array.isArray(data) ? data : [data];
}

/**
 * Get two depth levels and returns
 * actual spaces and divider string
 *
 * @param {number} startDepth
 * @param {number} endDepthLevel
 * @return {string}
 */
function getSpaces(startDepth = 0, endDepthLevel = 0) {
  const SPACES_PATTERN = `    `;
  const DIVIDER_PATTERN = `|   `;

  let spacesString = Array(endDepthLevel - 1)
    .fill(SPACES_PATTERN)
    .join("");

  for (let i = endDepthLevel; i < startDepth; ++i) {
    spacesString += DIVIDER_PATTERN;
  }

  return spacesString;
}

/**
 * Returns correct prefix before item name
 *
 * @param {boolean} isEnd
 * @return {string}
 */
function getCorrectPrefixSymbol(isEnd = false) {
  const PARENT_PREFIX = "├──";
  const NEXT_LEVEL = "└──";

  return isEnd ? NEXT_LEVEL : PARENT_PREFIX;
}

/**
 * Print final string with spaces, dividers and item name to console
 *
 * @param {Object} item
 * @param {number} startDepthLevel
 * @param {number} endDepthLevel
 * @param {boolean} isEnd
 * @return {void}
 */
function print(
  item = {},
  startDepthLevel = 0,
  endDepthLevel = 0,
  isEnd = false
) {
  const prefixSymbol = getCorrectPrefixSymbol(isEnd);

  const name = getItemName(item);
  const spaces = getSpaces(startDepthLevel, endDepthLevel, isEnd);
  const finalString = `${spaces}${prefixSymbol} ${name}`;

  console.log(finalString);
}

/**
 * Check for end of items
 *
 * @param {Array} data
 * @param {number} itemsCount
 * @return {boolean}
 */
function isEndOfItems(data = [], itemsCount = 0) {
  return data && data.length - 1 === itemsCount;
}

/**
 * Increment depth level
 *
 * @param {number} depth
 * @return {number}
 */
function increaseDepth(depth = 0) {
  return ++depth;
}

/**
 * Main core function which parse JSON tree
 *
 * @param {Array} data
 * @param {number} startDepth
 * @param {number} endDepth
 * @return {void}
 */
function parseJSONTree(data = [], startDepth = 0, endDepth = 1) {
  const startDepthLevel = increaseDepth(startDepth);
  data.forEach((item, index) => {
    const isEnd = isEndOfItems(data, index);
    const endDepthLevel = isEnd ? increaseDepth(endDepth) : endDepth;

    print(item, startDepthLevel, endDepth, isEnd);
    parseJSONTree(getChildItems(item), startDepthLevel, endDepthLevel);
  });
}

module.exports = {
  parseJSONTree,
  prepareJsonData,
};
