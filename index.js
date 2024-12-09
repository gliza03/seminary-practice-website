let express = require("express");
let app = express();
let path = require("path");
const port = process.env.PORT || 5500;

// Middleware setup
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));

const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.RDS_HOSTNAME || 'localhost',
        user: process.env.RDS_USERNAME || 'gabe',
        password: process.env.RDS_PASSWORD || 'gabe',
        database: process.env.RDS_DB_NAME || 'seminary',
        port: process.env.RDS_PORT || '5432',
        ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
    }
});

// Define paths
app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));
app.get("/index", (req, res) => res.render("index"));

// Get memory game page with student list
app.get('/memoryGame', async (req, res) => {
    try {
        const student = await knex('student')
            .select('student_id', 'student_code_name')
            .orderBy('student_code_name');
        
        res.render('memoryGame', { student });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Error loading game');
    }
});

// Get 4 random scriptures for the game
app.get('/api/random-scriptures', async (req, res) => {
    try {
        const scriptures = await knex('scriptures')
            .select('scripture_id', 'scripture_reference', 'description')
            .orderByRaw('RANDOM()')
            .limit(4);
        
        res.json(scriptures);
    } catch (error) {
        console.error('Error fetching scriptures:', error);
        res.status(500).json({ error: 'Error fetching scriptures' });
    }
});

// Get next attempt number for a student
app.get('/api/next-attempt-number/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        
        // Get the highest attempt number for this student
        const result = await knex('results')
            .where('student_id', studentId)
            .max('attempt_num as last_attempt')
            .first();
        
        const nextAttemptNumber = (result.last_attempt || 0) + 1;
        res.json({ nextAttemptNumber });
    } catch (error) {
        console.error('Error getting next attempt number:', error);
        res.status(500).json({ error: 'Error getting attempt number' });
    }
});

// Save results route
app.post('/api/save-results', async (req, res) => {
    try {
        console.log('Save results request body:', req.body);
        const { student_id, scripture_ids, pass, grade, attempt_num } = req.body;
        
        // Validate the required fields
        if (!student_id || !scripture_ids || pass === undefined || grade === undefined || !attempt_num) {
            console.log('Validation failed:', { student_id, scripture_ids, pass, grade, attempt_num });
            return res.status(400).json({
                error: 'Missing required fields',
                received: { student_id, scripture_ids, pass, grade, attempt_num }
            });
        }

        // Insert the results
        await knex.transaction(async (trx) => {
            const resultsToInsert = scripture_ids.map(scripture_id => ({
                student_id: Number(student_id),
                scripture_id: Number(scripture_id),
                attempt_num: Number(attempt_num),
                pass: Boolean(pass),
                grade: Number(grade)
            }));
            
            console.log('Inserting results:', resultsToInsert);
            await trx('results').insert(resultsToInsert);
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error saving results:', error);
        res.status(500).json({ 
            error: 'Error saving results',
            message: error.message 
        });
    }
});

app.listen(port, () => console.log("Express App has started and server is listening!"));