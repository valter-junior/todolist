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

const user = require('./authentication').user;
const pass = require('./authentication').pass;
const SECRET = require('./authentication').SECRET; 
const bcrypt = require('bcryptjs');
const accessTokenSecret = process.env.TOKEN_SECRET

const connect = require('./auth');

const authenticateJWT = (req, res, next) => {
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
}

app.post('/', (req, res) => {
  const { username, password } = req.body;
  if(username === user && password === pass) {
    const token = jwt.sign({ username: username }, SECRET);

    res.json({ token });

  } else {
    res.json({"msg": "unauthorized"});

  }
  },
);

app.post("/sign-in", controllersUser.createUser);

app.post('/login', connect.Login)

app.use('/sign-in', userRouter);

app.use(authenticateJWT);


app.use('/lists', listRouter);
app.use('/tasks', taskRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
