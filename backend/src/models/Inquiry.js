const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    service_type: {
      type: String,
      required: [true, 'Please specify a service type'],
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
