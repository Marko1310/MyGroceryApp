const express = require("express");
const app = express();

const PORT = 3001;

app.use(express.json());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      groceries: [],
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "apple",
      groceries: [],
      joined: new Date(),
    },
    {
      id: "125",
      name: "Ann",
      email: "ann@gmail.com",
      password: "banana",
      groceries: [],
      joined: new Date(),
    },
  ],
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
    res.json("signin");
  } else res.status(400).json("error login in");
});

app.post("/register", (req, res) => {
  const id = database.users[database.users.length - 1].id * 1 + 1;
  console.log(id);
  const { name, email, password } = req.body;
  database.users.push({
    id: id,
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

/*
/ --> res = this is working
/signin --> POST --> res = seccess, fail
/register --> POST = res -> user
/profile/:userId --> GET -> user
/grocery --> PUT = res -> updated user

*/
