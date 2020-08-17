const express = require('express')
const router = express.Router()
const Instagram = require('instagram-web-api')
const fs  = require('fs') 
const client = new Instagram({ username : "<user name goes here>", password : "< password goes here>"})
var end = ''
var hasNext

var arr = {
    followers : []
}



/**
 * Followers Fetcher
 * @url
 * /follower
 * GET
 * @request
 * @handlers
 * 
 * @body @param
 * userID [String] [required]
 * @respinse
 * @body
 * 201 - {
 *          message : list of followers
 *          }
  
 * 404 - 'ID not found'
 */




router.get('/', async (req,res)=>{
    try {
        await client.login()
   do{
       
    const followers = await client.getFollowers({userId : 9048412451,first : 50,after : end})
    
    end = followers.page_info.end_cursor
    hasNext = followers.page_info.has_next_page
    
    followers.data.forEach(element => {
        arr.followers.push(element.username)
    });
    
    }while(hasNext  )
    fs.writeFileSync('followers.json',JSON.stringify(arr,null,2))
    res.status(200).send(arr)
    } catch (error) {
        res.status(401).send(error)
    }
})




  
module.exports = router


