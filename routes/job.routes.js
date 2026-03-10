const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new job
router.post('/', async (req, res) => {
  try {
    const newJob = new Job({
      crewNumber: req.body.crewNumber,
      client: req.body.client,
      description: req.body.description
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ error: 'Invalid job data' });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    job.crewNumber = req.body.crewNumber;
    job.client = req.body.client;
    job.description = req.body.description;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});

module.exports = router;