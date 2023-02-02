const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 3001;

app.use(cors());

app.use(express.json());

const database = {
  users: [],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else res.status(400).json("error login in");
});

app.post("/register", (req, res) => {
  const id =
    database.users.length > 0
      ? database.users[database.users.length - 1].id * 1 + 1
      : 1;
  const { name, email, password } = req.body;
  database.users.push({
    id: JSON.stringify(id),
    name: name,
    email: email,
    password: password,
    groceries: [],
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.put("/profile/:id", (req, res) => {
  const { id } = req.params;
  const { grocerie } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (id === user.id) {
      found = true;
      user.groceries.push(grocerie);
      return res.json(user.groceries);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.delete("/profile/:id", (req, res) => {
  const { id } = req.params;
  const grocerieID = req.body.id;

  let found = false;
  database.users.forEach((user) => {
    if (id === user.id) {
      found = true;
      const [grocerieToDelete] = user.groceries.filter(
        (el) => el.id === grocerieID
      );
      user.groceries.splice(user.groceries.indexOf(grocerieToDelete), 1);
      res.status(200).json(user.groceries);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

/*
/ --> res = this is working
/signin --> POST --> res = seccess, fail
/register --> POST = res -> user
/profile/:userId --> GET -> user
/grocery --> PUT = res -> updated user

*/
