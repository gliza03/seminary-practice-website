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
        host : process.env.RDS_HOSTNAME || 'localhost',
        user : process.env.RDS_USERNAME || 'postgres',
        password : process.env.RDS_PASSWORD || 'Gabbo2003#',
        database : process.env.RDS_DB_NAME || 'seminary',
        port : process.env.RDS_PORT || '5432',
        ssl: process.env.DB_SSL ? {rejectUnauthorized: false} : false
    }
})

app.get("/memoryGame.ejs", async (req, res) => { 
    try { const student = await knex("student").select("student.student_code_name"); 
        res.render("memoryGame", { student });
     } catch (error) { 
        console.error("Error fetching students:", error); 
        res.status(500).send("Internal server error.");
     }
});

app.listen(port, () => console.log("Express App has started and server is listening!"));
