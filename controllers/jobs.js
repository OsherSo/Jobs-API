const getAllJobs = async (req, res) => {
  res.send('getAllJobs');
};

const getSingleJob = async (req, res) => {
  res.send('getSingleJob');
};

const createJob = async (req, res) => {
  res.send('CreateJob');
};

const updateJob = async (req, res) => {
  res.send('updateJob');
};

const deleteJob = async (req, res) => {
  res.send('deleteJob');
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
