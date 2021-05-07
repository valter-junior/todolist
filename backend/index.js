const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const jwt = require("jsonwebtoken");
const Cors = require("cors");
const pool = require("./db");
const bodyParser = require('body-parser');


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

      jwt.verify(JSON.parse(token), SECRET, (err, user) => {
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

app.use(authenticateJWT);

app.post("/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNotes = await pool.query("INSERT INTO list (title, description) VALUES($1, $2) RETURNING * ", [title, description]);
    res.json(newNotes.rows[0]);
    
  } catch (error) {
    console.log(res.json(error.message));    
  }
});

app.get('/notes', async (req, res) => {
    try {
      const allList = await pool.query("SELECT * FROM list");
      res.json(allList.rows);
      
    } catch (error) {
      console.error(error.message);
  }
});

app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updateTodo = await pool.query("UPDATE list SET title = $1, description = $2 WHERE id = $3", [title, description, id]);
    
    res.json("List was Updated!");    
  } catch (error) {
    console.error(error.message);    
  }
});

app.post("/sign-in", async (req, res) => {
  try {
    const { firstName, lastName, login, password } = req.body;
    const newUser = await pool.query("INSERT INTO todo (firstName, lastName, login, password) VALUES($1, $2, $3, $4) RETURNING *", [firstName, lastName, login, password]);
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(res.json(err.message));
  }
});

app.get("/sign-in/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const user = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

app.delete("/sign-in/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    res.json("User was deleted!");    
  } catch (error) {
    console.error(error.message);    
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

