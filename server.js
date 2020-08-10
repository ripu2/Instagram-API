const Instagram = require('instagram-web-api')
const fs  = require('fs') 
 
const client = new Instagram({ username : "4742ripu", password : 'Ripu@123456'})
var end = ''
var hasNext,followList


;(async () => {
    
    try {
        await client.login()
    do{
    const followers = await client.getFollowers({userId : 1197770036,first : 50,after : end})
    
    end = followers.page_info.end_cursor
    hasNext = followers.page_info.has_next_page
    followList = JSON.stringify(followers.data,null,2)
    fs.appendFileSync('followers.json',followList)
    
    }while(hasNext)
    
    } catch (error) {
        console.log(error)
    }
  })()

  
