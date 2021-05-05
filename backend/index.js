const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const jwt = require("jwt-simple");
const Cors = require("cors");
const pool = require("./db");
const Notes = require("./Models");

const PORT = process.env.PORT || 3001;

app.use(Cors());
app.use(express.json());

const user = "admin";
const pass = "12345";
const SECRET = "mysecret";

passport.use(new LocalStrategy((username, password, done) => {
    if (username === user && password === pass){
      done(null, jwt.encode({username}, SECRET));
      return;
    }
    done(null, false); 
  }));

app.post('/login', passport.authenticate('local', { session: false }),
  (req, res) => {
    res.json({
     token: req.user,
    });
  },
);

app.post("/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNotes = await pool.query("INSERT INTO list (title, description) VALUES($1, $2) RETURNING * ", [title, description]);
    res.json(newNotes.rows[0]);
    
  } catch (error) {
    console.log(res.json(error.message));    
  }
});

app.get('/notes', 
  passport.authenticate('local', { session: false }), async (req, res) => {
    try {
      const allList = await pool.query("SELECT * FROM list");
      res.json(allList.rows);
      
    } catch (error) {
      console.error(error.message);
  }
});

app.put("/sign-in/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, password } = req.body;
    const updateTodo = await pool.query
    
  } catch (error) {
    
  }
})




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

