const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Store the list of restaurants
const restaurants = [];

// Endpoint to add a restaurant
app.post('/add-restaurant', (req, res) => {
  const { restaurant } = req.body;

  if (restaurant) {
    restaurants.push(restaurant);
    res.status(201).json({ message: 'Restaurant added successfully' });
  } else {
    res.status(400).json({ message: 'Invalid restaurant name' });
  }
});

// Endpoint to get a random restaurant choice
app.get('/get-random-choice', (req, res) => {
  if (restaurants.length > 0) {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const randomChoice = restaurants[randomIndex];
    res.status(200).json({ randomChoice });
  } else {
    res.status(404).json({ message: 'No restaurants submitted.' });
  }
});

app.get('/get-restaurants', (req, res) => {
  if (restaurants.length > 0) {
    res.status(200).json({ restaurants });
  } else {
    res.status(404).json({ message: 'No restaurants submitted.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
