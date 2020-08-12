const express = require("express")
const scriptRoute = require('./routers/ScriptRoute')
const conversionRoute = require('./routers/ConversionRoute')
const comaprisonRoute = require('./routers/ComaprisonRoute')
const app = express()
app.use(express.json())

app.use('/follower',scriptRoute)
app.use('/conversion',conversionRoute)
app.use('/comparison',comaprisonRoute)


app.listen(3000,()=>{
    console.log('server is up on 3000')
})  