const express = require("express");
const cors = require("cors");
const { database } = require("./utils");
const swaggerUI = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");

const swaggerFile = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = yaml.load(swaggerFile);

const app = express();
app.use(express.json());
app.use(cors());

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Fashion Store E-Commerce",
//       version: "1.0.0",
//       description: "A simple Express Library API",
//     },
//     servers: [
//       {
//         url: "http://localhost:8000/api/v1/",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };

// const specs = swaggerJsDoc(options);

database.connect();

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, documentation: "/api/v1/docs/" });
});

app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const { userRoutes } = require("./routes");
app.use("/api/v1/user", userRoutes);

module.exports = app;
