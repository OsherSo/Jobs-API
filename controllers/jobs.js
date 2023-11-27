const { StatusCodes } = require("http-status-codes");

const Job = require("../models/Job");
const { NotFound } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.OK).json({ jobs });
};

const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const createdBy = req.user.userId;

  const job = await Job.findOne({ _id: id, createdBy });
  if (!job) throw new NotFound("Job not found");

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  const createdBy = req.user.userId;

  const job = await Job.create({
    company,
    position,
    createdBy,
  });

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  res.send("updateJob");
};

const deleteJob = async (req, res) => {
  res.send("deleteJob");
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
