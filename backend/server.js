const express = require("express");
const cors = require("cors");
const { database } = require("./utils");

const app = express();
app.use(express.json());
app.use(cors());

database.connect();

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, documentation: "api/docs/" });
});

module.exports = app;
