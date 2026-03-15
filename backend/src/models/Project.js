const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project must belong to a client'],
    },
    title: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Active', 'Completed'],
      default: 'Pending',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    total_budget: {
      type: Number,
      required: [true, 'Please add a budget'],
    },
    paid_amount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
      required: [true, 'Please add a deadline'],
    },
    files_url: [
      {
        name: String,
        url: String,
      },
    ],
    team_lead: {
      type: String,
      default: 'Not Assigned',
    },
    current_stage: {
      type: String,
      enum: ['Discovery', 'Design', 'Development', 'Testing', 'Launch'],
      default: 'Discovery',
    },
    payments: [
      {
        invoice_id: String,
        amount: Number,
        date: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ['Pending', 'Paid'],
          default: 'Pending',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Virtual for remaining balance
projectSchema.virtual('remaining_balance').get(function () {
  return this.total_budget - this.paid_amount;
});

// Ensure virtuals are included in JSON output
projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema);
