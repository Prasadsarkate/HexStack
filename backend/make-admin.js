const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:\\HexStack\\backend\\.env' });

const User = require('./src/models/User');

process.chdir('d:\\HexStack\\backend');

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB...');

    const user = await User.findOneAndUpdate(
      { email: 'hexstackadmin@gmail.com' },
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      console.log(`SUCCESS: User ${user.email} is now an ADMIN!`);
    } else {
      console.log('User not found. Please sign up first in UI.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

run();
