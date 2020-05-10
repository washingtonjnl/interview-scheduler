//import models
const interviewerModel = require('../models/interviewer');

// add a new interviewer
function Add (req, res) {
  const newInterviewer = req.body;

  interviewerModel.create(newInterviewer)
  .then(() => {
    res.status(201).send({ message: "Interviewer created!", newInterviewer })
  })
  .catch((err) => {
    console.log(err)
    res.status(400).send({ error: "Interviewer was not created :( You must be input all user info!" })
  });
};

// edit a existent interviewer (select by _id on params)
function Edit (req, res) {

  interviewerModel.findOneAndUpdate({
    _id: req.params.id
  },
  {
    $set: req.body
  },
  {
    new:true
  })
  .then((newInterviewer) => {
    if(newInterviewer == []) {
      res.status(404).send({ message: "This interviewer does not exist." })
    } else {
      res.status(200).send({ message: "Interviewer info was been updated!", changes: newInterviewer })
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ error: "Unable to update interviewer information :(" })
  });
};

// add subject to interviewer
function AddSubjects (req, res) {

  // find interviewer
  const email = req.params.email;
  const { subjects } = req.body;
  
  interviewerModel.find({businessEmail: email})
  .then((interviewers) => {
    if(interviewers == []) {
      res.status(404).send({ message: "This interviewer does not exist." })
    } else {
      const subjectsToAdd = subjects;
      const currentSubjects = interviewers[0].ableSubjects;

      // add new subjects
      for( var i = 0; i < subjectsToAdd.length; i++) {
        if (currentSubjects.includes(subjectsToAdd[i]) == false) {
          currentSubjects.push(subjectsToAdd[i])
        }
      }
      
      // update subjects
      const newSubjects = currentSubjects;

      interviewerModel.findOneAndUpdate({
        businessEmail: email
      },
      {
        ableSubjects: newSubjects
      },
      {
        new: true
      })
      .then((newInterviewer) => {
        res.status(200).send({ message: "Subjects was been added!", changes: newInterviewer })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send({ error: "Unable to add interviewer subjects :(" })
      });
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ error: "Internal server error :/" })
  });
};

// remove subject to interviewer
function RemoveSubjects (req, res) {

  // find interviewer
  const email = req.params.email;
  const { subjects } = req.body;
  
  interviewerModel.find({businessEmail: email})
  .then((interviewers) => {
    if(interviewers == []) {
      res.status(404).send({ message: "This interviewer does not exist." })
    } else {
      const subjectsToRemove = subjects;
      const currentSubjects = interviewers[0].ableSubjects;

      // remove the indicated subjects
      for( var i = 0; i < subjectsToRemove.length; i++) {
        if (currentSubjects.includes(subjectsToRemove[i])) {
          currentSubjects.splice(currentSubjects.indexOf(subjectsToRemove[i]), 1)
        }
      }
      
      // update subjects
      const newSubjects = currentSubjects;

      interviewerModel.findOneAndUpdate({
        businessEmail: email
      },
      {
        ableSubjects: newSubjects
      },
      {
        new: true
      })
      .then((newInterviewer) => {
        res.status(200).send({ message: "Subjects was been removed!", changes: newInterviewer })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send({ error: "Unable to remove interviewer subjects :(" })
      });
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ error: "Internal server error :/" })
  });
};

// delete a interviewer
function Delete (req, res) {
  const { email } = req.body;

  interviewerModel.deleteMany({businessEmail: email})
  .then((interviewer) => {
    if(interviewer.n == 0) {
      res.status(404).send({ message: "This interviewer does not exist." })
    } else {
      res.status(200).send({ message: "Interviewer was deleted!" })
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ error: "Interviewer was not deleted." })
  });
};

// clear all data. Uses to deploy API or reset all interviewers
function ClearDatabase (req, res) {
  interviewerModel.deleteMany({})
  .then(() => {
    res.status(200).send({ message: "Database was full cleaned!" })
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ error: "Database was not cleaned." })
  });
};

// find a interviewer using email on body json
function FindByEmail (req, res) {
  const { email } = req.body;

  interviewerModel.find({businessEmail: email})
  .then((interviewers) => {
    if(interviewers == []) {
      res.status(404).send({ message: "This interviewer does not exist." })
    } else {
      res.status(200).send(interviewers[0])
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ error: "Internal server error :/" })
  });
};

// list all or filtered interviewers (filter by subject with query params)
function List (req, res) {

  if (req.query.subject) {

    const { subject } = req.query;
    interviewerModel.find({ ableSubjects: subject })
    .then((interviewers) => {
      if (interviewers == {}) {
        res.status(404).send({ message: `No interviewers registered for ${subject} :(` })
      } else {
        res.status(200).send(interviewers)
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ error: "Internal server error :/" })
    });

  } else {

    interviewerModel.find({})
    .then((interviewers) => {
      if (interviewers == {}) {
        res.status(404).send({ message: "No interviewers registered on database :(" })
      } else {
        res.status(200).send(interviewers)
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ error: "Internal server error :/" })
    });

  }
};

// export controllers
module.exports = {
  Add,
  Edit,
  AddSubjects,
  RemoveSubjects,
  Delete,
  ClearDatabase,
  FindByEmail,
  List
};
