import { Router } from "express";
import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
import AssignAccess from "../models/AssignAccess.js";
import Tutor from "../models/Tutor.js";
import ClassAccess from "../models/ClassAccess.js";
import Student from "../models/Student.js";

const assignmentRouter = new Router();

//CREATES NEW ASSIGNMENT
assignmentRouter.post("/", async (req, res, next) => {
  try {
    const userId = req.query["userId"];
    console.log(userId);
    let { body } = req;
    if (userId) {
      const tutor = await Tutor.findOne({ userId: userId });
      const assignmentBody = { ...body, tutorId: tutor._id };
      body=assignmentBody;
    } 
    const newAssignment = await Assignment.create(body);
    if (newAssignment) {
        res.status(201).json({ assignment: newAssignment });
    } else {
        res.status(400).json({ message: "Error creating new assignment" });
    }
  } catch (err) {
    next(err);
  }
});

//GETS ALL ASSIGNMENTS
assignmentRouter.get("/", async (req, res, next) => {
  try {
    const assignments = await Assignment.find();
    if (assignments) {
      res.json({ assignments });
    } else {
      res.json({ message: "No assignments found" });
    }
  } catch (err) {
    next(error);
  }
});

//GETS SPECIFIC ASSIGNMENT
assignmentRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);
    if (assignment) {
      res.json(assignment);
    } else {
      res.json({ message: `No assignment found with id: ${id}` });
    }
  } catch (err) {
    next(error);
  }
});

//GETS ALL ASSIGNMENTS BASED ON CLASS
assignmentRouter.get("/class/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const assignments = await Assignment.find({ classId: id });
    if (assignments) {
      res.json({ assignments });
    } else {
      res.json({ message: "No assignments found" });
    }
  } catch (err) {
    next(err);
  }
});

//GET ALL ASSIGNMENTS BASED ON TUTOR
assignmentRouter.get("/tutor/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const tutor = await Tutor.findOne({ userId: id });
    const assignments = await Assignment.find({ tutorId: tutor._id });
    if (assignments) {
      res.json(assignments);
    } else {
      res.json({ message: "No assignments found" });
    }
  } catch (err) {
    next(err);
  }
});

//GET ALL ASSIGNMENTS BASED ON STUDENT
assignmentRouter.get("/student/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ userId: id });
    const assignmentAccessList = await AssignAccess.find({
      studentId: student._id,
    });
    const assignments = [];
    for (access of assignmentAccessList) {
      const assignment = Assignment.findOne({ _id: access.assignmentId });
      assignments.push(assignment);
    }
    if (assignments) {
      res.json(assignments);
    } else {
      res.json({ message: "No assignments found" });
    }
  } catch (err) {
    next(err);
  }
});

//UPDATES SPECIFIC ASSIGNMENT
assignmentRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const assignment = await Assignment.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (assignment) {
      res.json({ assignment });
    } else {
      res.json({ message: `Error updating assignment: ${id}` });
    }
  } catch (error) {
    next(error);
  }
});

//UPDATES ASSIGNMENT'S SUBMISSIONS LIST
assignmentRouter.patch("/submission/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const assignment = await Assignment.findById(id);
    const student = await Student.findOne(body.id);
    const submissionInf = {
      answers: body.answers,
      studentId: student._id,
      assignmentId: assignment._id,
      classId: assignment.classId,
    };
    if (!assignment) {
      res.status(404).json({ message: `Project not found: ${id}` });
    }
    const submission = await Submission.create(submissionInf);

    if (submission) {
      assignment.submissions.push(submission);
      await assignment.save();
      res.status(201).json({ submission });
    } else {
      res.status(400).json({ message: "Error creating submission" });
    }
  } catch (error) {
    next(error);
  }
});

//GRANTS ACCESS TO ASSIGNMENT
assignmentRouter.post("/access/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);
    const classAccessList = await ClassAccess.find({
      classId: assignment.classId,
    });
    for (access of classAccessList) {
      await AssignAccess.create({
        studentId: access.studentId,
        assignmentId: assignment._id,
      });
    }
    if (newAccess) {
      res.status(201).json({ message: "Granted Access" });
    } else {
      res.status(400).json({ message: "Error granting access" });
    }
  } catch (error) {
    next(error);
  }
});

//DELETES ASSIGNMENT
assignmentRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAssignment = await Assignment.findByIdAndDelete(id);
    if (deletedAssignment) {
      res.json({
        message: `Assignment deleted: ${id}`,
        deletedAssignment,
      });
    } else {
      res.json({ message: `Error deleting assignment: ${id}` });
    }
  } catch (error) {
    next(error);
  }
});

export default assignmentRouter;
