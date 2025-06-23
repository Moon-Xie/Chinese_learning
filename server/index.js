
//Cross-Origin Resource Sharing allows the frontend (like localhost:5432) to access data from a backend server on a different origi(like localhost:3000).
const cors = require('cors')

const express = require('express')
const app = express()

//import port from the .env
const port = process.env.PORT || 3000

//import from db.js
const {connectDB, createTables} = require('./db.js')

//app router
const router = require('./api.js')
app.use('/api', router)


const init = async() => {
    //connect to database
    await connectDB();

    //create tables in database
    await createTables();

    app.listen((port, () => console.log(`app is listening on Port ${port}`)))
}

init()