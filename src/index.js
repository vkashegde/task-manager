const express = require('express')
//it will ensure  that file runs. So that mongoose can connect to database.
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

//import Routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT||3000

// middleware
app.use(express.json())

//Routers
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('We are up and running Captain ' + port )
})

const jwt = require('jsonwebtoken')

const myfunc = async()=>{
    const token = jwt.sign({_id:'abcd1234'},'thisismynewcourse',{expiresIn:'6 days'})
    console.log(token)

   const data =  jwt.verify(token,'thisismynewcourse')
   console.log(data)
}

myfunc()
