//This makes sure having right access to import info from .env
require('dotenv').config()

//Pool provides better and faster access to connect to database
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
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

const createTables = async() =>{

    // UUID generation function
    const enableUuidExtension = `CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;
    await pool.query(enableUuidExtension);

    const dropTablesIfExist = /*sql*/ `
        DROP TABLE IF EXISTS users
    `
    await pool.query(dropTablesIfExist)

    console.log('Finished runing drop tables qurey.');

    //Create users
    console.log('Creating users table...');
    const createUsersTable = /*sql*/`
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        mailing_address TEXT,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
    `;
    await pool.query(createUsersTable);
}

module.exports = {
    // query: (text, params) => pool.query(text, params),
    pool,
    connectDB,
    createTables
}