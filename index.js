//js file to check whether all the requirements are fulfilled to connect the backend to the database
const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

//connecting to the port
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;


    //"db":"mongodb+srv://admin1:12345@xamdb.riwwi.mongodb.net/XamDB?retryWrites=true&w=majority"