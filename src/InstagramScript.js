const Instagram = require('instagram-web-api')
const fs  = require('fs') 
require('dotenv').config()
const client = new Instagram({ username : "<user name goes here>", password : "<password goes here>"})
var end = ''
var hasNext,followList

var arr = {
    followers : []
}

;(async () => {
    
    try {
        await client.login()
   do{
    const followers = await client.getFollowers({userId : '<user id goes here>',first : 50,after : end})
    
    end = followers.page_info.end_cursor
    hasNext = followers.page_info.has_next_page
    
    followers.data.forEach(element => {
        arr.followers.push(element.username)
    });
    
    }while(hasNext  )
    fs.writeFileSync('followers.json',JSON.stringify(arr,null,2))
    } catch (error) {
        console.log(error)
    }
  })()

  
