let express = require("express");
let app = express();
let path = require("path");
const port = process.env.PORT || 5500;
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
        host : process.env.RDS_HOSTNAME || "localhost",
        user : process.env.RDS_USERNAME || "postgres",
        password : process.env.RDS_PASSWORD || "Gabbo2003#",
        database : process.env.RDS_DB_NAME || "doctrinalmastery",
        port : process.env.RDS_PORT || 5432
    }
})

app.listen(port, () => console.log("Express App has started and server is listening!"));
