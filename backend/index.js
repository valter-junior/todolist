const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./db");

const PORT = process.env.PORT || 3001;

//middleware

app.use(cors());
app.use(express.json());





app.post("/sign-in", async (req, res) => {
  try {
    const { firstName, lastName, login, password } = req.body;
    const newTodo = await sequelize.query("INSERT INTO todo (firstName, lastName, login, password) VALUES('${firstName}', '${lastName}', '${login}', '${password}') RETURNING *", [firstName, lastName, login, password]);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/sign-in", async (req, res) => {
  try {
    const allTodo = await sequelize.query("SELECT * FROM todo");
    res.json(allTodo.rows);
  } catch (err) {
    console.error(err.message);
    
  }
});

app.get("/sign-in/:id", async (req, res) => {
  try {
    console.log(req.params);
  } catch (error) {
    console.error(err.message);
    
  }
});




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});