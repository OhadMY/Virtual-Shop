const express = require("express");
const cors = require("cors");
const port = 1000;

const app = express();

app.use(cors());
app.use(express.json());

// app.use("", require("./routes/"));
// app.use("", require("./routes/"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const { myQuery } = require("./config/db");

app.get("/", async (req, res) => {
  console.log("object");
  const user = await myQuery(`SELECT * FROM users`);
  console.log(user);
  res.json(user);
});

app.listen(port, () => {
  console.log(`Rockin' port ${port}, visit us at http://localhost:${port}`);
});
