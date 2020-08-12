const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = fs.readFileSync('./followersData.csv',{encoding : 'utf8'})



/**
 * JSON to CSV
 * @url
 * /follower
 * post
 * @request
 * @handlers
 * 
 * @body @param
 * 
 * @respinse
 * @body
 * 201 - {
 *          message : list of required account followers
 *          }
  
 * 404 - 'ID not found'
 */


router.post('/',async(req,res)=>{
    try {
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
        res.status(201).send(finalData)    

    } catch (error) {
        res.status(404).send(error)
    }
})



module.exports = router