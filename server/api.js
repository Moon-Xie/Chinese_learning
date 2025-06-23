const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router()
const { 
    createUser,
    getUserByUsername,
    getUserByEmail
} = require('./db')


const {
    pool,
    createrUser
} = require('./db')

// POST /api/auth/signup
router.post('/auth/signup', async(req, res, next) => {
    try {
        const email = req.body.email.toLowerCase()
        const {username, password_hash} = req.body

        //make sure filling up with the register form
        if(!username || !password_hash || !email) {
            res.status(400).json({error: 'Email, username, password are required!'})
        }

        //check if the email and username unique
        const usernameAvailability = await getUserByUsername({username})
        const emailAvailability = await getUserByEmail({email})
        if(usernameAvailability) {
            res.status(400).json({error: 'Username is token!'})
        }
        if(emailAvailability) {
            res.status(400).json({error: 'Email is token!'})
        }

        //create new users
        const newUser = await createUser({username, email, password_hash})
        res.status(200).json(newUser)
    } catch (error) {
        next(error)
    }
})

module.exports = router