const express = require('express');

const testUser = require('../middleware/testUser');
const apiLimiter = require('../middleware/apiLimiter');

const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

const router = express.Router();

router.route('/').get(getAllJobs).post(testUser, apiLimiter, createJob);
router
  .route('/:id')
  .get(getSingleJob)
  .patch(testUser, updateJob)
  .delete(testUser, deleteJob);

module.exports = router;
