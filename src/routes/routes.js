// import express
const express = require('express');
const router = express.Router();

// import controllers and models
const interviewerControllers = require('../controllers/interviewers-controllers');
const interviwersModel = require('../models/interviewer');

// all routes
router.post('/scheduler/add', interviewerControllers.Add); // admin

router.put('/scheduler/edit/:id', interviewerControllers.Edit); // admin

router.put('/scheduler/add-subjects/:email', interviewerControllers.AddSubjects); // admin

router.put('/scheduler/remove-subjects/:email', interviewerControllers.RemoveSubjects); // admin

router.delete('/scheduler/remove', interviewerControllers.Delete); // admin

router.delete('/scheduler/clear', interviewerControllers.ClearDatabase); // admin

router.get('/scheduler/find', interviewerControllers.FindByEmail); // admin

router.get('/scheduler/list', interviewerControllers.List); // admin + user client

module.exports = router;
