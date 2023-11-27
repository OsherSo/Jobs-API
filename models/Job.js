const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      required: [true, ''],
      minLength: [3, ''],
      maxLength: [50, ''],
    },
    position: {
      type: String,
      trim: true,
      required: [true, ''],
      minLength: [3, ''],
      maxLength: [50, ''],
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, ''],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
