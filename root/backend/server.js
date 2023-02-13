require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const register = require("./controllers/register");
const login = require("./controllers/login");
const getGroceries = require("./controllers/getGroceries");
const newGrocerie = require("./controllers/newGrocerie");
const editGrocerie = require("./controllers/editGrocerie");
const deleteGrocerie = require("./controllers/deleteGrocerie");
const clearGroceries = require("./controllers/clearGroceries");

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: true,
});

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//register route
app.post("/register", (req, res) => {
  register.handleRegister(req, res, pool, bcrypt);
});

// login route
app.post("/login", (req, res) => {
  login.handleLogin(req, res, pool, bcrypt);
});

// route to get all groceries from user
app.get("/profile/:id", (req, res) =>
  getGroceries.handleGetGroceries(req, res, pool)
);

// route to get all groceries history from user
app.get("/profile/:id/history", (req, res) =>
  getGroceries.handleGetHistory(req, res, pool)
);

//route to add new grocerie
app.post("/profile/:id/newGrocerie", (req, res) =>
  newGrocerie.handleNewGrocerie(req, res, pool)
);

//route to edit grocerie
app.post("/profile/:id/editgrocerie", (req, res) =>
  editGrocerie.handleEditGrocerie(req, res, pool)
);

//route to delete specific grocerie
app.delete("/profile/:id/delete", (req, res) =>
  deleteGrocerie.handleDelete(req, res, pool)
);

//route to clear the list
app.delete("/profile/:id/clearList", (req, res) =>
  clearGroceries.handleClearGroceries(req, res, pool)
);
