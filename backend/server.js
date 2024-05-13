const express = require("express");
const cors = require("cors");
const { database } = require("./utils");
const swaggerUI = require("swagger-ui-express");
const yaml = require("js-yaml");
const { swaggerYaml } = require("./configs");

const swaggerDocument = yaml.load(swaggerYaml);

const app = express();
app.use(express.json());
app.use(cors());

database.connect();

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, documentation: "/api/v1/docs/" });
});

app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const { userRoutes, productRoutes } = require("./routes");
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

module.exports = app;
