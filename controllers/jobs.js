const moment = require('moment');
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

const Job = require('../models/Job');
const { NotFound } = require('../errors');

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;
  const queryObj = { createdBy: req.user.userId };

  if (search) queryObj.position = { $regex: search, $options: 'i' };
  if (status && status !== 'all') queryObj.status = status;
  if (jobType && jobType !== 'all') queryObj.jobType = jobType;

  let jobsQuery = Job.find(queryObj);

  if (sort) {
    const lut = {
      latest: () => (jobsQuery = jobsQuery.sort('-createdAt')),
      oldest: () => (jobsQuery = jobsQuery.sort('createdAt')),
      'a-z': () => (jobsQuery = jobsQuery.sort('position')),
      'z-a': () => (jobsQuery = jobsQuery.sort('-position')),
    };
    if (lut[sort]) lut[sort]();
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  jobsQuery = jobsQuery.skip(skip).limit(limit);

  const jobs = await jobsQuery;
  const totalJobs = await Job.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs,
    numOfPages,
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

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    interview: stats.interview || 0,
    declined: stats.declined || 0,
    pending: stats.pending || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: {
            $month: '$createdAt',
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        '_id.year': -1,
        '_id.month': -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({
    defaultStats,
    monthlyApplications: monthlyApplications,
  });
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
};
