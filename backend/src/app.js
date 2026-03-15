const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security Headers
app.use(helmet());

// Enable CORS
app.use(cors());

// HTTP request logger
app.use(morgan('dev'));

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/client', clientRoutes);

// Simple Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to HexStack Agency Management API' });
});

module.exports = app;
