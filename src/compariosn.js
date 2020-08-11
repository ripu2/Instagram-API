const fs = require('fs')
const validator = require('validator')
const sixpepFollowers = JSON.parse(fs.readFileSync('./followers.json'))
const intersFollowList = JSON.parse(fs.readFileSync('./list.JSON'))
var data = {
    internAnalysis : []

}

 var checklist = sixpepFollowers.followers
  var fol = intersFollowList.interns[1].followrs
 for(var j=0;j<intersFollowList.interns.length;j++){
     var count =0
     var iname = intersFollowList.interns[j].name

    var reported = intersFollowList.interns[j].followrs.length
    var fol = intersFollowList.interns[j].followrs
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

 
fs.writeFileSync('analysis.json',JSON.stringify(data,null,2))