

const csv =require('csvjson')
const csvPath = ''
const fs = require('fs')
const { raw } = require('express')
const { Console } = require('console')
var obj = {}

const path = fs.readFileSync('./followersData.csv',{encoding : 'utf8'})
const csvtoJSON = ()=>{
    const rawData = path.split('\n')
    
    const data = []
    const interns =  rawData[0].split(',')
    
        
    
    var finalData = {
        interns : []
    }
    for(var i=1; i<rawData.length;i++){
        data[i-1] = rawData[i].split(',')
    }
    
    for(var j=0;j<interns.length;j++){
        var arr =[]
        for(var k=0;k<data.length;k++){
            if(data[k][j]!==undefined  && data[k][j]!=="" && data[k][j]!=="\r" ){
                arr.push(data[k][j])
            }
        }
        finalData.interns.push({
            name : interns[j],
            followrs : arr
        })
    }
    finalData.interns[interns.length-1].followrs.forEach(element => {
      element.replace("\r"," ")
    });
    console.log(finalData.interns[interns.length-1])
    fs.appendFileSync('list.JSON',JSON.stringify(finalData,null,2).replace("\\r",""))    
}

csvtoJSON()
