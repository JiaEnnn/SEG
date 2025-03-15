require('dotenv').config({ path: '../connectDB.env' });
console.log("DB_HOST:", process.env.DB_HOST);

if (!process.env.DB_HOST) {
    console.error("⚠️ .env file not loaded! Check the file path.");
    process.exit(1);
}

const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const port = 5000;

// Serve static files from the correct directory
app.use(express.static(path.join(__dirname, '..')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "loginPage.html")); // Corrected path
});

app.use(express.json());
app.use('/', routes);

console.log("Loaded Routes:", routes.stack.map(r => r.route?.path).filter(Boolean));

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'campus_navigation',
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL Connection Failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
