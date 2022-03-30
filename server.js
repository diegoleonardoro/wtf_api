const express = require("express");
const bodyParser = require("body-parser");
const config =  require('./config.js');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// routes:
const acronym_routes = require("./routes/routes")
app.use("/acronym", acronym_routes);


const PORT = config.PORT



const server = app.listen(
    PORT,
    console.log(`Server running in ${config.NODE_ENV} mode on port ${config.PORT}`)
);