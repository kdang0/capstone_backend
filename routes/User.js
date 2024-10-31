import { Router } from "express";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Tutor from "../models/Tutor.js";
const userRouter = new Router();
import bcrypt from "bcrypt";
import Class from "../models/Class.js";
import ClassAccess from "../models/ClassAccess.js";

//CREATES NEW USER
userRouter.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await User.create({ ...body, password: hashedPassword });
    if (newUser) {
      if (newUser.role) {
        if (newUser.role.toLowerCase() == "student") {
          await Student.create({ userId: newUser._id });
        } else if (newUser.role.toLowerCase() == "tutor") {
          await Tutor.create({ userId: newUser._id });
        }
      }
      res.status(201).json({ user: newUser });
    } else {
      res.status(400).json({ message: "Error creating new user" });
    }
  } catch (err) {
    next(err);
  }
});

//GRABS STUDENTS ENROLLED IN TUTOR'S CLASS(ES)
userRouter.get("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    //grab tutor
    const tutor = await Tutor.findOne({ userId: id });
    const classList = await Class.find({ tutorId: tutor._id });
    const students = new Set([]);
    const classAccessList = [];
    for (const classInst of classList) {
      const classAccess = await ClassAccess.find({ classId: classInst._id });
      classAccessList.push(classAccess);
    }

    //Try to optimize this, right now its O(N^2)
    for (const accesses of classAccessList) {
      for (const access of accesses) {
        const student = await Student.findOne({ _id: access.studentId });
        const user = await User.findOne({ _id: student.userId });
        students.add(user);
      }
    }
    const studentArray = Array.from(students);
    res.status(201).json(studentArray);
  } catch (error) {
    next(error);
  }
});

//GETS SPECIFIC USER
userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({ user });
    } else {
      res.json({ message: `No user found with ID: ${req.params.id}` });
    }
  } catch (error) {
    next(error);
  }
});

//UPDATES USER
userRouter.patch("/:id", async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    if (user) {
      res.json({ user });
    } else {
      res.json({ message: `Error updating user: ${id}` });
    }
  } catch (error) {
    next(error);
  }
});

//DELETES USER
userRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({
        message: `User deleted: ${id}`,
        deletedUser,
      });
    } else {
      res.json({ message: `Error deleting user: ${id}` });
    }
  } catch (error) {
    next(error);
  }
});

export default userRouter;
