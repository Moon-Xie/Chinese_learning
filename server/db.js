//This makes sure having right access to import info from .env
require('dotenv').config()

//Pool provides better and faster access to connect to database
const { Pool } = require('pg');
const pool = new Pool({
    user: 'Moon',
    host:'localhost',
    database: process.env.DATABASE_URL,
    port: process.env.PORT,
});

const connectDB= async() => {
    try {
        console.log('Connecting to database...')
        await pool.connect()
        console.log('Connected to database!')
    } catch (error) {
        console.log(`Error connecting to database ${error}`)
    }
}

// const createTables = async() =>{

// }

module.exports = (
    // query: (text, params) => pool.query(text, params),
    pool,
    connectDB
)