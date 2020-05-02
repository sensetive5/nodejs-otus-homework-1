const fs = require('fs')
const path = require('path')
const { parse, prepareJsonData } = require('./utils');

const filePath = path.join(__dirname, '/mocks/folders.json')

const rawData = fs.readFileSync(filePath)
const parsedRawData = JSON.parse(rawData.toString())
const preparedData = prepareJsonData(parsedRawData)

parse(preparedData)
