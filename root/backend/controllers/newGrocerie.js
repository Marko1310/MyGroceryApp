const handleNewGrocerie = (req, res, pool) => {
  const { id } = req.params;
  const { title, date } = req.body;
  //insert into main groceries table
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

  //also insert into history groceries table
  pool
    .query("INSERT INTO history (title, user_id) VALUES ($1, $2)", [title, id])
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => res.json(err));
};

module.exports = {
  handleNewGrocerie: handleNewGrocerie,
};
