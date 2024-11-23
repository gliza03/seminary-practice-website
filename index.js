let express = require("express");
let app = express();
let path = require("path");
const port = process.env.PORT || 5500;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DB_NAME,
        port: process.env.RDS_PORT,
        ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
    }
});

// Define paths
app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));
app.get("/index", (req, res) => res.render("index"));

// Updated /memoryGame route to fetch student data
app.get("/memoryGame", (req, res) => {
    knex('student').select("student_code_name")
        .then(students => {
            res.render("memoryGame", { students });
        })
        .catch(error => {
            console.error("Error fetching student data:", error);
            res.status(500).send("Error loading memory game data");
        });
});

app.listen(port, () => console.log("Express App has started and server is listening!"));
