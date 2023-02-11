const handleClearGroceries = (req, res, pool) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM groceries WHERE user_id = $1", [id])
    .then(() => res.status(200).json())
    .catch((err) => console.log(err));
};

module.exports = {
  handleClearGroceries: handleClearGroceries,
};
