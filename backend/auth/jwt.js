const jwt = require('jsonwebtoken')
const createError = require('http-errors')


require('dotenv').config()
const accessTokenSecret = process.env.TOKEN_SECRET

const signAccessToken = (res) => {
    return new Promise((resolve, reject) => {
        jwt.sign({payload}, accessTokenSecret, {

        }), (error, token) => {
            if (error) {
                reject(res.json("Unauthorized"))
            }
            resolve(token)
        }
    })
}

const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, accessTokenSecret, (err, payload) => {
            if (err) {
                const message = error.name == 'JsonWebTokenError' ? 'Unauthorized' : error.message
                return reject(message)
            }
            resolve(payload)
        })
    })
} 

module.exports = {
    signAccessToken,
    verifyAccessToken
}

