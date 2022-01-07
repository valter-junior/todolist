const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const Cors = require("cors");
const bodyParser = require('body-parser');



/**const controllersNote = require('./controllers/controllerNote'); */
const controllersUser = require('./controllers/controllerUser')

const PORT = process.env.PORT || 3001;

app.use(Cors());
app.use(express.json());
app.use(bodyParser.json());

const user = "admin";
const pass = "12345";
const SECRET = "mysecret";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if(authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token)

    // TODO: treat exception for missing token and malformed tokens
    jwt.verify(token, SECRET, (err, user) => {
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



app.post('/login', (req, res) => {
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

app.get("/sign-in", controllersUser.getAllUsers);

app.use(authenticateJWT);
/** 
app.post("/notes", controllersNote.createPost);
 
app.get("/notes", controllersNote.getAllNotes);

app.put("/notes/:id", controllersNote.updateNotes);

app.delete("/notes/:id", controllersNote.deleteNotes);

app.delete("/sign-in/:id", controllersUser.deleteUser);
*/
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
