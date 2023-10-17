const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(morgan("tiny"));

//Routes

const recipeRoutes = require("./routes/recipe");
const userRoutes = require("./routes/user");

const api = process.env.API_URL;

app.use(`${api}/recipe`, recipeRoutes);
app.use(`${api}/user`, userRoutes);

//Database
mongoose
.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "RecipeWebsite_V1_2",
    })
    .then(() => {
    console.log("Database Connection is ready...");
    })
    .catch((err) => {
    console.log(err);
    });

//Server
app.listen(9000, () => {
    console.log("server is running http://localhost:9000");
});
