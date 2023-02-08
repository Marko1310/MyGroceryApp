const handleRegister = (req, res, pool, bcrypt) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);

  pool
    .query(
      "INSERT INTO users (email, hash, name) VALUES ($1, $2, $3) RETURNING *",
      [email, hash, name]
    )
    .then((user) => {
      res.json(user.rows[0]);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleRegister: handleRegister,
};
