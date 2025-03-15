const express = require('express');
const router = express.Router();
const db = require('./connectDB'); // Import database connection

// Define the route
router.get('/api/your-endpoint', (req, res) => {
    res.json({ message: "API is working!" });
});

// Route: GET /database - Retrieve all users
router.get('/database', (req, res) => {
    const query = `
        SELECT userID, userType, email, number, createdAt, updatedAt, lastLoginDate 
        FROM users;
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Route: GET /all-tables - Get all tables separately
router.get('/all-tables', (req, res) => {
    const queries = {
        users: 'SELECT * FROM users',
        students: 'SELECT * FROM students',
        staff: 'SELECT * FROM staff',
        admins: 'SELECT * FROM admins',
        classrooms: 'SELECT * FROM classrooms',
        facilities: 'SELECT * FROM facilities',
        emergency_routes: 'SELECT * FROM emergency_routes',
        buildings: 'SELECT * FROM buildings'
    };

    let responseData = {};
    let queryPromises = Object.keys(queries).map(table => {
        return new Promise((resolve, reject) => {
            db.query(queries[table], (err, results) => {
                if (err) return reject(err);
                responseData[table] = results;
                resolve();
            });
        });
    });

    Promise.all(queryPromises)
        .then(() => res.json(responseData))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Update user language (moved to settings_preferences)
router.post('/update-language', (req, res) => {
    const { id, language } = req.body;
    if (!id || !language) return res.status(400).json({ error: "Missing required fields" });
    
    const query = `UPDATE settings_preferences SET language = ? WHERE userID = ?`;
    db.query(query, [language, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Language updated successfully" });
    });
});

// Get user language
router.get('/get-language/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT language FROM settings_preferences WHERE userID = ?`;
    
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "User not found" });
        res.json({ language: results[0].language });
    });
});

// Get search history
router.get('/search-history/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM search_history WHERE userID = ? ORDER BY search_date DESC`;
    
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get all buildings
router.get('/buildings', (req, res) => {
    const query = 'SELECT * FROM buildings';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get all facilities
router.get('/facilities', (req, res) => {
    const query = 'SELECT * FROM facilities';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get all emergency routes
router.get('/emergency-routes', (req, res) => {
    const query = 'SELECT * FROM emergency_routes';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
