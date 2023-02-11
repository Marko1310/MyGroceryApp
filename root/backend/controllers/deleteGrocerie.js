const handleDelete = (req, res, pool) => {
  const { grocerie_id } = req.body;
  pool
    .query('DELETE FROM "groceries" WHERE "id" = $1;', [grocerie_id])
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => console.log(err));
};

module.exports = {
  handleDelete: handleDelete,
};
