const handleNewGrocerie = (req, res, pool) => {
  const { id } = req.params;
  const { title, date } = req.body;

  pool
    .query("INSERT INTO groceries (title, user_id, date) VALUES ($1, $2, $3)", [
      title,
      id,
      date,
    ])

    //also insert into history groceries table if it does not exist
    .then(() =>
      pool
        .query("SELECT * FROM history WHERE user_id = $1 AND title = $2", [
          id,
          title,
        ])
        .then((data) => {
          if (data.rows.length === 0) {
            return pool.query(
              "INSERT INTO history (title, user_id) VALUES ($1, $2)",
              [title, id]
            );
          }
        })
    )
    .then(() => {
      return res.status(200).json();
    })
    .catch((err) => res.json(err));
};

module.exports = {
  handleNewGrocerie: handleNewGrocerie,
};

// pool
//   .query("SELECT * FROM history WHERE user_id = $1", [id])
//   .then((data) => {
//     console.log(data);
//     if (data.rows.length === 0) {

// }
// });
