

const csv =require('csvjson')
const csvPath = ''
const fs = require('fs')

const path = fs.readFileSync('./followersData.csv',{encoding : 'utf8'})

const data = csv.toColumnArray(path)
const followersData = JSON.stringify(data,null,2)
fs.appendFileSync('list.JSON',followersData)



