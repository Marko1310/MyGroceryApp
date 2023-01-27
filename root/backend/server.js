const express = require("express");
const app = express();

const PORT = 3001;

app.get("/", (req, res) => {
  res.status(200).json("Server is live");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
