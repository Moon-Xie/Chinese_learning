//This makes sure having right access to import info from .env
require('dotenv').config()

//Pool provides better and faster access to connect to database
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
});

//generate unique id
const uuid = require('uuid');

//hash password
const bcrypt = require('bcrypt')

//jwt
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT || 'shhh'

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
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
    `;
    await pool.query(createUsersTable);
}

//creste user - Register
const createUser = async({username, email, password_hash}) => {
    const SQL = /*sql*/ `
        INSERT INTO users(username, email, password_hash) 
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const response = await pool.query(SQL [
        username,
        email,
        await bcrypt.hash(password_hash, 5)
    ]);
    const user = response.rows[0]

    //generate user token by jsonwebtoken
    const token = jwt.sign({id: user.id}, JWT, {algorithm:'HS256'})
    return(user, token)
}

//get user by username
const getUserByUsername = async({username}) => {
    const SQL = /*sql*/ `
        SELECT * FROM users WHERE username = $1
    `
    const response = await pool.query(SQL, [username])
    return response.rows[0]
}

//get user by email
const getUserByEmail = async({email}) => {
    const SQL = /*sql*/ `
        SELECT * FROM users WHERE email = $1
    `
    const response = await pool.query(SQL, [email])
    return response.rows[0]
}


module.exports = {
    // query: (text, params) => pool.query(text, params),
    pool,
    connectDB,
    createTables,
    createUser,
    getUserByUsername,
    getUserByEmail
}