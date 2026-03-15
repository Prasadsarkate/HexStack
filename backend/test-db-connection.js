const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing connection to Atlas...');

mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('ERROR connecting to MongoDB:', err.message);
    process.exit(1);
  });
