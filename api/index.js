const dontenv = require("dotenv");
dontenv.config();
const { initializeServer } = require("./config/server.config");

const productRoutes = require("./routes/routes");
const PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlwares/errorHandler");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRoutes);
app.get("/", (req, res) => {
  res.send("Webserver is running");
});

app.use(errorHandler);

initializeServer(app, PORT);
