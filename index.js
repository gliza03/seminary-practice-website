let express = require("express");
let app = express();
let path = require("path");
const port = 5500;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Define paths
app.get("/", (req, res) => res.render("index"));
app.get("/login.ejs", (req, res) => res.render("login"));
app.get("/index.ejs", (req, res) => res.render("index"));
app.get("/memoryGame.ejs", (req, res) => res.render("memoryGame"));

const knex = require("knex") ({
    client : "pg",
    connection : {
        host : "localhost",
        user : "postgres",
        password : "Gabbo2003#",
        database : "doctrinalmastery",
        port : 5432
    }
})

app.listen(port, () => console.log("Express App has started and server is listening!"));
