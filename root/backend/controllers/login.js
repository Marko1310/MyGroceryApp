const handleLogin = (req, res, pool, bcrypt) => {
  const { email, password } = req.body;
  pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data.rows[0].hash);
      if (isValid) {
        pool
          .query("SELECT * FROM users WHERE email = $1", [email])
          .then((user) => {
            res.json(user.rows[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleLogin: handleLogin,
};
