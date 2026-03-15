const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:\\HexStack\\backend\\.env' });

const User = require('./src/models/User');
const Inquiry = require('./src/models/Inquiry');

process.chdir('d:\\HexStack\\backend');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB...');

    // 1. Insert Dummy Users (if not exist)
    const userCount = await User.countDocuments({ role: 'user' });
    if (userCount < 3) {
      const dummyUsers = [
        { name: 'Sarah Connor', email: 'sarah@sky.net', password: 'Password123', role: 'user', phone: '1234567890' },
        { name: 'Tony Stark', email: 'tony@stark.id', password: 'Password123', role: 'user', phone: '0987654321' },
        { name: 'Bruce Wayne', email: 'bruce@wayne.com', password: 'Password123', role: 'user', phone: '1112223333' }
      ];
      
      // Hash password happens automatically in User.js pre-save hook?
      // Wait, standard pre-save hook in User.js hashes the password!
      await User.create(dummyUsers);
      console.log('Added 3 dummy clients.');
    } else {
      console.log('Sufficient clients already exist.');
    }

    // 2. Insert Dummy Inquiries
    const leadCount = await Inquiry.countDocuments();
    if (leadCount < 3) {
      const dummyLeads = [
        { name: 'Peter Parker', email: 'peter@bugle.nyc', service_type: 'Mobile App', message: 'I need an app to track spider stats.', status: 'New' },
        { name: 'Diana Prince', email: 'diana@themiscira.gov', service_type: 'Design', message: 'Building a portal for relics tracking.', status: 'Contacted' },
        { name: 'Arthur Curry', email: 'arthur@atlantis.com', service_type: 'Web Development', message: 'Website for sub-aquatic supply metrics.', status: 'New' }
      ];
      await Inquiry.create(dummyLeads);
      console.log('Added 3 dummy leads.');
    } else {
      console.log('Sufficient leads already exist.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
