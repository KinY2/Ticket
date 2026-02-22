const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // allow browser to access from localhost

// Serve static files (your HTML, CSS, JS)
app.use(express.static(__dirname));

// API endpoint to get a random available seat
app.get('/get-seat', (req, res) => {
  const data = JSON.parse(fs.readFileSync('seats.json', 'utf8'));

  // Get available seats
  const availableSeats = Object.keys(data).filter(seat => data[seat] > 0);
  if (availableSeats.length === 0) {
    return res.json({ seat: null }); // no seats left
  }

  // Pick a random available seat
  const seat = availableSeats[Math.floor(Math.random() * availableSeats.length)];

  // Decrease the count and save
  data[seat]--;
  fs.writeFileSync('seats.json', JSON.stringify(data, null, 2));

  res.json({ seat });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
