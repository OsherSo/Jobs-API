const { StatusCodes } = require('http-status-codes');

const Job = require('../models/Job');
const { NotFound } = require('../errors');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.OK).json({
    count: jobs.length,
    jobs,
  });
};

const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const createdBy = req.user.userId;

  const job = await Job.findOne({ _id: id, createdBy });
  if (!job) throw new NotFound('Job not found');

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const createdBy = req.user.userId;

  const job = await Job.findOneAndUpdate(
    {
      _id: id,
      createdBy,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job) throw new NotFound('Job not found');

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const createdBy = req.user.userId;

  await Job.findOneAndDelete({
    _id: id,
    createdBy,
  });

  res.status(StatusCodes.OK).json({ job: null });
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
