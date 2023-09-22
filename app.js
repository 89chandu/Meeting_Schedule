const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '7999Ch@ndu',
  database: 'meeting_slots',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON requests
app.use(express.json());

// Define an API endpoint to fetch meeting slots
app.get('/api/meetings', (req, res) => {
  // Execute a SELECT query to fetch meeting slots
  db.query('SELECT * FROM meeting_slots', (err, rows) => {
    if (err) {
      throw err;
    }
    // Send the data as a JSON response
    res.json({ availableSlots: rows });
  });
});

// Define an API endpoint to book a meeting slot
app.post('/api/book-meeting', (req, res) => {
  const { name, email, slotId } = req.body;

  // Update the database to mark the slot as booked
  const sql = 'UPDATE meeting_slots SET booked = 1, booked_by_name = ?, booked_by_email = ? WHERE id = ?';

  db.query(sql, [name, email, slotId], (err, result) => {
    if (err) {
      console.error('Error booking meeting slot:', err);
      res.status(500).json({ message: 'Booking failed' });
    } else {
      res.json({ message: 'Booking successful' });
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
