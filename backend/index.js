const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 3001;

//middleware

app.use(cors());
app.use(express.json());





app.post("/sign-in", async (req, res) => {
  try {
    const { firstName, lastName, login, password } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (firstName, lastName, login, password) VALUES($1, $2, $3, $4) RETURNING *", [firstName, lastName, login, password]);
    res.json(newTodo.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});

app.get("/sign-in", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo");
    res.json(allTodo.rows);
  } catch (err) {
    console.error(err.message);
    
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