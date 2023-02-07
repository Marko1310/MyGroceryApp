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

// const db = knex({
//   client: "pg",
//   connection: {
//     host: "127.0.0.1",
//     port: 5432,
//     user: "marko",
//     password: "",
//     database: "grocerie",
//   },
// });

const PORT = 3001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const database = {
  users: [],
};

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM groceries WHERE user_id = $1", [id])
    .then((groceries) => {
      res.json(groceries.rows);
    })
    .catch((err) => res.status(400).json(err));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
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
    .query("INSERT INTO users (email, hash) VALUES ($1, $2) RETURNING *", [
      email,
      password,
    ])
    .then((user) => {
      res.json(user.rows[0]);
    })
    .catch((err) => res.status(400).json(err));
});

// // get specific user
// app.get("/profile/:id", (req, res) => {
//   const { id } = req.params;
//   db.select("*")
//     .from("users")
//     .where("id", id)
//     .then((user) => {
//       if (user.length) {
//         res.json(user[0]);
//       } else {
//         res.status(400).json("user not found");
//       }
//     });
// });

//add new grocerie
app.put("/profile/:id/newGrocerie", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  pool
    .query("INSERT INTO groceries (title, user_id) VALUES ($1, $2)", [
      title,
      id,
    ])
    .then((grocerie) => {
      res.status(200).json();
    })
    .catch((err) => res.json(err));
});

//edit grocerie
app.put("/profile/:id/editgrocerie", (req, res) => {
  const { id } = req.params;
  console.log(req);
  const { title, grocerie_id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (id === user.id) {
      found = true;
      user.groceries.forEach((grocerie) => {
        if (grocerie_id === grocerie.id) {
          grocerie.title = title;
        }
      });
      res.status(200).json(user.groceries);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

//delete specific grocerie
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

app.delete("/profile/:id/clearList", (req, res) => {
  const { id } = req.params;

  // let found = false;
  pool
    .query("DELETE FROM groceries WHERE user_id = $1", [id])
    .then(() => res.status(200).json())
    .catch((err) => console.log(err));

  // database.users.forEach((user) => {
  //   if (id === user.id) {
  //     found = true;
  //     user.groceries = [];
  //     res.status(200).json(user.groceries);
  //   }
  // });
  // if (!found) {
  //   res.status(404).json("no such user");
  // }
});
