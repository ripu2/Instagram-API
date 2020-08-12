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
        // var assd = {
        //     as : []

        
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
                    var filterData =data[k][j].replace(/(\r\n|\n|\r)/gm,"")
                    var nd = filterData.replace("@","")
                    arr.push(nd)
                }
            }
            finalData.interns.push({
                name : interns[j].replace(/(\r\n|\n|\r)/gm,""),
                followrs : arr
            })
        }
        fs.writeFileSync('list.JSON',JSON.stringify(finalData,null,2))
        res.status(201).send(finalData)    

    } catch (error) {
        res.status(404).send(error)
    }
})



module.exports = router