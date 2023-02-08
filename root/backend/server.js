const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("knex");
const { Pool } = require("pg");

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "marko",
  password: "",
  database: "grocerie",
});

const PORT = 3001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const database = {
  users: [],
};

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// route to get all groceries from user
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM groceries WHERE user_id = $1 ORDER BY date", [id])
    .then((groceries) => {
      res.json(groceries.rows);
    })
    .catch((err) => res.status(400).json(err));
});

// signin route
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else res.status(400).json("error login in");
});

//register route
app.post("/register", (req, res) => {
  // const id =
  //   database.users.length > 0
  //     ? database.users[database.users.length - 1].id * 1 + 1
  //     : 1;
  const { name, email, password } = req.body;
  // database.users.push({
  //   id: JSON.stringify(id),
  //   name: name,
  //   email: email,
  //   password: password,
  //   groceries: [],
  //   joined: new Date(),
  // });

  pool
    .query(
      "INSERT INTO users (email, hash, name) VALUES ($1, $2, $3) RETURNING *",
      [email, password, name]
    )
    .then((user) => {
      res.json(user.rows[0]);
    })
    .catch((err) => res.status(400).json(err));
});

//route to add new grocerie
app.put("/profile/:id/newGrocerie", (req, res) => {
  const { id } = req.params;
  const { title, date } = req.body;
  pool
    .query("INSERT INTO groceries (title, user_id, date) VALUES ($1, $2, $3)", [
      title,
      id,
      date,
    ])
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => res.json(err));
});

//route to edit grocerie
app.put("/profile/:id/editgrocerie", (req, res) => {
  const { id } = req.params;
  const { title, grocerie_id } = req.body;
  // let found = false;
  pool
    .query('UPDATE "groceries" SET "title" = $1 WHERE "id" = $2', [
      title,
      grocerie_id,
    ])
    .then(() => res.json())
    .catch((err) => console.log(err));
  // if (!found) {
  //   res.status(404).json("no such user");
  // }
});

//route to delete specific grocerie
app.delete("/profile/:id/delete", (req, res) => {
  const { grocerie_id } = req.body;

  // let found = false;

  pool
    .query('DELETE FROM "groceries" WHERE "id" = $1;', [grocerie_id])
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => console.log(err));
  // if (!found) {
  //   res.status(404).json("no such user");
  // }
});

//route to clear the list
app.delete("/profile/:id/clearList", (req, res) => {
  const { id } = req.params;

  // let found = false;
  pool
    .query("DELETE FROM groceries WHERE user_id = $1", [id])
    .then(() => res.status(200).json())
    .catch((err) => console.log(err));

  // if (!found) {
  //   res.status(404).json("no such user");
  // }
});
