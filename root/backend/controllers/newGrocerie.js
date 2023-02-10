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
      res.status(200).json();
    })
    .catch((err) => res.json(err));
};

module.exports = {
  handleNewGrocerie: handleNewGrocerie,
};
