
//Cross-Origin Resource Sharing allows the frontend (like localhost:5432) to access data from a backend server on a different origi(like localhost:3000).
const cors = require('cors')

const express = require('express')
const app = express()

//import port from the .env
const port = process.env.PORT || 3000

//import from db.js
const {connectDB, createTables} = require('./db.js')

const init = async() => {
    await connectDB();
    await createTables();

    app.listen((port, () => console.log(`app is listening on Port ${port}`)))
}

init()