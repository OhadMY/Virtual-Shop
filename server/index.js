const express = require("express");
const app = express();
const port = 1000;
const cors = require("cors");
const path = require("path");

require("./db");

require("dotenv").config();

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/shoppingcarts", require("./routes/shoppingcarts"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Rockin' port ${port}, visit us at http://localhost:${port}`);
});
