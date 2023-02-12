const handleNewGrocerie = (req, res, pool) => {
  const { id } = req.params;
  const { title, date } = req.body;

  pool
    .query("INSERT INTO groceries (title, user_id, date) VALUES ($1, $2, $3)", [
      title,
      id,
      date,
    ])
    .then(() => {
      pool
        .query("SELECT * FROM history WHERE user_id = $1", [id])
        .then((data) => {
          console.log(data);
          if (data.rows.length === 0) {
            pool.query(
              "INSERT INTO history (title, user_id) VALUES ($1, $2))",
              [title, id]
            );
          }
        });
    })
    .then(() => {
      return res.status(200).json();
    })
    .catch((err) => res.json(err));
  //also insert into history groceries table
};

module.exports = {
  handleNewGrocerie: handleNewGrocerie,
};
