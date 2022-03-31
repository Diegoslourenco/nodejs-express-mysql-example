const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// simple route for test
app.get("/", (req, res) => {
    res.json({ message: "Bem vindo ao teste" });
});

app.use(routes);

module.exports = app;