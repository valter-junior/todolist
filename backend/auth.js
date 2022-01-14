const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const Cors = require("cors");
const bodyParser = require('body-parser');
const controllersUser = require('./controllers/controllerUser');
const listRouter = require('./routes/lists');
const taskRouter = require('./routes/tasks')
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')

const PORT = process.env.PORT || 3001;

app.use(Cors());
app.use(express.json());
app.use(bodyParser.json());


const pass = require('./authentication').pass;
const SECRET = require('./authentication').SECRET; 
const bcrypt = require('bcryptjs');
const accessTokenSecret = process.env.TOKEN_SECRET

const prisma = require('./db').prisma;

/**const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if(authHeader) {
      const token = authHeader.split(' ')[1];
      console.log(token)
  
      // TODO: treat exception for missing token and malformed tokens
      jwt.verify(token, accessTokenSecret, (err, user) => {
        console.log(err)
        if(err) {
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401); 
    }
  }*/

const Login = async(req, res) => {
    const { email, password } = req.body;
    const usermail  = await prisma.users.findUnique({
        where: {
            email,
        }
    })
    
    if(email === usermail.email && password === usermail.password) {
        const token = jwt.sign({ email: email, password: password }, accessTokenSecret);
        res.json({usermail, token});

    } else {
      res.json({"msg": "unauthorized"});
  
    }
}

module.exports = {
    Login
}
  