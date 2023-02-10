const handleGetGroceries = (req, res, pool) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM groceries WHERE user_id = $1 ORDER BY date", [id])
    .then((groceries) => {
      res.json(groceries.rows);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleGetGroceries: handleGetGroceries,
};
