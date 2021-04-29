const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require("jwt-simple");
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
const USER = "admin";
const PASS = "12345";
const SECRET = "mysecret";

passport.use(new LocalStrategy((username, password, done) => {
    if (username === USER && password === PASS){
      done(null, jwt.encode({username}, SECRET));
      return;
    }
    done(null, false); 
  }));

app.post('/login', passport.authenticate('local', { session: false }),
  (req, res) => {
    res.send({
     token: req.user,
    });
  },
);

passport.use(new BearerStrategy((token, done) => {
  try {
    const { username } = jwt.decode(token, SECRET);
    if (username === USER) {
      done(null, username, { scope: 'read' });
      return;
    }
    done(null, false);
  } catch (error) {
    done(null, false);
  }
}));
  
app.post('/todos', passport.authenticate('bearer', { session: false }),
  (req, res) => {
    console.log("Acess authorized")
  },
);

app.post("/sign-in", async (req, res) => {
  try {
    const { firstName, lastName, login, password } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (firstName, lastName, login, password) VALUES($1, $2, $3, $4) RETURNING *", [firstName, lastName, login, password]);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(res.json(err.message));
  }
});

app.get("/sign-in/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

