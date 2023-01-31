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
  res.status(200).json("Server is live");
});

app.get("/register", (req, res) => {
  res.status(200).json("Server is live");
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

/*
/ --> res = this is working
/signin --> POST --> res = seccess, fail
/registerr --> POST = res -> user
/profile/:userId --> GET -> user
/grocery --> PUT = res -> updated user

*/
