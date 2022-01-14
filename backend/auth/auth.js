const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('./jwt');

const login =  async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
        where: {
            email
        }
    });
    console.log(user)
    if (!user) {
        res.json('User not registered')
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) {
        res.json('Email address or password not valid')
    }
    
    const accessToken = await jwt.signAccessToken(user)
    return { ...user, accessToken }
}

module.exports = {
    login
}

