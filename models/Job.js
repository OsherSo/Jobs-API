const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      required: [true, 'Company name is required'],
      minLength: [3, 'Company name must be at least 3 characters'],
      maxLength: [50, 'Company name cannot exceed 50 characters'],
    },
    position: {
      type: String,
      trim: true,
      required: [true, 'Position title is required'],
      minLength: [3, 'Position title must be at least 3 characters'],
      maxLength: [50, 'Position title cannot exceed 50 characters'],
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required for job creation'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
