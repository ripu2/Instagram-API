
const fs = require('fs')
const express = require('express')
const router = express.Router()
const validator = require('validator')
const sixpepFollowers = JSON.parse(fs.readFileSync('./followers.json'))
const intersFollowList = JSON.parse(fs.readFileSync('./list.JSON'))
var data = {
    internAnalysis : []

}



/**
 * Compare followers with actual followers
 * @url
 * /follower
 * POST
 * @request
 * @handlers
 * @body @param
 * @respinse
 * @body
 * 201 - {
 *          message : comaprison object
 *          }
  
 * 400 - 'Bad reqiesr
 */




router.post('/',async (req,res)=>{
    try {
        var checklist = sixpepFollowers.followers
    
    for(var j=0;j<intersFollowList.interns.length;j++){
         var count =0
        var iname = intersFollowList.interns[j].name

        var reported = intersFollowList.interns[j].followers.length
        var fol = intersFollowList.interns[j].followers
        if(fol.length!==0){
            fol.forEach(element => {
                for(var i=0;i<checklist.length;i++){
                    if(validator.equals(element,checklist[i])){
                        count++
                        break;
                    }
                } 
            });
        
            data.internAnalysis.push({
                name : iname,
                given : reported,
                actual : count
            })   
    }
    
 }

    fs.writeFileSync('analysis.JSON',JSON.stringify(data,null,2))
    res.status(201).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router