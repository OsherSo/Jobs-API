const express = require('express');

const testUser = require('../middleware/testUser');

const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

const router = express.Router();

router.route('/').get(getAllJobs).post(testUser, createJob);
router
  .route('/:id')
  .get(getSingleJob)
  .patch(testUser, updateJob)
  .delete(testUser, deleteJob);

module.exports = router;
