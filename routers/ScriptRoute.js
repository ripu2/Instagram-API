const express = require('express')
const router = express.Router()
const Instagram = require('instagram-web-api')
const fs  = require('fs') 
const client = new Instagram({ username : "4742ripu", password : "Ripu@123456"})
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
       
    const followers = await client.getFollowers({userId : req.body.userID,first : 50,after : end})
    
    end = followers.page_info.end_cursor
    hasNext = followers.page_info.has_next_page
    
    followers.data.forEach(element => {
        arr.followers.push(element.username)
    });
    
    }while(hasNext  )
    res.status(200).send(arr)
    } catch (error) {
        res.status(401).send(error)
    }
})


  
module.exports = router