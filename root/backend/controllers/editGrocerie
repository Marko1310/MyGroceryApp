const handleEditGrocerie = (req, res, pool) => {
  const { id } = req.params;
  const { title, grocerie_id } = req.body;

  if (title.length > 0) {
    pool
      .query('UPDATE "groceries" SET "title" = $1 WHERE "id" = $2', [
        title,
        grocerie_id,
      ])
      .then(() => res.json())
      .catch((err) => console.log(err));
  } else {
    res.status(400).json("please enter a valid grocerie");
  }
};

module.exports = {
  handleEditGrocerie: handleEditGrocerie,
};
