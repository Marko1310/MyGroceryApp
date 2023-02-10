const handleRegister = (req, res, pool, bcrypt) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);

  if (name === "") {
    return res.status(400).json("name can not be empty");
  } else if (email === "" || !email.includes("@")) {
    return res.status(400).json("not a proper email");
  } else if (password.length < 6) {
    return res
      .status(400)
      .json("password has to be at least 6 characters long");
  } else if (name && email && password) {
    pool
      .query(
        "INSERT INTO users (email, hash, name) VALUES ($1, $2, $3) RETURNING *",
        [email, hash, name]
      )
      .then((user) => {
        res.json(user.rows[0]);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = {
  handleRegister: handleRegister,
};
