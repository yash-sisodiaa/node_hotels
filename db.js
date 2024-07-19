const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; // Use IPv4 to avoid potential issues with IPv6

// Set up MongoDB connection
mongoose.connect(mongoURL)
  .then(() => console.log('Connected to MongoDB server'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Get the default connection
const db = mongoose.connection;

// Define event listeners for the db connection
db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB server');
});

db.on('error', (err) => {
  console.error('Error:', err);
});

// Export the db connection
module.exports = db;
